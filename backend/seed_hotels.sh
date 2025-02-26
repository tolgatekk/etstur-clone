#!/bin/bash

# MongoDB connection details
DB_NAME="hotelDB"
COLLECTION_NAME="hotels"

# Sample hotel data
mongo $DB_NAME --eval "
  db.$COLLECTION_NAME.insertMany([
    { name: 'Titanic Deluxe Bodrum', description: 'Ege'nin muhteşem koyunda, lüks ve konforun buluştuğu özel bir otel', location: 'Yalıçiftlik Mah. 48400', city: 'Bodrum', images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d'], rating: 4.5, price: 8999, amenities: ['Özel Plaj', 'Spa', 'Fitness Merkezi', 'Açık Havuz', 'Restoran', 'Bar'], rooms: ['Standart Oda', 'Deluxe Oda', 'Suite', 'Kral Dairesi'], available: true, createdAt: new Date('2025-02-25T15:38:21.605Z') },
    { name: 'Akka Hotels Antedon', description: 'Akdeniz'in en prestijli otellerinden biri, ultra her şey dahil konsepti', location: 'Beldibi, 07506', city: 'Antalya', images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791'], rating: 4.8, price: 12499, amenities: ['Özel Plaj', 'Aquapark', 'Spa', 'Golf Sahası', 'Fitness Merkezi', 'Çocuk Kulübü'], rooms: ['Premium Oda', 'Deluxe Suite', 'Villa', 'Kral Dairesi'], available: true, createdAt: new Date('2025-02-25T15:38:21.607Z') },
    { name: 'Lujo Hotel Bodrum', description: 'Modern lüksün yeni tanımı, benzersiz bir tatil deneyimi', location: 'Güvercinlik Mah., 48400', city: 'Bodrum', images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'], rating: 4.7, price: 15999, amenities: ['Özel Plaj', 'Spa', 'Infinity Havuz', 'Tenis Kortu', 'Gurme Restoranlar', 'Beach Club'], rooms: ['Art Oda', 'Design Suite', 'Villa', 'Presidential Suite'], available: true, createdAt: new Date('2025-02-25T15:38:21.608Z') },
    { name: 'Rixos Premium Tekirova', description: 'Doğanın kalbinde, lüks ve konforun birleştiği bir otel', location: 'Tekirova Mah., 07995', city: 'Kemer', images: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791', 'https://images.unsplash.com/photo-1566073771259-6a8506099945'], rating: 4.9, price: 14999, amenities: ['Özel Plaj', 'Spa', 'Fitness Merkezi', 'Açık Havuz', 'Restoran', 'Bar'], rooms: ['Standart Oda', 'Deluxe Oda', 'Suite', 'Kral Dairesi'], available: true, createdAt: new Date('2025-02-25T15:38:21.609Z') },
    { name: 'Barut Kemer', description: 'Akdeniz'in en güzel koyunda, lüks ve konforun buluştuğu bir otel', location: 'Yeni Mah., 07980', city: 'Kemer', images: ['https://images.unsplash.com/photo-1584132967334-10e028bd69f7', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'], rating: 4.6, price: 10999, amenities: ['Özel Plaj', 'Spa', 'Infinity Havuz', 'Tenis Kortu', 'Gurme Restoranlar', 'Beach Club'], rooms: ['Art Oda', 'Design Suite', 'Villa', 'Presidential Suite'], available: true, createdAt: new Date('2025-02-25T15:38:21.610Z') }
  ])
"

echo "Örnek otel bilgileri eklendi."
