// Import required modules
const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');

// Route to fetch room rent based on room number
router.get('/getRoomRent/:roomNumber', async (req, res) => {
    const { roomNumber } = req.params;

    try {
        const room = await Room.findOne({ roomNumber });
        if (room) {
            res.json({ rent: room.rent });
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
