import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Kullanıcı şeması
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Kullanıcı kaydı
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).send({ message: 'Kullanıcı başarıyla kaydedildi.' });
    } catch (error) {
        res.status(500).send({ message: 'Kullanıcı kaydedilirken bir hata oluştu.', error });
    }
});

// Kullanıcı girişi
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send({ message: 'Kullanıcı bulunamadı.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send({ message: 'Şifre yanlış.' });
    }
    const token = jwt.sign({ id: user._id }, 'secretKey'); // 'secretKey' güvenli bir anahtar olmalı
    res.send({ token });
});

export default router;
