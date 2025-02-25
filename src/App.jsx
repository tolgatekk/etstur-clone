import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e81932',
      light: '#ff4f5e',
      dark: '#b1000a',
    },
    secondary: {
      main: '#2c3e50',
      light: '#546e7a',
      dark: '#1a2329',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
