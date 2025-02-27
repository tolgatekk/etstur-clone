# ETS Tur Clone

Bu proje, ETS Tur benzeri bir otel rezervasyon sisteminin React ve Node.js ile yapılmış.

## Özellikler

- Otel arama ve filtreleme
- Otel detay sayfası
- Rezervasyon işlemleri

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
git clone https://github.com/tolgatekk/etstur-clone.git
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

4. MongoDB'de verileri görüntüleyin

## Sayfa Görünümleri:
![1](https://github.com/user-attachments/assets/79fd2fb9-6ee9-406c-8b92-f9a03bd6ca94)

![2](https://github.com/user-attachments/assets/20a0008f-c80f-4512-91b7-1efede4a652d)

![3](https://github.com/user-attachments/assets/34f1183a-f72a-49e3-81e8-b930684f8f97)

![4](https://github.com/user-attachments/assets/bac57ac5-228e-4ed5-ace2-878307f54a50)




