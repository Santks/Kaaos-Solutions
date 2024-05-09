import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import { fetchEvents } from './EventHandler';

function HomePage() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchEvents()
            .then(data => {
                const upcomingEvents = data.filter(event => new Date(event.startDate) >= new Date());
                const sortedEvents = upcomingEvents.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                const eventsWithImages = sortedEvents.map(event => ({
                    ...event,
                    imageNum: Math.floor(Math.random() * 8) + 1
                }));
                setEvents(eventsWithImages);
                setFilteredEvents(eventsWithImages);

                const uniqueCategories = [...new Set(sortedEvents.map(event => event.eventCategory))];
                setCategories(uniqueCategories);
            })
            .catch(error => console.error(error));
    }, []);

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        if (category === 'All') {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(events.filter(event => event.eventCategory === category));
        }
    };

    return (
        <div>
            <h1>Welcome to TicketGuru!</h1>
            <p>At TicketGuru, we believe in the power of live experiences.<br />
                Our mission is to bring people together and make memories through live events. <br />
                We're constantly innovating to enhance our services and deliver unforgettable moments for our clients!</p>
            <br />
            <h2>Upcoming Events</h2>
            <Box sx={{ width: 150, marginBottom: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="select-category-label">Categories:</InputLabel>
                    <Select
                        labelId="select-category-label"
                        id="select-category"
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value="All">All</MenuItem>
                        {categories.map(category => (
                            <MenuItem value={category} key={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Grid container spacing={3}>
                {filteredEvents.map(event => (
                    <Grid item xs={12} sm={6} md={3} key={event.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`${event.imageNum}.jpg`}
                                alt={event.name}
                            />

                            <CardContent>
                                <Typography variant="h5">{event.name}</Typography>
                                <Typography variant="body2">{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default HomePage;