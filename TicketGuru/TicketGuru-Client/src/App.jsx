import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Box, AppBar, Tabs, Tab, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import StadiumIcon from '@mui/icons-material/Stadium';
import HomePage from "./components/HomePage";
import ListEvents from "./components/ListEvents";
import Ticketbuy from "./pages/Ticketbuy";
import Ticketcheck from "./pages/Ticketcheck";
import ListTicketTypes from "./pages/TicketTypes";
import EventReport from "./components/EventReport";
import ListUsers from "./pages/Users";
import Login from "./components/Login";
import OrderReport from "./components/OrderReport";
import ListVenues from "./components/ListVenues";

function App() {
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  async function handleLogin(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    const response = await fetch('https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/api/login', {
      method: 'POST',
      body: formData
    });
  
    if (response.ok) {
      const user = await response.json();
      setUser(user);
    } else {
      console.error('Failed to login');
    }
  }
  



  async function handleLogout() {
    const response = await fetch('https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/api/logout', {
      method: 'POST',
    });

    if (response.ok) {
      setUser(null);
    } else {
      console.error('Failed to logout');
    }
  }


  return (
    <Router basename="/Kaaos-Solutions/">
      <Navigation user={user} onLogout={handleLogout} onLogin={() => setLoginOpen(true)} setLoginOpen={setLoginOpen} />
      <Box marginTop={4}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<ListEvents />} />
          <Route path="/ticketbuy" element={<Ticketbuy />} />
          <Route path="/ticketcheck" element={<Ticketcheck />} />
          <Route path="/tickettypes/:eventId" element={<ListTicketTypes />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/eventreport/:eventId" element={<EventReport />} />
          <Route path="/orderreport/:eventId" element={<OrderReport />} />
          <Route path="/venues" element={<ListVenues />} />
        </Routes>
      </Box>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} />
    </Router>
  );
}

function Navigation({ user, onLogout, onLogin, setLoginOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;

  let value;
  switch (currentPath) {
    case "/":
      value = 0;
      break;
    case "/events":
      value = 1;
      break;
    case "/ticketbuy":
      value = 2;
      break;
    case "/ticketcheck":
      value = 3;
      break;
    case "/users":
      value = 4;
      break;
    case "/venues":
      value = 5;
      break;
    default:
      value = false;
  }

  const userRole = user?.authorities[0];

  return (
    <AppBar position="static" color="primary">
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <Typography variant="h6" color="inherit" style={{ marginLeft: "20px" }}>
          <Box display="flex" alignItems="center">
            <LocalActivityIcon fontSize="medium" />
            <Typography variant="h6" color="inherit" style={{ marginLeft: "5px" }}>
              TicketGuru
            </Typography>
          </Box>
        </Typography>
        <Tabs value={value} variant="fullWidth" textColor="inherit" style={{ marginLeft: "75px" }} TabIndicatorProps={{ style: { backgroundColor: "white" } }}>
          <Tab color="secondary" label="Homepage" icon={<HomeIcon />} component={Link} to="/" />
          {userRole === 'ROLE_EVENT_MANAGER' || userRole === 'ROLE_ADMIN' ? <Tab label="Events" icon={<TheaterComedyIcon />} component={Link} to="/events" /> : null}
          {userRole === 'ROLE_SELLER' || userRole === 'ROLE_ADMIN' ? <Tab label="Buy tickets" icon={<ShoppingCartIcon />} component={Link} to="/ticketbuy" /> : null}
          {userRole === 'ROLE_TICKET_INSPECTOR' || userRole === 'ROLE_ADMIN' ? <Tab label="Ticketcheck" icon={<QrCodeScannerIcon />} component={Link} to="/ticketcheck" /> : null}
          {userRole === 'ROLE_ADMIN' ? <Tab label="Users" icon={<PersonIcon />} component={Link} to="/users" /> : null}
          {userRole === 'ROLE_EVENT_MANAGER' || userRole === 'ROLE_ADMIN' ? <Tab label="Venues" icon={<StadiumIcon />} component={Link} to="/venues" /> : null}
        </Tabs>
        {user ? (
          <>
            <Typography style={{ marginLeft: "auto" }}>Logged in as {user.username}</Typography>
            <Button color="primary" variant="contained" style={{ marginLeft: "auto", marginRight: "20px" }} onClick={onLogout}>Logout</Button>
          </>
        ) : (
          <Button
            color="primary" variant="contained" style={{ marginLeft: "auto", marginRight: "20px" }}
            onClick={() => setLoginOpen(true)}>Login <LoginIcon style={{ marginLeft: "2px" }} />
          </Button>)}
      </Box>
    </AppBar>
  );
}

export default App;
