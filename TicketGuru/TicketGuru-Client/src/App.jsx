import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const App = () => {
  const [ticketId, setTicketId] = useState('');
  const [ticketInfo, setTicketInfo] = useState(null);
  const [error, setError] = useState(null);

  const username = 'admin';
  const password = 'admin';
  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

  const fetchTicketInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/tickets/${ticketId}`, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTicketInfo(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
      <TextField
        type="text"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
        placeholder="Syötä lipun ID:"
      />
      <Button variant="contained" onClick={fetchTicketInfo}>Hae lippu</Button>
      {error && <Typography variant="h6" color="error">Virhe: {error}</Typography>}
      {ticketInfo &&
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">Lipun tiedot</Typography>
            <Typography variant="body2" color="text.secondary">
              Lipun ID: {ticketInfo.ticketId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hinta: {ticketInfo.price} euroa
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Käytetty?: {ticketInfo.ticketUsed ? 'Kyllä' : 'Ei'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Käytetty (pvm): {ticketInfo.used}
            </Typography>
          </CardContent>
        </Card>
      }
    </Box>
  );
};

export default App;
