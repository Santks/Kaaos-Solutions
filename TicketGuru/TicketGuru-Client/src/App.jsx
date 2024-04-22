import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ticketbuy from './pages/Ticketbuy';
import Ticketcheck from './pages/Ticketcheck';

  export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ticketbuy />}/>
          <Route path="/Ticketcheck" element={<Ticketcheck />}/>

        </Routes>
      </BrowserRouter>
    );
  }

