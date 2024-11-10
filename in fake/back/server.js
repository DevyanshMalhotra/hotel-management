const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB connection (replace with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/hotelDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use routes from /routes/rooms.js
app.use('/api', require('./routes/rooms'));

// API for check-in (store check-in data)
app.post('/check-in', async (req, res) => {
  const { guestName, roomNumber, checkInDate, checkOutDate, totalPayment, paymentAmount, paymentStatus } = req.body;

  // Store the check-in details in the database (for now, we're just logging it)
  console.log('Check-In Details:', req.body);

  // Normally, you'd save this to a database, but for now:
  res.json({ message: 'Check-in successful' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
