import './config.mjs';
import express from 'express'
import cors from 'cors';
import bcrypt from 'bcryptjs';

import { User, Event } from './db.mjs';
import mongoose from 'mongoose';

const app = express()
const PORT = process.env.PORT ?? 3000

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const userId = req.header('User-Id');
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Auth Routes
app.post('/register', async (req, res) => {
  try {
    console.log('Registration request received:', req.body); // Debug log

    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ username, email, password });
    console.log('Attempting to save user:', user); // Debug log

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error details:', error); // Debug log

    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Protected Routes
app.get('/fetch-data', auth, async (req, res) => {
  try {
    const events = await Event.find()
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving events', error: error.message });
  }
});

app.post('/event', auth, async (req, res) => {
  try {
    const newEvent = new Event({
      ...req.body,
      createdBy: req.user._id
    });

    const savedEvent = await newEvent.save();
    
    // Add event to user's created events
    await User.findByIdAndUpdate(req.user._id, {
      $push: { createdEvents: savedEvent._id }
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event: savedEvent
    });
  } catch (err) {
    console.error("Error adding event to database:", err);
    res.status(500).json({
      success: false,
      message: 'Could not create event',
      error: err.message
    });
  }
});

// Get single event
app.get('/event/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'username email');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching event',
      error: error.message 
    });
  }
});

// Join event 
app.post('/event/:id/join', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is the creator
    if (event.createdBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot join your own event' });
    }

    // Initialize participants array if it doesn't exist
    if (!event.participants) {
      event.participants = [];
    }

    // Check if user already joined
    if (event.participants.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already joined this event' });
    }

    // Add user to participants
    event.participants.push(req.user._id);
    await event.save();

    // Add event to user's joinedEvents
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { joinedEvents: event._id }
    });

    res.json({
      success: true,
      message: 'Successfully joined event',
      event: {
        ...event.toObject(),
        participants: event.participants
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error joining event',
      error: error.message 
    });
  }
});

// Leave event
app.post('/event/:id/leave', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Remove user from participants array
    if (event.participants) {
      event.participants = event.participants.filter(
        participantId => participantId.toString() !== req.user._id.toString()
      );
    }
    await event.save();

    // Remove event from user's joinedEvents
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { joinedEvents: event._id }
    });

    res.json({ 
      success: true, 
      message: 'Successfully left event' 
    });
  } catch (error) {
    console.error('Error in leave endpoint:', error);
    res.status(500).json({ 
      message: 'Error leaving event', 
      error: error.message 
    });
  }
});

// User profile route
app.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('createdEvents')
      .populate('joinedEvents')
      .select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send("Server Homepage")
})

app.listen(PORT, () => console.log(`Server started in port ${PORT}`))

