import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { fetchEventTickets, fetchTicketTypes } from './ReportHandler';
import { fetchEvents } from './EventHandler';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

const EventReport = () => {

    const [ticketInfo, setTicketInfo] = useState([]);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [eventName, setEventName] = useState('');
    const { eventId } = useParams();
    
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

    const ticketTypeName = (ticketTypeId) => {
        const ticketType = ticketTypes.find(t => t.ticketTypeId === ticketTypeId);
        return ticketType ? ticketType.name: 'Unknown';
    }

    const totalTickets = (ticketTypeId) => {
        return ticketInfo.reduce((total, ticket) => {
            if (ticket.ticketTypeId === ticketTypeId) {
                return total + 1;
            }
            return total;
        }, 0);
    }

    const totalPrice = (ticketTypeId) => {
        return ticketInfo.reduce((total, ticket) => {
            if (ticket.ticketTypeId === ticketTypeId) {
                return total + ticket.ticketPrice;
            }
            return total;
        }, 0);
    }

    const columnDefs = [
        { headerName: 'Ticket Type', field: 'ticketTypeId', valueGetter: params => ticketTypeName(params.data.ticketTypeId)},
        { headerName: 'Total Tickets', valueGetter: params => totalTickets(params.data.ticketTypeId)},
        { headerName: 'Total Price', valueGetter: params => {
            const price = totalPrice(params.data.ticketTypeId);
            return `${price} €`;
            }
        }
    ];

    const defaultColDef = {
        flex: 1
    };

    return (
        <>
        <h1>Sales Report / {eventName}</h1>
        <div className="ag-theme-material" style={{ height: 500, width: '100%'}}>
            <AgGridReact
                rowData={ticketTypes}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>
        <h3>Total Tickets: {ticketInfo ? ticketInfo.length : 0}</h3>
        <Button style={{ marginLeft: "10px", marginTop: "40px" }} color="primary" variant="contained" component={Link} to={`/orderreport/${eventId}`}>Order List <ReceiptLongIcon/></Button>
        </>
    );
};

export default EventReport;
