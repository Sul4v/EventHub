import mongoose from 'mongoose';

mongoose.connect(process.env.DSN)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

const EventSchema = new mongoose.Schema({
  type: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  location: {type: String, required: true},
  contactName: {type: String, required: true},
  contactEmail: {type: String, required: true},
  contactPhone: {type: String, required: true},
})

mongoose.model('Event', EventSchema);