import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Tur schema'sı
const tourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

const Tour = mongoose.model('Tour', tourSchema);

// Tüm turları getir
router.get('/', async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).send(tours);
    } catch (error) {
        res.status(500).send({ message: 'Turlar alınırken bir hata oluştu.', error });
    }
});

// Yeni tur ekle
router.post('/', async (req, res) => {
    const { name, description, price } = req.body;
    const newTour = new Tour({ name, description, price });
    try {
        await newTour.save();
        res.status(201).send({ message: 'Tur başarıyla kaydedildi.' });
    } catch (error) {
        res.status(500).send({ message: 'Tur kaydedilirken bir hata oluştu.', error });
    }
});

export default router;
