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

  const handleLogout = () => {
    // Jotain hienoa taikuutta
    setUser(null);
  };

  const handleLogin = (username) => {
    // Jotain hienoa taikuutta
    setUser(username);
    setLoginOpen(false);
  };

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
          <Tab label="Events" icon={<TheaterComedyIcon />} component={Link} to="/events" />
          <Tab label="Buy tickets" icon={<ShoppingCartIcon />} component={Link} to="/ticketbuy" />
          <Tab label="Ticketcheck" icon={<QrCodeScannerIcon />} component={Link} to="/ticketcheck" />
          <Tab label="Users" icon={<PersonIcon />} component={Link} to="/users" />
          <Tab label="Venues" icon={<StadiumIcon />} component={Link} to="/venues" />
        </Tabs>
        {user ? (
          <>
            <Typography style={{ marginLeft: "auto" }}>Logged in as {user}</Typography>
            <Button color="inherit" onClick={onLogout}>Logout</Button>
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
