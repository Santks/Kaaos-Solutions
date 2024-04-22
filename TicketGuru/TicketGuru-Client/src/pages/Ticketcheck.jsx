import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import dayjs from 'dayjs'

const Ticketcheck = () => {
  const [ticketId, setTicketId] = useState('');
  const [ticketInfo, setTicketInfo] = useState(null);
  const [error, setError] = useState(null);

  const username = 'Admin';
  const password = 'admin';
  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

  const fetchTicketInfo = async () => {
    try {
      const response = await fetch(`http://kaaos-solutions-kaaosticketguru.rahtiapp.fi/tickets/${ticketId}`, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      setTicketInfo(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const patchTicketInfo = async () => {
    try {
      const dateNow = new Date().toISOString();
      const response = await fetch(`http://kaaos-solutions-kaaosticketguru.rahtiapp.fi/tickets/${ticketId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          kaytettyLippu: dateNow.substring(0, 19)
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      if (data.ticketUsed != "1970-01-01T00:00:00") {
        alert('Lippua muokattu onnistuneesti');
      } else {
        alert('Lipun muokkaus epäonnistui!');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const formattedDate = () => {
    const date = dayjs(ticketInfo.ticketUsed).format("DD.MM.YYYY - HH:mm");
    return date
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
      <h1 id='header'>Ticketguru lipuntarkastus</h1>
      <TextField
        id='textinput'
        type="text"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
        placeholder="Syötä lipun ID:"
      />
      <Button id='search' variant="contained" onClick={fetchTicketInfo}>Hae lippu</Button>
      <Button id='patch' variant="contained" onClick={patchTicketInfo}>Merkitse käytetyksi</Button>
      {error && <Typography id='error' variant="h6" color="error">Virhe: {error}</Typography>}
      {ticketInfo &&
        <Card id='ticketInfo'>
          <CardContent>
            <Typography variant="h5" component="div">Lipun tiedot</Typography>
            <Typography variant="body2" color="text.secondary">
              Lipun ID: {ticketInfo.ticketId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hinta: {ticketInfo.price} euroa
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Käytetty?: {ticketInfo.ticketUsed === "1970-01-01T00:00:00" ? 'Ei' : 'Kyllä'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Käytetty (pvm): {ticketInfo.ticketUsed === "1970-01-01T00:00:00" ? "Lippua ei ole käytetty" : formattedDate()}
            </Typography>
          </CardContent>
        </Card>
      }
    </Box>
  );
};

export default Ticketcheck;
