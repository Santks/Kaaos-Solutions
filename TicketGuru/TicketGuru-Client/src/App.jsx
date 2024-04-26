import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, AppBar, Tabs, Tab, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SportsBarIcon from '@mui/icons-material/SportsBar';


import HomePage from "./components/HomePage";
import ListEvents from "./components/ListEvents";
import TemplatePage from "./components/TemplatePage";


function App() {
  return (
    <Router>
      <Navigation />
      <Box marginTop={4}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<ListEvents />} />
          <Route path="/template" element={<TemplatePage />} />
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

    default:
      value = false;
  }

  return (
    <AppBar position='static' sx={{ bgcolor: '#2196f3' }}>
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
        </Tabs>
      </Box>
    </AppBar>
  );
}

// Komponentin export
export default App;