import React from 'react';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ExploreIcon from '@mui/icons-material/Explore';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import etsLogo from '../assets/etstur-logo.svg';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'white',
  boxShadow: 'none',
  borderBottom: '1px solid #e0e0e0',
});

const TopBar = styled(Box)({
  backgroundColor: '#f5f5f5',
  padding: '8px 0',
  borderBottom: '1px solid #e0e0e0',
  '& .MuiButton-root': {
    fontSize: '0.8rem',
    color: '#666',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#e81932',
    },
  },
});

const StyledToolbar = styled(Toolbar)({
  minHeight: '80px !important',
  padding: '0 !important',
});

const Logo = styled('img')({
  height: '40px',
  marginRight: '24px',
});

const NavButtons = styled(Box)({
  display: 'flex',
  gap: '8px',
  '& .MuiButton-root': {
    color: '#333',
    textTransform: 'none',
    fontWeight: 500,
    padding: '6px 16px',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#e81932',
    },
  },
});

const Header = () => {
  return (
    <>
      <TopBar>
        <Container>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" gap={2}>
             
            </Box>
          </Box>
        </Container>
      </TopBar>
      <StyledAppBar position="static">
        <Container>
          <StyledToolbar>
            <Logo src={etsLogo} alt="ETS Tur" />
           
          </StyledToolbar>
        </Container>
      </StyledAppBar>
    </>
  );
};

export default Header;
