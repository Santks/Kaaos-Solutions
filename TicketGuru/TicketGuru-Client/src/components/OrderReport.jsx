import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { fetchEventOrders } from './ReportHandler';

const OrderReport = () => {

    const [orderInfo, setOrderInfo] = useState([]);
    const { eventId } = useParams();

    useEffect(() => {
        fetchEventOrders(eventId)
            .then(data => setOrderInfo(data))
            .catch(error => console.error('Error:', error));    
    }, [eventId]);

    const columnDefs = [
        {headerName: 'Order ID', field: 'orderId'},
        {headerName: 'Date', field: 'date'},
        {headerName: 'Total Price', field: 'totalPrice'},
        {headerName: 'Total Tickets', field: 'tickets.length'}
    ];

    const defaultColDef = {
        flex: 1
    };

    return (
        <>
        <h1>Orders</h1>
        <div className="ag-theme-material" style={{ height: 500, width: '100%'}}>
            <AgGridReact
                rowData={orderInfo}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>
        <Button style={{ marginLeft: "10px", marginTop: "40px" }} color="primary" variant="contained" component={Link} to={`/eventreport/${eventId}`}>Back to Event Report</Button>
        </>
    );
}

export default OrderReport;