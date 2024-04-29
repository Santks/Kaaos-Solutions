import React, { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

import AddchartIcon from '@mui/icons-material/Addchart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CloseIcon from '@mui/icons-material/Close';

import { addEvent, fetchEvents } from './EventHandler';

const ListEvents = () => {
    const [rowData, setRowData] = useState([]);

    const [open, setOpen] = useState(false);

    const handleAdd = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        fetchEvents()
            .then(data => setRowData(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const columnDefs = [
        { headerName: "Id", field: "id", sortable: true, filter: true },
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Description", field: "description", sortable: true, filter: true },
        { headerName: "Event Category", field: "eventCategory", sortable: true, filter: true },
        {
            headerName: "Date", sortable: true, filter: true,
            valueGetter: function (params) {
                const startDate = params.data.startDate;
                const endDate = params.data.endDate;
                const format = date => date.split('-').reverse().join('.');
                return `${format(startDate)} - ${format(endDate)}`;
            }
        },
        { headerName: "Event Status", field: "eventStatus", sortable: true, filter: true },
        { headerName: "Organiser Name", field: "organiserName", sortable: true, filter: true },
        { headerName: "Max Tickets", field: "maxTickets", sortable: true, filter: true },
        {
            field: "",
            headerName: "",
            cellRenderer: ({ }) => <Button color={"warning"}>Edit<EditIcon /></Button>
        },
        {
            field: "",
            headerName: "",
            cellRenderer: ({ }) => <Button color={"error"}>Delete<DeleteIcon /></Button>
        },
        {
            field: "",
            headerName: "",
            cellRenderer: ({ }) => <Button color={"success"}>Sell Tickets<ShoppingCartIcon /></Button>
        },
        {
            field: "",
            headerName: "",
            cellRenderer: ({ }) => <Button color={"info"}>Ticket types<ConfirmationNumberIcon /></Button>
        },
        {
            field: "",
            headerName: "",
            cellRenderer: ({ }) => <Button color={"secondary"}>Report<AssessmentIcon /></Button>
        },
    ];

    return (
        <>
            <Button style={{ marginBottom: "10px", marginLeft: "10px" }} color="primary" variant="contained" onClick={handleAdd}>Add New Event<AddchartIcon /></Button>
            <div className="ag-theme-material" style={{ height: "800px", width: "100%", margin: "auto" }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={25}
                    sortable={true}
                    animateRows={true}
                />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new event</DialogTitle>
                <DialogContent>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        const newData = {
                            id: event.target.id.value,
                            name: event.target.name.value,
                            description: event.target.description.value,
                            eventCategory: event.target.eventCategory.value,
                            startDate: event.target.startDate.value,
                            endDate: event.target.endDate.value,
                            eventStatus: event.target.eventStatus.value,
                            organiserName: event.target.organiserName.value,
                            maxTickets: event.target.maxTickets.value,
                        };
                        addEvent(newData)
                            .then(data => {
                                fetchEvents().then(data => setRowData(data));
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                        handleClose();
                    }}>
                        <TextField label="Id" name="id" required />
                        <TextField label="Name" name="name" required />
                        <TextField label="Description" name="description" required />
                        <TextField label="Event Category" name="eventCategory" required />
                        <TextField label="Start Date" name="startDate" required />
                        <TextField label="End Date" name="endDate" required />
                        <TextField label="Event Status" name="eventStatus" required />
                        <TextField label="Organiser Name" name="organiserName" required />
                        <TextField label="Max Tickets" name="maxTickets" required />
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="error">Close<CloseIcon /></Button>
                            <Button type="submit" variant="contained" color="success">Add Event<AddchartIcon /></Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ListEvents;