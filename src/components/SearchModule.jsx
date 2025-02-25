import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, TextField, Button, Container, Grid, Autocomplete, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const SearchBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  marginTop: '40px',
}));

const SearchButton = styled(Button)({
  backgroundColor: '#e81932',
  padding: '12px 32px',
  '&:hover': {
    backgroundColor: '#d31629',
  },
});

const SearchModule = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const searchHotels = async (searchTerm) => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/hotels/search/by-name?name=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching hotels:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (selectedHotel && searchData.checkIn && searchData.checkOut && searchData.guests) {
      const params = new URLSearchParams({
        hotelId: selectedHotel._id,
        startDate: searchData.checkIn,
        endDate: searchData.checkOut,
        personCount: searchData.guests
      });

      // Detail sayfasına yönlendir
      window.location.href = `/detail?${params.toString()}`;
    } else {
      alert('Lütfen tüm alanları doldurun');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get('hotelId');
    const startDate = params.get('startDate');
    const endDate = params.get('endDate');
    const personCount = params.get('personCount');

    if (hotelId && startDate && endDate && personCount) {
      setSearchData({
        ...searchData,
        checkIn: startDate,
        checkOut: endDate,
        guests: personCount,
      });
    }
  }, []);

  return (
    <SearchBox>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab label="Otel" />
        <Tab label="Tur" />
        <Tab label="Uçak Bileti" />
        <Tab label="Transfer" />
      </Tabs>

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Autocomplete
              fullWidth
              options={searchResults}
              getOptionLabel={(option) => option.name || ''}
              onChange={(event, newValue) => {
                setSelectedHotel(newValue);
              }}
              onInputChange={(event, newValue) => {
                searchHotels(newValue);
              }}
              loading={loading}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1">{option.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.location}
                    </Typography>
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Otel Ara"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Giriş Tarihi"
              name="checkIn"
              type="date"
              value={searchData.checkIn}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Çıkış Tarihi"
              name="checkOut"
              type="date"
              value={searchData.checkOut}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Kişi Sayısı"
              name="guests"
              type="number"
              value={searchData.guests}
              onChange={handleInputChange}
              variant="outlined"
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
          <Grid item xs={12} md={1}>
            <SearchButton
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSearch}
              sx={{ height: '56px' }}
            >
              Ara
            </SearchButton>
          </Grid>
        </Grid>
      </Container>
    </SearchBox>
  );
};

export default SearchModule;
