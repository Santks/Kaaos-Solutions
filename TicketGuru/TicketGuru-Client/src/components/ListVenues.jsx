// Importing necessary libraries and components
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { fetchVenues, addVenue, editVenue, deleteVenue } from "../components/VenueHandler";
import AddchartIcon from "@mui/icons-material/Addchart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// ListVenues component
const ListVenues = () => {

    // State variables for storing row data, dialog open state, selected venue, delete dialog open state, edit mode state, and venue.
    const [rowData, setRowData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [venue, setVenue] = useState({
        "id": "",
        "name": "",
        "address": "",
        "phone": "",
        "email": "",
        "capacity": 0,
        "postalCode": {
            "postalCode": "",
            "city": "",
            "country": ""
        }
    });

    // Default venue object
    const defaultVenue = {
        "id": "",
        "name": "",
        "address": "",
        "phone": "",
        "email": "",
        "capacity": 0,
        "postalCode": {
            "postalCode": "",
            "city": "",
            "country": ""
        }
    };

    // Fetching the venues when the component mounts
    useEffect(() => {
        fetchVenues()
            .then(data => {
                setRowData(data);
            })
            .catch(error => console.error("Error:", error));
    }, []);

    // Function to handle opening the dialog
    const handleOpen = () => {
        setOpen(true);
    };

    // Function to handle closing the dialog
    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedVenue(null);
        setVenue(defaultVenue);
    };

    // Function to handle editing a venue
    const handleEdit = (venue) => {
        setSelectedVenue(venue);
        setVenue(venue);
        setEditMode(true);
        setOpen(true);
    };

    // Function to handle deleting a venue
    const handleDelete = (venue) => {
        setSelectedVenue(venue);
        setDeleteDialog(true);
    };

    // Function to confirm deleting a venue
    const confirmDelete = () => {
        deleteVenue(selectedVenue.id)
            .then(() => {
                fetchVenues().then(data => setRowData(data));
            })
            .catch(error => {
                console.error("Error:", error);
            });
        setDeleteDialog(false);
    };

    // Column definitions for the Ag-Grid table
    const columnDefs = [
        { field: "name", headerName: "Name", sortable: true, filter: true },
        { field: "address", headerName: "Address", sortable: true, filter: true },
        { field: "postalCode.postalCode", headerName: "Postal Code", sortable: true, filter: true },
        { field: "postalCode.city", headerName: "City", sortable: true, filter: true },
        { field: "postalCode.country", headerName: "Country", sortable: true, filter: true },
        { field: "phone", headerName: "Phone", sortable: true, filter: true },
        { field: "email", headerName: "Email", sortable: true, filter: true },
        { field: "capacity", headerName: "Capacity", sortable: true, filter: true },
        {
            field: "",
            headerName: "Actions",
            cellRenderer: ({ data }) => (
                <>
                    <Button color="warning" onClick={() => handleEdit(data)}>Edit <EditIcon /></Button>
                    <Button color="error" onClick={() => handleDelete(data)}>Delete <DeleteIcon /></Button>
                </>
            )
        }
    ];

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editMode) {
            editVenue(venue.id, venue)
                .then(() => {
                    fetchVenues().then(data => setRowData(data));
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        } else {
            addVenue(venue)
                .then(() => {
                    fetchVenues().then(data => setRowData(data));
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
        handleClose();
    };

    // Function to handle changes in the venue form
    const handleChangeVenue = (e) => {
        if (e.target.name === "postalCode" || e.target.name === "city" || e.target.name === "country") {
            setVenue(prevVenue => ({
                ...prevVenue,
                postalCode: {
                    ...prevVenue.postalCode,
                    [e.target.name]: e.target.value
                }
            }));
        } else {
            setVenue(prevVenue => ({
                ...prevVenue,
                [e.target.name]: e.target.value
            }));
        }
    }

    // Rendering the component
    return (
        <>
            <Button style={{ marginBottom: "10px", marginLeft: "10px" }} color="primary" variant="contained" onClick={handleOpen}>Add New Venue<AddchartIcon /></Button>
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
                <DialogTitle>{editMode ? "Edit Venue" : "Add New Venue"}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Name" name="name" id="name" value={venue.name} onChange={(e) => handleChangeVenue(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Address" name="address" id="address" value={venue.address} onChange={(e) => handleChangeVenue(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Phone" name="phone" id="phone" value={venue.phone} onChange={(e) => handleChangeVenue(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Email" name="email" id="email" value={venue.email} onChange={(e) => handleChangeVenue(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Capacity" name="capacity" id="capacity" value={venue.capacity} onChange={(e) => handleChangeVenue(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Postal Code" name="postalCode" id="postalCode" value={venue.postalCode.postalCode} onChange={(e) => handleChangeVenue(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="City" name="city" id="city" value={venue.postalCode.city} onChange={(e) => handleChangeVenue(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Country" name="country" id="country" value={venue.postalCode.country} onChange={(e) => handleChangeVenue(e)} fullWidth required />

                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="error">Cancel<CloseIcon /></Button>
                            <Button type="submit" variant="contained" color="success">{editMode ? "Edit Venue" : "Add Venue"} <CheckBoxIcon /></Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DialogTitle>Delete Venue</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete venue {selectedVenue ? selectedVenue.name : ""}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)} variant="contained" color="error">Cancel<CloseIcon /></Button>
                    <Button onClick={confirmDelete} variant="contained" color="success">Delete<DeleteIcon /></Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ListVenues;