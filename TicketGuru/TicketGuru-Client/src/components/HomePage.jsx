// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import { fetchEvents } from './EventHandler';

// HomePage component
function HomePage() {
    
    // State variables for storing events, filtered events, categories, and selected category
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Fetching the event data when the component mounts
    useEffect(() => {
        fetchEvents()
            .then(data => {
                // Filtering upcoming events and sorting them by start date
                const upcomingEvents = data.filter(event => new Date(event.startDate) >= new Date());
                const sortedEvents = upcomingEvents.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

                // Adding a random image number to each event
                const eventsWithImages = sortedEvents.map(event => ({
                    ...event,
                    imageNum: Math.floor(Math.random() * 8) + 1
                }));
                setEvents(eventsWithImages);
                setFilteredEvents(eventsWithImages);

                // Getting unique categories from the events
                const uniqueCategories = [...new Set(sortedEvents.map(event => event.eventCategory))];
                setCategories(uniqueCategories);
            })
            .catch(error => console.error(error));
    }, []);

    // Handler for category change
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);

        // Filtering events based on the selected category
        if (category === 'All' || category === undefined) {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(events.filter(event => event.eventCategory === category));
        }
    };

    // Rendering the component
    return (
        <div>
            <h1>Welcome to TicketGuru!</h1>
            <p>At TicketGuru, we believe in the power of live experiences.<br />
                Our mission is to bring people together and make memories through live events. <br />
                We're constantly innovating to enhance our services and deliver unforgettable moments for our clients!</p>
            <br />
            <h2>Upcoming Events</h2>
            <Box sx={{ width: 150, marginBottom: 3 }}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="select-category-label">Categories:</InputLabel>
                    <Select
                        labelId="select-category-label"
                        id="select-category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        label="Categories"
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