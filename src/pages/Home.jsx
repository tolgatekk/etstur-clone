import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchModule from '../components/SearchModule';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const HeroSection = styled('div')({
  background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '600px',
  position: 'relative',
  padding: '40px 0',
});

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
});

const SectionTitle = styled(Typography)({
  fontSize: '28px',
  fontWeight: 600,
  marginBottom: '32px',
  marginTop: '48px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: 0,
    width: '60px',
    height: '3px',
    backgroundColor: '#e81932',
  },
});

const PriceTag = styled(Typography)({
  color: '#e81932',
  fontWeight: 600,
  fontSize: '24px',
  marginTop: '8px',
});

const LocationText = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: '#666',
  fontSize: '14px',
  marginTop: '4px',
});

const StyledButton = styled(Button)({
  backgroundColor: '#e81932',
  color: 'white',
  padding: '8px 24px',
  marginTop: '16px',
  '&:hover': {
    backgroundColor: '#d31629',
  },
});

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hotels');
        const data = await response.json();
        setHotels(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <>
      <HeroSection>
        <Container>
          <SearchModule />
        </Container>
      </HeroSection>

      <Container>
        <SectionTitle variant="h4">
          Popüler Oteller
        </SectionTitle>
        <Grid container spacing={3}>
          {hotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel._id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="240"
                  image={hotel.images[0]}
                  alt={hotel.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {hotel.name}
                  </Typography>
                  <LocationText>
                    <LocationOnIcon fontSize="small" />
                    {hotel.location}
                  </LocationText>
                  <Rating value={hotel.rating} precision={0.1} readOnly sx={{ mt: 1 }} />
                  <PriceTag>
                    {hotel.price.toLocaleString('tr-TR')} TL'den
                  </PriceTag>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <StyledButton variant="contained">
                      İncele
                    </StyledButton>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
