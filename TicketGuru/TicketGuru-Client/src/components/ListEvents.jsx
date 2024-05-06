import React, { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, List, ListItem, ListItemText } from '@mui/material';

import AddchartIcon from '@mui/icons-material/Addchart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CloseIcon from '@mui/icons-material/Close';

import { addEvent, fetchEvents, fetchEventTickets, fetchVenues, editEvent, deleteEvent } from './EventHandler';
import { fetchTicketTypes } from './TicketTypeHandler';

const ListEvents = () => {
    const [rowData, setRowData] = useState([]);
    const [open, setOpen] = useState(false);
    const [ticketInfo, setTicketInfo] = useState(null);
    const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
    const [venues, setVenues] = useState([]);
    const [venueId, setVenueId] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [ticketTypeDialog, setTicketTypeDialog] = useState(false);
    const [ticketTypes, setTicketTypes] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedEvent(null);
        setTicketTypeDialog(false)
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setVenueId(event.venueId);
        setStartDate(new Date(event.startDate));
        setEndDate(new Date(event.endDate));
        setEditMode(true);
        handleOpen();
    };

    const handleDelete = (event) => {
        setSelectedEvent(event);
        setDeleteDialogOpen(true);
    };

    const handleTicketTypeDialog = () => {
        setTicketTypeDialog(true);
    };

    const confirmDelete = () => {
        deleteEvent(selectedEvent.id)
            .then(() => {
                fetchEvents().then(data => setRowData(data));
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setDeleteDialogOpen(false);
    };

    const handleReport = (eventId) => {
        fetchEventTickets(eventId)
            .then(data => {
                setTicketInfo(data);
                setTicketDialogOpen(true);
            })
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        fetchEvents()
            .then(data => setRowData(data))
            .catch(error => console.error('Error:', error));

        fetchVenues()
            .then(data => setVenues(data))
            .catch(error => console.error('Error:', error));

        fetchTicketTypes()
            .then(data => setTicketTypes(data))
            .catch(error => console.error('Error', error))
    }, []);

    const columnDefs = [
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
        { headerName: "Organiser Name", field: "organiserName", sortable: true, filter: true },
        { headerName: "Max Tickets", field: "maxTickets", sortable: true, filter: true },
        {
            field: "",
            headerName: "",
            cellRenderer: ({ data }) => <Button color={"warning"} onClick={() => handleEdit(data)}>Edit<EditIcon /></Button>
        },
        {
            field: "",
            headerName: "",
            cellRenderer: ({ data }) => <Button color={"error"} onClick={() => handleDelete(data)}>Delete<DeleteIcon /></Button>
        },
        {
            field: "",
            headerName: "",
            cellRenderer: ({ data }) => <Button color={"success"}>Sell Tickets<ShoppingCartIcon /></Button>
        },
        {
            field: "",
            headerName: "",
            cellRenderer: ({ data }) => <Button color={"info"} onClick={handleTicketTypeDialog}>Ticket types<ConfirmationNumberIcon /></Button>
        },
        {
            field: "",
            headerName: "",
            cellRenderer: ({ data }) => <Button color={"secondary"} onClick={() => handleReport(data.id)}>Report<AssessmentIcon /></Button>
        },
    ];

    return (
        <>
            <Button style={{ marginBottom: "10px", marginLeft: "10px" }} color="primary" variant="contained" onClick={handleOpen}>Add New Event<AddchartIcon /></Button>
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
                <DialogTitle>{editMode ? "Edit Event" : "Add a new event"}</DialogTitle>
                <DialogContent>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        const newData = {
                            venueId: venueId,
                            name: event.target.name.value,
                            description: event.target.description.value,
                            eventCategory: event.target.eventCategory.value,
                            startDate: startDate,
                            endDate: endDate,
                            eventStatus: event.target.eventStatus.value,
                            organiserName: event.target.organiserName.value,
                            maxTickets: event.target.maxTickets.value,
                        };
                        if (editMode) {
                            editEvent(selectedEvent.id, newData)
                                .then(() => {
                                    fetchEvents().then(data => setRowData(data));
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        } else {
                            addEvent(newData)
                                .then(() => {
                                    fetchEvents().then(data => setRowData(data));
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        }
                        handleClose();
                    }}>
                        <Select label="Venue" id="venue" style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} value={venueId} onChange={(e) => setVenueId(e.target.value)}>
                            {venues.map((venue) => (
                                <MenuItem key={venue.id} value={venue.id}>
                                    {venue.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Name" name="name" required defaultValue={editMode ? selectedEvent.name : ""} />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Description" name="description" required defaultValue={editMode ? selectedEvent.description : ""} />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Event Category" name="eventCategory" required defaultValue={editMode ? selectedEvent.eventCategory : ""} />
                        <TextField
                            style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }}
                            label="Start Date"
                            type="date"
                            value={startDate.toISOString().substring(0, 10)}
                            onChange={(e) => setStartDate(new Date(e.target.value))}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }}
                            label="End Date"
                            type="date"
                            value={endDate.toISOString().substring(0, 10)}
                            onChange={(e) => setEndDate(new Date(e.target.value))}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Event Status" name="eventStatus" required defaultValue={editMode ? selectedEvent.eventStatus : ""} />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Organiser Name" name="organiserName" required defaultValue={editMode ? selectedEvent.organiserName : ""} />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Max Tickets" name="maxTickets" required defaultValue={editMode ? selectedEvent.maxTickets : ""} />
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="error">Close<CloseIcon /></Button>
                            <Button type="submit" variant="contained" color="success">{editMode ? "Edit Event" : "Add Event"}</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Event</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete event {selectedEvent ? selectedEvent.name : ""}?

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} variant="contained" color="error">Cancel<CloseIcon /></Button>
                    <Button onClick={confirmDelete} variant="contained" color="success">Delete<DeleteIcon /></Button>
                </DialogActions>
            </Dialog>

            <Dialog open={ticketTypeDialog} onClose={handleClose}>
                <DialogTitle>Available Ticket Types</DialogTitle>
                <DialogContent>
                    <List>
                        {ticketTypes.map(ticketType => (
                            <ListItem key={ticketType.ticketTypeId}>
                                <ListItemText
                                    primary={ticketType.name}
                                    secondary={ticketType.description}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTicketTypeDialog(false)} variant="contained" color="error">Close<CloseIcon /></Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ListEvents;
