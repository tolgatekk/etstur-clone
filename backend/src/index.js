import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routes
import hotelRoutes from './routes/hotels.js';
import authRoutes from './routes/auth.js';
import tourRoutes from './routes/tours.js';
import bookingRoutes from './routes/bookings.js';

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ETS Tur Clone API' });
});

// Routes
app.use('/api/hotels', hotelRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/etstur-clone')
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Rezervasyon schema
const reservationSchema = new mongoose.Schema({
  date: String,
  guests: Number,
  roomId: String,
  hotelName: String,
  checkInDate: String,
  checkOutDate: String,
  totalNights: Number,
  totalPrice: Number
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// Rezervasyon endpoint'i
app.post('/api/reservations', async (req, res) => {
  const { date, guests, roomId, hotelName, checkInDate, checkOutDate, totalNights, totalPrice } = req.body;
  const newReservation = new Reservation({ 
    date, 
    guests, 
    roomId, 
    hotelName, 
    checkInDate, 
    checkOutDate, 
    totalNights, 
    totalPrice
  });
  try {
    await newReservation.save();
    res.status(201).send({ message: 'Rezervasyon başarıyla kaydedildi.' });
  } catch (error) {
    res.status(500).send({ message: 'Rezervasyon kaydedilirken bir hata oluştu.', error });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;
