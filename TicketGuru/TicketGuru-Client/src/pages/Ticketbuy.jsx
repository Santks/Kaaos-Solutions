import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Alert, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function Ticketbuy() {
    const [isLoadingEvents, setIsLoadingEvents] = useState(true);
    const [orderDone, setOrderDone] = useState(false);
    const [completedOrder, setCompletedOrder] = useState(null)
    const [events, setEvents] = useState(null);
    //how many tickets
    const [tickets, setTickets] = useState({
        adult: '',
        child: ''
    });
    const currDate = new Date();
    const [order, setOrder] = useState({
        date: currDate,
        customer: { userId: 1 },
        seller: { userId: 2 },
        event: { id: '' }
    });
    //default ticket templates
    const ticketAdult = {
        price: 5,
        ticketType: { ticketTypeId: 1 },
        event: { id: order.event.id }
    };
    const ticketChild = {
        price: 5,
        ticketType: { ticketTypeId: 2 },
        event: { id: order.event.id }
    };
    //
    // headers+auth
    const username = 'Admin';
    const password = 'admin';
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
    //
    const fetchEvents = async () => {
        const eurl = "https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/events"
        try {
            const eventresp = await fetch(eurl, { headers })
            const data = await eventresp.json()
            setEvents(data)
            setIsLoadingEvents(false)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => { fetchEvents() }, [])

    const postOrder = async () => {
        if (order.event.id === '') {
            return alert("Select event")

        }
        const url = "https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/orders"
        headers.set('Content-Type', 'application/json')
        try {
            console.log(order)
            const postresp = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(order)
            })
            const postrespjson = await postresp.json()
            setCompletedOrder(postrespjson)
            setOrderDone(true)
        }
        catch (e) {
            console.log(e)
        }
    }

    function ticketsToArray(ticketAdult, ticketChild) {
        const adult = Array.from({ length: tickets.adult }, () => ticketAdult);
        const child = Array.from({ length: tickets.child }, () => ticketChild);
        const concat = [...adult, ...child]
        console.log(concat)
        setOrder(prev => ({ ...prev, tickets: concat }))

    }

    const handleChangeAge = (e) => {
        setTickets(prevTickets => ({
            ...prevTickets,
            [e.target.name]: e.target.value
        }));
    }

    const handleChangeEvent = (event) => {
        setOrder({ ...order, event: { id: event.target.value } })
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
            {isLoadingEvents ? <Card>getting data...</Card>
                :
                <Card id='eventCard'>
                    <Typography variant="h6" sx={{ margin: 5 }}>Choose event</Typography>
                    <FormControl sx={{ minWidth: 200 }}>


                        <InputLabel id="eventInput">Event</InputLabel>
                        <Select id="eventSelect" value={order.event.id} onChange={handleChangeEvent} label="event">
                            {events.map((item, index) => (
                                <MenuItem id='eventList' key={index} value={item.id}>{item.name + " (eventid: " + item.id + ")"}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Card>
            }
            <Typography id='ticketMenu' variant="h6">Tickets</Typography>
            <TextField
                id='adultTicket'
                type="number"
                name="adult"
                label="Adults"
                value={tickets.adult}
                onChange={handleChangeAge}
                placeholder="Ticket(s) adults"
            />
            <TextField
                id='childrenTicket'
                type="number"
                name="child"
                label="Children"
                value={tickets.child}
                onChange={handleChangeAge}
                placeholder="Ticket(s) children"
            />
            <Typography id='ticketList'>Tickets to buy</Typography>
            <Typography>{"Adults: " + tickets.adult}</Typography>
            <Typography>{"Children: " + tickets.child}</Typography>
            <Button id='addButton' variant='contained' onClick={() => ticketsToArray(ticketAdult, ticketChild)}>Add tickets</Button>
            <Button id='orderButton' variant='contained' onClick={postOrder}>Post order</Button>

            {orderDone &&
                <Card id='orderCard' >
                    <Typography id='successMessage'>Order successful</Typography>
                    <CardContent>
                        {Object.entries(completedOrder).map(([key, value]) => (
                            <Typography key={key}>{key + " " + value}</Typography>
                        ))}
                    </CardContent>
                </Card>
            }
        </Box>
    )
}
