// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { fetchEventTickets, fetchTicketTypes } from './ReportHandler';
import { fetchEvents } from './EventHandler';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

// Component for Event Report
const EventReport = () => {

    // State variables for storing ticket info, ticket types, and event name
    const [ticketInfo, setTicketInfo] = useState([]);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [eventName, setEventName] = useState('');

    // Getting the event ID from the URL parameters
    const { eventId } = useParams();

    // Fetching the event data, ticket types, and ticket info when the component mounts
    useEffect(() => {
        fetchEvents(eventId)
            .then(events => {
                if (events) {
                    const event = events.find(event => event.id === Number(eventId));
                    setEventName(event.name)
                }
            })
            .catch(error => console.error('Error:', error));

        fetchTicketTypes(eventId)
            .then(data => setTicketTypes(data))
            .catch(error => console.error('Error:', error));

        fetchEventTickets(eventId)
            .then(data => setTicketInfo(data))
            .catch(error => console.error('Error:', error));
    }, [eventId]);

    // Function to get the name of a ticket type
    const ticketTypeName = (ticketTypeId) => {
        const ticketType = ticketTypes.find(t => t.ticketTypeId === ticketTypeId);
        return ticketType ? ticketType.name : 'Unknown';
    }

    // Function to calculate the total number of tickets of a certain type
    const totalTickets = (ticketTypeId) => {
        return ticketInfo.reduce((total, ticket) => {
            if (ticket.ticketTypeId === ticketTypeId) {
                return total + 1;
            }
            return total;
        }, 0);
    }

    // Function to calculate the total price of tickets of a certain type
    const totalPrice = (ticketTypeId) => {
        return ticketInfo.reduce((total, ticket) => {
            if (ticket.ticketTypeId === ticketTypeId) {
                return total + ticket.ticketPrice;
            }
            return total;
        }, 0);
    }

    // Column definitions for the Ag-Grid table
    const columnDefs = [
        { headerName: 'Ticket Type', field: 'ticketTypeId', valueGetter: params => ticketTypeName(params.data.ticketTypeId) },
        { headerName: 'Total Tickets', valueGetter: params => totalTickets(params.data.ticketTypeId) },
        {
            headerName: 'Total Price', valueGetter: params => {
                const price = totalPrice(params.data.ticketTypeId);
                return `${price} €`;
            }
        }
    ];

    // Default column definition for the Ag-Grid table
    const defaultColDef = {
        flex: 1
    };

    // Rendering the component
    return (
        <>
            <h1>Sales Report / {eventName}</h1>
            <h3>{ticketInfo ? ticketInfo.length : 0} tickets sold to this event.</h3>
            <div className="ag-theme-material" style={{ height: 400, width: '30%' }}>
                <AgGridReact
                    rowData={ticketTypes}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
            <Button style={{ marginLeft: "10px", marginTop: "20px" }} color="primary" variant="contained" component={Link} to={`/orderreport/${eventId}`}>List Orders<ReceiptLongIcon /></Button>
        </>
    );
};

export default EventReport;