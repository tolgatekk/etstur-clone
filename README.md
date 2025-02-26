# ETS Tur Clone

Bu proje, ETS Tur benzeri bir otel rezervasyon sisteminin React ve Node.js ile yapılmış.

## Özellikler

- Otel arama ve filtreleme
- Otel detay sayfası

## Teknolojiler

### Frontend
- React
- Material-UI
- React Router

### Backend
- Node.js
- Express
- MongoDB

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/your-username/etstur-clone.git
cd etstur-clone
```

2. Bağımlılıkları yükleyin:
   
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
# MongoDB'nin yüklü olduğundan emin olun
mongod
```

5. Uygulamayı başlatın:
```bash
# Backend'i başlatın
cd backend
npm start

# Yeni bir terminal açın ve frontend'i başlatın
cd etstur-clone
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
   gibi bilgileri görüntüleyin

## Sayfa Görünümleri:
![1](https://github.com/user-attachments/assets/79fd2fb9-6ee9-406c-8b92-f9a03bd6ca94)

![2](https://github.com/user-attachments/assets/20a0008f-c80f-4512-91b7-1efede4a652d)

![3](https://github.com/user-attachments/assets/704daf0c-993c-4614-8e6b-3bd660073aaa)


