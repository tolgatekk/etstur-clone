import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { hotels } from '../data/hotels.js';
import Hotel from '../models/Hotel.js';

dotenv.config();

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB\'ye bağlandı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Veritabanını Temizle ve Yeni Verileri Ekle
const seedDatabase = async () => {
  try {
    // Mevcut verileri temizle
    await Hotel.deleteMany({});
    console.log('Mevcut veriler temizlendi');

    // Yeni otelleri ekle
    await Hotel.insertMany(hotels);
    console.log('Örnek otel verileri eklendi');

    // Bağlantıyı kapat
    mongoose.connection.close();
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
};

seedDatabase();
