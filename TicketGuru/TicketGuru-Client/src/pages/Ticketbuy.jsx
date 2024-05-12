import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Alert, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useParams } from 'react-router-dom';
import { fetchTicketTypes } from '../components/TicketTypeHandler';
import { fetchEvents } from '../components/EventHandler';

export default function Ticketbuy() {
    const { eventId } = useParams();
    const [isLoadingEvents, setIsLoadingEvents] = useState(true);
    const [orderDone, setOrderDone] = useState(false);
    const [completedOrder, setCompletedOrder] = useState(null)
    const [event, setEvent] = useState(null);
    const [ticketTypes, setTicketTypes] = useState([])


    const currDate = new Date();
    // set empty order
    const [order, setOrder] = useState({
        date: currDate,
        customer: { userId: 1 },
        seller: { userId: 2 },
        event: { id: '' },
        tickets: [],
        totalPrice: 0.0
    });


    console.log(order)

    //
    // headers+auth
    const username = 'Admin';
    const password = 'admin';
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));


    // fetch event data based on the url param
    const fetchEvent = async () => {
        const eurl = `https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/events/${eventId}`;
        try {
            const eventresp = await fetch(eurl, { headers })
            const data = await eventresp.json()
            setEvent(data)
            setIsLoadingEvents(false)
            console.log(data)

            setOrder((prevOrder) => ({
                ...prevOrder,
                event: { id: data.id }
            })); // set event's id
            const tickettypesdata = await fetchTicketTypes(eventId) // get ticket types
            setTicketTypes(tickettypesdata)
            console.log(tickettypesdata)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => { fetchEvent() }, [])


    // POST order
    const handleSubmit = async (event) => {
        event.preventDefault()
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
            console.log(postrespjson)
        }
        catch (e) {
            console.log(e)
        }
    }

    // set total price every time tickets array changes
    useEffect(() => {
        let total = 0;


        for (let i = 0; i < order.tickets.length; i++) {
            const ticket = order.tickets[i]; // single ticket in tickets
            const price = ticket.ticketType.price; // price of a single ticket
            total += price;
        }

        // set price in order
        setOrder(prevOrder => ({
            ...prevOrder,
            totalPrice: total
        }));

    }, [order.tickets]); // call when ticket array changes

    const handleInputChange = (event, item) => {
        const { value } = event.target;
        const quantity = parseInt(value, 10);

        if (quantity >= 0) {
            let updatedTickets = [...order.tickets]; // get all tickets present

            // nuke all tickets with item.tickettypeid
            updatedTickets = updatedTickets.filter(ticket => ticket.ticketType.ticketTypeId !== item.ticketTypeId);

            // push event.target.value times the ticket into the array
            for (let i = 0; i < quantity; i++) {
                updatedTickets.push({ event: { id: order.event.id }, ticketType: { ticketTypeId: item.ticketTypeId, price: item.price } });
            }
            // set the updated array in order
            setOrder((prevOrder) => ({
                ...prevOrder,
                tickets: updatedTickets
            }));
        }
    }



    const getEvents = async () => {
        try {
            // Call fetchEvents to get events data
            const events = await fetchEvents();
            return events;
        } catch (e) {

        }
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
            {isLoadingEvents ? <Card>getting data...</Card>
                :
                <>
                    <h2>Buying tickets for: {event.name}</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        Select tickets
                        <br />
                        {ticketTypes.length === 0 ? <>No ticket types found. Create new types first.</> :

                            ticketTypes.map((item) => (
                                <>
                                    <label>{'Type: ' + item.name}
                                        <br />
                                        <text>{'Desc: ' + item.description}</text>
                                        <br />
                                        <text>{'Price:' + item.price}</text>
                                        <br />
                                        <input type="number"
                                            name={`ticketType${item.id}`}
                                            value={order.tickets.filter(ticket => ticket.ticketType.ticketTypeId === item.ticketTypeId).length}
                                            onChange={(e) => handleInputChange(e, item)} />
                                    </label>
                                    <br />
                                </>
                            ))}

                        <br />
                        <br />
                        <>
                            <p>{'Current total: ' + order.totalPrice + '€'}</p></>
                        <button type="submit">Submit</button>
                    </form>

                </>

            }


            {!orderDone ? <></> : <>Order success!
                <div>{'Order date:' + completedOrder.date}</div>
                <div>{'Order id:' + completedOrder.orderId}</div>
                <div>{'Order total:' + completedOrder.totalPrice}</div>
                {completedOrder.tickets.map((ticket) => {
                    return (
                        <Card>
                            <h4>{'Ticket id: ' + ticket.ticketId}</h4>
                            <div>{'UUID: ' + ticket.uuid}</div>
                        </Card>

                    )
                })}
            </>}
        </Box>
    )
}
