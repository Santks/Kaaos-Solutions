import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
      const response = await fetch(`http://innovaatioimpussi-innovaatioimpulssi.rahtiapp.fi/api/liput/${ticketId}`, { headers });
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
      const response = await fetch(`http://innovaatioimpussi-innovaatioimpulssi.rahtiapp.fi/api/liput/${ticketId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          kaytettyLippu: true,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        alert('Lippua muokattu onnistuneesti');
      } else {
        alert('Lipun muokkaus epäonnistui!');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
      <h1>Ticketguru lipuntarkastus</h1>
      <TextField
        type="text"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
        placeholder="Syötä lipun ID:"
      />
      <Button variant="contained" onClick={fetchTicketInfo}>Hae lippu</Button>
      <Button variant="contained" onClick={patchTicketInfo}>Merkitse myydyksi</Button>
      {error && <Typography variant="h6" color="error">Virhe: {error}</Typography>}
      {ticketInfo &&
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">Lipun tiedot</Typography>
            <Typography variant="body2" color="text.secondary">
              Lipun ID: {ticketInfo.lippuId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hinta: {ticketInfo.lipputyyppi.hinta} euroa
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Käytetty?: {ticketInfo.kaytettyLippu ? 'Kyllä' : 'Ei'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lipputyyppi: {ticketInfo.lipputyyppi.kuvaus}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tapahtuma: {ticketInfo.tapahtuma.kuvaus}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sijainti: {ticketInfo.tapahtuma.sijainti}
            </Typography>
          </CardContent>
        </Card>
      }
    </Box>
  );
};

export default Ticketcheck;
