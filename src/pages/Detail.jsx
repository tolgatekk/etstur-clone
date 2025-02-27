import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Box, 
  Rating, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Paper,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SpaIcon from '@mui/icons-material/Spa';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const StyledImage = styled(CardMedia)({
  height: 400,
  borderRadius: '12px',
});

const DetailCard = styled(Paper)({
  padding: '24px',
  marginTop: '24px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
});

const PriceTag = styled(Typography)({
  color: '#e81932',
  fontWeight: 600,
  fontSize: '32px',
  marginTop: '16px',
});

const BookButton = styled(Button)({
  backgroundColor: '#e81932',
  color: 'white',
  padding: '12px 32px',
  marginTop: '24px',
  '&:hover': {
    backgroundColor: '#d31629',
  },
});

const Detail = () => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    startDate: '',
    endDate: '',
    personCount: 0
  });
  const [reservationInfo, setReservationInfo] = useState({ date: '', guests: 0, nights: 0 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get('hotelId');
    const startDate = params.get('startDate');
    const endDate = params.get('endDate');
    const personCount = params.get('personCount');

    setSearchParams({
      startDate,
      endDate,
      personCount: Number(personCount)
    });

    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}`);
        const data = await response.json();
        setHotel(data);
        setLoading(false);
      } catch (error) {
        console.error('Otel bilgileri alınırken bir hata oluştu:', error);
      }
    };

    fetchHotelDetails();
  }, []);

  const handleReservation = async () => {
    try {
      const nights = calculateNights();
      const totalPrice = hotel.price * nights * searchParams.personCount;

      const response = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: searchParams.startDate,
          guests: searchParams.personCount,
          roomId: hotel.id,
          hotelName: hotel.name,
          checkInDate: searchParams.startDate,
          checkOutDate: searchParams.endDate,
          totalNights: nights,
          totalPrice: totalPrice
        }),
      });
      const data = await response.json();
      console.log(data);
      setReservationInfo({ date: searchParams.startDate, guests: searchParams.personCount, nights: nights });
    } catch (error) {
      console.error('Rezervasyon alırken bir hata oluştu:', error);
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>Yükleniyor...</Typography>
      </Container>
    );
  }

  const amenityIcons = {
    'Wifi': <WifiIcon />,
    'Havuz': <PoolIcon />,
    'Restoran': <RestaurantIcon />,
    'Fitness Merkezi': <FitnessCenterIcon />,
    'Spa': <SpaIcon />,
    'Özel Plaj': <BeachAccessIcon />
  };

  const calculateNights = () => {
    const start = new Date(searchParams.startDate);
    const end = new Date(searchParams.endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalPrice = hotel.price * nights * searchParams.personCount;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {hotel.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOnIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <Typography color="text.secondary">
              {hotel.location}
            </Typography>
            <Rating 
              value={hotel.rating} 
              precision={0.5} 
              readOnly 
              sx={{ ml: 2 }}
            />
          </Box>

          <StyledImage
            image={hotel.images[0]}
            title={hotel.name}
          />

          <DetailCard elevation={0}>
            <Typography variant="h6" gutterBottom>
              Otel Hakkında
            </Typography>
            <Typography color="text.secondary" paragraph>
              {hotel.description}
            </Typography>
          </DetailCard>

          <DetailCard elevation={0}>
            <Typography variant="h6" gutterBottom>
              Özellikler
            </Typography>
            <Grid container spacing={2}>
              {hotel.amenities.map((amenity) => (
                <Grid item xs={6} sm={4} key={amenity}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {amenityIcons[amenity]}
                    <Typography sx={{ ml: 1 }}>{amenity}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </DetailCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <DetailCard>
            <Typography variant="h6" gutterBottom>
              Rezervasyon Detayları
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText 
                  primary="Giriş Tarihi"
                  secondary={new Date(searchParams.startDate).toLocaleDateString('tr-TR')}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Çıkış Tarihi"
                  secondary={new Date(searchParams.endDate).toLocaleDateString('tr-TR')}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Kişi Sayısı"
                  secondary={searchParams.personCount}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Konaklama"
                  secondary={`${nights} Gece`}
                />
              </ListItem>
            </List>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="subtitle1">
                Gecelik Fiyat
              </Typography>
              <Typography variant="h6">
                {hotel.price.toLocaleString('tr-TR')} TL
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                Toplam Tutar
              </Typography>
              <PriceTag>
                {totalPrice.toLocaleString('tr-TR')} TL
              </PriceTag>
              <Typography variant="caption" color="text.secondary">
                {nights} Gece, {searchParams.personCount} Kişi
              </Typography>
            </Box>

            <BookButton fullWidth variant="contained" size="large" onClick={handleReservation}>
              Rezervasyon Yap
            </BookButton>
          </DetailCard>

          <DetailCard sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Rezervasyon Bilgileri
            </Typography>
            <Typography paragraph>
              Tarih: {reservationInfo.date}
            </Typography>
            <Typography paragraph>
              Konaklayacak Kişi Sayısı: {reservationInfo.guests}
            </Typography>
            <Typography paragraph>
              Toplam Gece Sayısı: {reservationInfo.nights}
            </Typography>
          </DetailCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Detail;