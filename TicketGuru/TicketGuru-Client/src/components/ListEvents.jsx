import React, { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Link } from 'react-router-dom';
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
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { addEvent, fetchEvents, fetchEventTickets, fetchVenues, editEvent, deleteEvent } from './EventHandler';
import { fetchTicketTypes } from './TicketTypeHandler';

const ListEvents = () => {
    const [rowData, setRowData] = useState([]);
    const [open, setOpen] = useState(false);
    const [ticketInfo, setTicketInfo] = useState(null);
    const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
    const [venues, setVenues] = useState([]);
    const [venue, setVenue] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [ticketTypeDialog, setTicketTypeDialog] = useState(false);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [ticketsSold, setTicketsSold] = useState([]);


    const handleOpen = () => {
        if (!editMode) {
            setVenue(null);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedEvent(null);
        setTicketTypeDialog(false)
        setStartDate(new Date());
        setEndDate(new Date());
        setVenue(null);
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setStartDate(new Date(event.startDate));
        setEndDate(new Date(event.endDate));
        setEditMode(true);
        setVenue(event.venue);
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

    useEffect(() => {
        fetchEvents()
            .then(data => setRowData(data))
            .catch(error => console.error('Error:', error));

        fetchVenues()
            .then(data => {
                setVenues(data);
                if (editMode && selectedEvent) {
                    const venue = data.find(v => v.id === selectedEvent.venue.id);
                    setVenue(venue);
                }
            })
            .catch(error => console.error('Error:', error));

        fetchTicketTypes()
            .then(data => setTicketTypes(data))
            .catch(error => console.error('Error', error))
    }, []);

    useEffect(() => {
        if (editMode) {
            const venue = venues.find(v => v.id === selectedEvent.venue.id)
            setVenue(venue);
        }
    }, [editMode]);

    const columnDefs = [
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Description", field: "description", sortable: true, filter: true },
        { headerName: "Venue", field: "venue.name", sortable: true, filter: true },
        { headerName: "Category", field: "eventCategory", sortable: true, filter: true },
        {
            headerName: "Date", sortable: true, filter: true,
            valueGetter: function (params) {
                const startDate = params.data.startDate;
                const endDate = params.data.endDate;
                const format = date => date.split('-').reverse().join('.');
                return `${format(startDate)} - ${format(endDate)}`;
            }
        },
        { headerName: "Organiser", field: "organiserName", sortable: true, filter: true },
        { headerName: "Max Tickets", field: "maxTickets", sortable: true, filter: true },
        {
            headerName: "Tickets Left",
            valueGetter: function (params) {
                return params.data.maxTickets - params.data.ticketsSold;
            }
        },
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
            cellRenderer: ({ data }) => <Button color={"info"} component={Link} to={`/tickettypes/${data.id}`}>Ticket types<ConfirmationNumberIcon /></Button>
        },
        {
            field: "",
            headerName: "",
            cellRenderer: ({ data }) => <Button color={"secondary"} component={Link} to={`/eventreport/${data.id}`}>Report<AssessmentIcon /></Button>
        },
        {
            field: "",
            headerName: "",
            cellRenderer: ({ data }) => <Button color={"secondary"} component={Link} to={{pathname:`/ticketbuy/${data.id}` }}>Buy tickets<AssessmentIcon /></Button>
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
                            name: event.target.name.value,
                            description: event.target.description.value,
                            eventCategory: event.target.eventCategory.value,
                            startDate: startDate,
                            endDate: endDate,
                            eventStatus: event.target.eventStatus.value,
                            organiserName: event.target.organiserName.value,
                            maxTickets: event.target.maxTickets.value,
                            venue: venue,
                        };
                        if (editMode) {
                            editEvent(selectedEvent.id, newData, () => fetchEvents().then(data => setRowData(data)))
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        } else {
                            addEvent(newData, () => fetchEvents().then(data => setRowData(data)))
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        }
                        handleClose();
                    }}>
                        <TextField
                            id="venue"
                            type="text"
                            select
                            label="Venue"
                            required
                            style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }}
                            value={venue ? venue.id.toString() : ""}
                            onChange={(e) => setVenue(venues.find(v => v.id.toString() === e.target.value))}
                            helperText="Please select your venue">
                            {venues.map((venue) => (
                                <MenuItem key={venue.id} value={venue.id.toString()}>
                                    {venue.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} type="text" label="Name" name="name" required defaultValue={editMode ? selectedEvent.name : ""} />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} type="text" label="Description" name="description" required defaultValue={editMode ? selectedEvent.description : ""} />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} type="text" label="Event Category" name="eventCategory" required defaultValue={editMode ? selectedEvent.eventCategory : ""} />
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
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ min: startDate.toISOString().substring(0, 10) }}
                            value={endDate.toISOString().substring(0, 10)}
                            onChange={(e) => setEndDate(new Date(e.target.value))}
                        />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} type="text" label="Event Status" name="eventStatus" required inputProps={{ maxLength: 1 }} defaultValue={editMode ? selectedEvent.eventStatus : ""} />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} type="text" label="Organiser Name" name="organiserName" required defaultValue={editMode ? selectedEvent.organiserName : ""} />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} type="number" label="Max Tickets" name="maxTickets" required inputProps={{ max: venue ? venue.capacity : "" }} defaultValue={editMode ? selectedEvent.maxTickets : ""} />
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="error">Close<CloseIcon /></Button>
                            <Button type="submit" variant="contained" color="success">{editMode ? "Edit Event" : "Add Event"}<CheckBoxIcon /></Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Event</DialogTitle>
                <DialogContent>Are you sure you want to delete event {selectedEvent ? selectedEvent.name : ""}?</DialogContent>
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