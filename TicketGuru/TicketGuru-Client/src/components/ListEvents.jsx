// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Link } from 'react-router-dom';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { addEvent, fetchEvents, fetchVenues, editEvent, deleteEvent } from './EventHandler';
import { format, parseISO } from 'date-fns';
import { fetchTicketTypes } from './TicketTypeHandler';
import AddchartIcon from '@mui/icons-material/Addchart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


// ListEvents component
const ListEvents = () => {

    // State variables for storing row data, dialog open state, ticket info, venues, selected venue, start date, end date, selected event, 
    // edit mode state, delete dialog open state, ticket type dialog state, ticket types, and tickets sold.
    const [rowData, setRowData] = useState([]);
    const [open, setOpen] = useState(false);
    const [venues, setVenues] = useState([]);
    const [venue, setVenue] = useState(null);
    const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
    const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Function to handle opening the dialog
    const handleOpen = () => {
        if (!editMode) {
            setVenue(null);
        }
        setOpen(true);
    };

    // Function to handle closing the dialog
    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedEvent(null);
        setStartDate(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
        setEndDate(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
        setVenue(null);
    };




    // Function to handle editing an event
    const handleEdit = (event) => {
        setSelectedEvent(event);
        setStartDate(format(parseISO(event.startDate), "yyyy-MM-dd'T'HH:mm"));
        setEndDate(format(parseISO(event.endDate), "yyyy-MM-dd'T'HH:mm"));
        setEditMode(true);
        setVenue(event.venue);
        handleOpen();
    };



    // Function to handle deleting an event
    const handleDelete = (event) => {
        setSelectedEvent(event);
        setDeleteDialogOpen(true);
    };

    // Function to confirm deleting an event
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

    // Fetching the events, venues, and ticket types when the component mounts
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
    }, []);

    // Setting the venue when the edit mode is enabled
    useEffect(() => {
        if (editMode) {
            const venue = venues.find(v => v.id === selectedEvent.venue.id)
            setVenue(venue);
        }
    }, [editMode]);

    // Column definitions for the Ag-Grid table
    const columnDefs = [
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Description", field: "description", sortable: true, filter: true },
        { headerName: "Venue", field: "venue.name", sortable: true, filter: true },
        { headerName: "Category", field: "eventCategory", sortable: true, filter: true },
        {
            headerName: "Start Date", sortable: true, filter: true,
            valueGetter: function (params) {
                const startDate = params.data.startDate;
                const format = date => date.split('T')[0].split('-').reverse().join('.') + ' ' + date.split('T')[1].substring(0, 5);
                return format(startDate);
            }
        },
        {
            headerName: "End Date", sortable: true, filter: true,
            valueGetter: function (params) {
                const endDate = params.data.endDate;
                const format = date => date.split('T')[0].split('-').reverse().join('.') + ' ' + date.split('T')[1].substring(0, 5);
                return format(endDate);
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
            headerName: "Actions",
            cellRenderer: ({ data }) => (
                <>
                    <Button color="warning" onClick={() => handleEdit(data)}>Edit <EditIcon /></Button>
                    <Button color="error" onClick={() => handleDelete(data)}>Delete <DeleteIcon /></Button>
                    <Button color="info" component={Link} to={`/tickettypes/${data.id}`}>Ticket types<ConfirmationNumberIcon /></Button>
                    <Button color="success" component={Link} to={{ pathname: `/ticketbuy/${data.id}` }}>Buy tickets<ShoppingCartIcon /></Button>
                    <Button color="secondary" component={Link} to={`/eventreport/${data.id}`}>Report<AssessmentIcon /></Button>
                </>
            )
        }
    ];

    // Rendering the component
    return (
        <>
            <Button style={{ marginBottom: "10px", marginLeft: "10px" }} color="primary" variant="contained" onClick={handleOpen}>Add New Event<AddchartIcon /></Button>
            <div className="ag-theme-material" style={{ height: "800px", width: "100%", margin: "auto" }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    pagination={true}
                    sortable={true}
                    paginationPageSize={10}
                    paginationPageSizeSelectorValues={[10, 25, 50, 100]}
                    animateRows={true}
                    autoSizeStrategy={{ type: 'fitCellContents' }}
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
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }}
                            label="End Date"
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ min: startDate }}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
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
        </>
    );
};

export default ListEvents;