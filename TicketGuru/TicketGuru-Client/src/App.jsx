import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, AppBar, Tabs, Tab, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import HomePage from "./components/HomePage";
import ListEvents from "./components/ListEvents";
import TemplatePage from "./components/TemplatePage";
import Ticketbuy from './pages/Ticketbuy';
import Ticketcheck from './pages/Ticketcheck';
import ListTicketTypes from './pages/TicketTypes';


function App() {
  return (
    <Router>
      <Navigation />
      <Box marginTop={4}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<ListEvents />} />
          <Route path="/template" element={<TemplatePage />} />
          <Route path="/ticketbuy" element={<Ticketbuy />} />
          <Route path="/ticketcheck" element={<Ticketcheck />} />
          <Route path="/tickettypes" element={<ListTicketTypes />} />
        </Routes>
      </Box>
    </Router>
  );
}


function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  let value;
  switch (currentPath) {
    case '/':
      value = 0;
      break;
    case '/events':
      value = 1;
      break;
    case '/template':
      value = 2;
      break;
    case '/ticketbuy':
      value = 3;
      break;
    case '/ticketcheck':
      value = 4;
      break;
    case '/tickettypes':
      value = 5;
      break;

    default:
      value = false;
  }

  return (
    <AppBar position='static' color='primary'>
      <Box display='flex' justifyContent='flex-start' alignItems='center'>
        <Typography variant='h6' color='inherit' style={{ marginLeft: '20px' }}>
          <Box display='flex' alignItems='center'>
            <LocalActivityIcon fontSize="medium" />
            <Typography variant='h6' color='inherit' style={{ marginLeft: '5px' }}>
              TicketGuru
            </Typography>
          </Box>
        </Typography>
        <Tabs value={value} variant='fullWidth' textColor='inherit' style={{ marginLeft: '75px' }} TabIndicatorProps={{ style: { backgroundColor: 'white' } }}>
          <Tab color='secondary' label='Homepage' icon={<HomeIcon />} component={Link} to="/" />
          <Tab label='Events' icon={<TheaterComedyIcon />} component={Link} to="/events" />
          <Tab label='Template' icon={<SportsBarIcon />} component={Link} to="/template" />
          <Tab label='Buy tickets' icon={<ShoppingCartIcon />} component={Link} to="/ticketbuy" />
          <Tab label='Ticketcheck' icon={<QrCodeScannerIcon />} component={Link} to="/ticketcheck" />
          <Tab label='Ticket Types' icon={<ConfirmationNumberIcon />} component={Link} to="/tickettypes" />
        </Tabs>
      </Box>
    </AppBar>
  );
}

// Komponentin export
export default App;