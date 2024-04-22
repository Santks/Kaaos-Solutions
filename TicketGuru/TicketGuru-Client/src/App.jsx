import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Ticketbuy from './pages/Ticketbuy';
import Ticketcheck from './pages/Ticketcheck';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Ticketbuy />} />
        <Route path="/Ticketcheck" element={<Ticketcheck />} />

      </Routes>
    </BrowserRouter>
  );
}

