import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { fetchEventTickets } from './ReportHandler';
import { fetchEvents } from './EventHandler';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

const EventReport = () => {

    const [ticketInfo, setTicketInfo] = useState([]);
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

        fetchEventTickets(eventId)
            .then(data => setTicketInfo(data))
            .catch(error => console.error('Error:', error));    
    }, [eventId]);

    const columnDefs = [
        { headerName: 'Ticket Type', field: 'null'},
        { headerName: 'Total Tickets', field: 'null'},
        { headerName: 'Ticket ID', field: 'ticketId'},
        { headerName: 'Price', field: 'price'},
    ];

    const defaultColDef = {
        flex: 1
    };

    return (
        <>
        <h1>Sales Report / {eventName}</h1>
        <div className="ag-theme-material" style={{ height: 500, width: '100%'}}>
            <AgGridReact
                rowData={ticketInfo}
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
