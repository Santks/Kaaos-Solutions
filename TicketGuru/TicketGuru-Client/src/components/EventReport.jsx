import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { fetchEventTickets } from './EventHandler';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Button } from '@mui/material';

const EventReport = ({ eventId }) => {

    const [ticketInfo, setTicketInfo] = useState([]);
    
    useEffect(() => {
        fetchEventTickets(eventId)
            .then(data => setTicketInfo(data))
            .catch(error => console.error('Error:', error));
    }, [eventId]);

    const columnDefs = [
        { headerName: 'Ticket ID', field: 'ticketId'},
        { headerName: 'Price', field: 'price'},
    ];

    return (
        <div className="ag-theme-material" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={ticketInfo}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={5}
            />
            <Button style={{ marginBottom: "10px", marginLeft: "10px" }} color="primary" variant="contained">Order List <ReceiptLongIcon/></Button>
        </div>
    );
};

export default EventReport;
