// Import mongoose
const mongoose = require('mongoose');

// Define the Room schema
const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, unique: true, required: true },
    roomType: { type: String, required: true },
    comfort: { type: String },
    size: { type: String },
    rent: { type: Number, required: true },
    status: { type: String, default: 'available' }
});

// Create the Room model
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
