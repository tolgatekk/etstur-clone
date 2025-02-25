# ETS Tur Clone

Bu proje, ETS Tur benzeri bir otel rezervasyon sisteminin React ve Node.js ile yapılmış klonudur.

## Özellikler

- Otel arama ve filtreleme
- Otel detay sayfası
- Rezervasyon sistemi
- Responsive tasarım
- Material-UI bileşenleri

## Teknolojiler

### Frontend
- React
- Material-UI
- React Router
- Vite

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/your-username/etstur-clone.git
cd etstur-clone
```

2. Bağımlılıkları yükleyin:
```bash
# Frontend bağımlılıkları
npm install

# Backend bağımlılıkları
cd backend
npm install
```

3. Gerekli ortam değişkenlerini ayarlayın:
- Backend klasöründe `.env` dosyası oluşturun:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/etstur-clone
```

4. MongoDB'yi başlatın:
```bash
# MongoDB'nin yüklü olduğundan emin olun
mongod
```

5. Uygulamayı başlatın:
```bash
# Backend'i başlatın
cd backend
npm start

# Yeni bir terminal açın ve frontend'i başlatın
cd ../
npm run dev
```

6. Tarayıcınızda `http://localhost:5173` adresine gidin

## Kullanım

1. Ana sayfada otel arama modülünü kullanarak:
   - Otel adı
   - Giriş tarihi
   - Çıkış tarihi
   - Kişi sayısı
   bilgilerini girin

2. Arama sonuçlarından bir otel seçin

3. Detay sayfasında otelin:
   - Fotoğrafları
   - Özellikleri
   - Fiyatları
   - Müsaitlik durumu
   gibi bilgileri görüntüleyin

4. Rezervasyon yapın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
