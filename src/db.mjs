import mongoose from 'mongoose';

// Connect to MongoDB (make sure to replace with your own connection string)
mongoose.connect('mongodb://localhost:3000/eventhub', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    hash: {
        type: String,
        required: true,
    },
    createdEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
    joinedEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JoinRecord',
    }],
}, { timestamps: true });

// Event Schema
const eventSchema = new mongoose.Schema({
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JoinRecord',
    }],
}, { timestamps: true });

// Join Record Schema
const joinRecordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
});

// Models
const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);
const JoinRecord = mongoose.model('JoinRecord', joinRecordSchema);

// Export models for use in other parts of the application
export { User, Event, JoinRecord };
