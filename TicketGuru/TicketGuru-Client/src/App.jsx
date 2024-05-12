import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { Box, AppBar, Tabs, Tab, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert } from "@mui/material";
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

function ProtectedRoute({ children, user }) {
  return user ? children : <Navigate to="/" replace />;
}

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
      return true;
    } else {
      return false;
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

  const userRole = user?.authorities.find(auth => auth.authority === 'ROLE_ADMIN') ? 'ROLE_ADMIN' :
    user?.authorities.find(auth => auth.authority === 'ROLE_EVENT_MANAGER') ? 'ROLE_EVENT_MANAGER' :
      user?.authorities.find(auth => auth.authority === 'ROLE_SELLER') ? 'ROLE_SELLER' :
        user?.authorities.find(auth => auth.authority === 'ROLE_TICKET_INSPECTOR') ? 'ROLE_TICKET_INSPECTOR' :
          'ROLE_USER';

  return (
    <Router basename="/Kaaos-Solutions/">
      <Navigation user={user} onLogout={handleLogout} onLogin={() => setLoginOpen(true)} setLoginOpen={setLoginOpen} />
      <Box marginTop={4}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<ProtectedRoute user={user}><ListEvents /></ProtectedRoute>} />
          <Route path="/ticketbuy" element={<ProtectedRoute user={user}><Ticketbuy /></ProtectedRoute>} />
          <Route path="/ticketcheck" element={<ProtectedRoute user={user}><Ticketcheck /></ProtectedRoute>} />
          <Route path="/tickettypes/:eventId" element={<ProtectedRoute user={user}><ListTicketTypes /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute user={user}><ListUsers /></ProtectedRoute>} />
          <Route path="/eventreport/:eventId" element={<ProtectedRoute user={user}><EventReport /></ProtectedRoute>} />
          <Route path="/orderreport/:eventId" element={<ProtectedRoute user={user}><OrderReport /></ProtectedRoute>} />
          <Route path="/venues" element={<ProtectedRoute user={user}><ListVenues /></ProtectedRoute>} />
        </Routes>

      </Box>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} />
    </Router>
  );
}

function Navigation({ user, onLogout, setLoginOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const paths = {
    'ROLE_ADMIN': ["/", "/events", "/ticketbuy", "/ticketcheck", "/users", "/venues"],
    'ROLE_EVENT_MANAGER': ["/", "/events", "/venues"],
    'ROLE_SELLER': ["/", "/ticketbuy"],
    'ROLE_TICKET_INSPECTOR': ["/", "/ticketcheck"],
    'ROLE_USER': ["/"]
  };

  const userRole = user?.authorities.find(auth => auth.authority)?.authority || 'ROLE_USER';

  const userPaths = paths[userRole];

  let value = userPaths.indexOf(currentPath);
  if (value === -1) {
    value = false;
  }

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
          {userRole === 'ROLE_SELLER' || userRole === 'ROLE_ADMIN' ? <Tab label="Tickets" icon={<ShoppingCartIcon />} component={Link} to="/ticketbuy" /> : null}
          {userRole === 'ROLE_TICKET_INSPECTOR' || userRole === 'ROLE_ADMIN' ? <Tab label="Check" icon={<QrCodeScannerIcon />} component={Link} to="/ticketcheck" /> : null}
          {userRole === 'ROLE_ADMIN' ? <Tab label="Users" icon={<PersonIcon />} component={Link} to="/users" /> : null}
          {userRole === 'ROLE_EVENT_MANAGER' || userRole === 'ROLE_ADMIN' ? <Tab label="Venues" icon={<StadiumIcon />} component={Link} to="/venues" /> : null}
        </Tabs>
        {user ? (
          <>
            <Typography style={{ marginLeft: "auto", marginRight: "10px" }}>Logged in as <b>{user.username}</b>.</Typography>
            <Button color="error" variant="contained" style={{ marginRight: "20px" }} onClick={onLogout}>
              Logout<LoginIcon style={{ marginLeft: "2px" }} /></Button>
          </>
        ) : (
          <Button color="primary" variant="contained" style={{ marginLeft: "auto", marginRight: "20px" }} onClick={() => setLoginOpen(true)}>
            Login <LoginIcon style={{ marginLeft: "2px" }} /></Button>)}
      </Box>
    </AppBar>
  );
}

export default App;
