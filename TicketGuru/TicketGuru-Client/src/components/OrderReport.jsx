import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { fetchEventOrders } from './ReportHandler';
import VisibilityIcon from '@mui/icons-material/Visibility';

const OrderReport = () => {

    const [orderInfo, setOrderInfo] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { eventId } = useParams();

    useEffect(() => {
        fetchEventOrders(eventId)
            .then(data => setOrderInfo(data))
            .catch(error => console.error('Error:', error));
    }, [eventId]);

    const columnDefs = [
        { headerName: 'Date', field: 'date' },
        { headerName: 'Order ID', field: 'orderId' },
        { headerName: 'Total Price', field: 'totalPrice', cellRenderer: ({ value }) => value !== undefined ? `${value} €` : '0 €' },
        {
            headerName: '', field: '',
            cellRenderer: ({ data }) => <Button variant="contained" color="success" onClick={() => handleOpen(data)}>View <VisibilityIcon /></Button>
        }
    ];

    const ticketColumnDefs = [
        { headerName: 'Ticket ID', field: 'ticketId' },
        { headerName: 'UUID', field: 'uuid' },
        {
            headerName: 'Used', field: 'ticketUsed',
            valueGetter: ({ data }) => data.ticketUsed === "1970-01-01T00:00:00" ? 'No' : 'Yes'
        }
    ]

    const defaultColDef = {
        flex: 1
    };

    const handleOpen = (order) => {
        setSelectedOrder(order)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <h1>Orders</h1>
            <div className="ag-theme-material" style={{ height: 500, width: '40%' }}>
                <AgGridReact
                    rowData={orderInfo}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
            <Button style={{ marginLeft: "10px", marginTop: "40px" }} color="primary" variant="contained" component={Link} to={`/eventreport/${eventId}`}>Back to Event Report</Button>


            <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth={true}>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    <div className="ag-theme-material" style={{ height: 500, width: '100%', margin: "auto" }}>
                        <AgGridReact
                            rowData={selectedOrder ? selectedOrder.tickets : []}
                            columnDefs={ticketColumnDefs}
                            defaultColDef={defaultColDef}
                            pagination={true}
                            paginationAutoPageSize={true}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="error">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default OrderReport;