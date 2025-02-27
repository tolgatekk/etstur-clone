import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Rezervasyon schema'sı
const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    roomId: { type: String, required: true },
    date: { type: String, required: true },
    guests: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

// Tüm rezervasyonları getir
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send({ message: 'Rezervasyonlar alınırken bir hata oluştu.', error });
    }
});

// Yeni rezervasyon ekle
router.post('/', async (req, res) => {
    const { userId, roomId, date, guests } = req.body;
    const newBooking = new Booking({ userId, roomId, date, guests });
    try {
        await newBooking.save();
        res.status(201).send({ message: 'Rezervasyon başarıyla kaydedildi.' });
    } catch (error) {
        res.status(500).send({ message: 'Rezervasyon kaydedilirken bir hata oluştu.', error });
    }
});

export default router;
