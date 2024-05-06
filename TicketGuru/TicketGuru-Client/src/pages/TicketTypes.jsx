import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import AddchartIcon from '@mui/icons-material/Addchart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { fetchTicketTypes, addTicketType, editTicketType, deleteTicketType } from "../components/TicketTypeHandler";

const ListTicketTypes = () => {
    const [rowData, setRowData] = useState([]);
    const [open, setOpen] = useState(false);
    const [typeName, setTypeName] = useState("");
    const [desc, setDesc] = useState("");
    const [selectedTicketType, setSelectedTicketType] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchTicketTypes()
            .then(data => setRowData(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedTicketType(null);
        setTypeName("");
        setDesc("");
    };

    const handleEdit = (ticketType) => {
        setSelectedTicketType(ticketType);
        setTypeName(ticketType.name);
        setDesc(ticketType.description);
        setEditMode(true);
        setOpen(true);
    };

    const handleDelete = (ticketType) => {
        setSelectedTicketType(ticketType);
        setDeleteDialog(true);
    };

    const confirmDelete = () => {
        deleteTicketType(selectedTicketType.ticketTypeId)
            .then(() => {
                fetchTicketTypes().then(data => setRowData(data));
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setDeleteDialog(false);
    };

    const columnDefs = [
        { field: "name", headerName: "Name", sortable: true, filter: true },
        { field: "description", headerName: "Description", sortable: true, filter: true },
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            name: typeName,
            description: desc
        };
        if (editMode) {
            editTicketType(selectedTicketType.ticketTypeId, newData)
                .then(() => {
                    fetchTicketTypes().then(data => setRowData(data));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            addTicketType(newData)
                .then(() => {
                    fetchTicketTypes().then(data => setRowData(data));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        handleClose();
    };

    return (
        <>
            <Button style={{ marginBottom: "10px", marginLeft: "10px" }} color="primary" variant="contained" onClick={handleOpen}>Add New Ticket Type<AddchartIcon /></Button>
            <div className="ag-theme-material" style={{ height: "800px", width: "100%", margin: "auto" }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    pagination={true}
                    sortable={true}
                    paginationPageSize={10}
                    animateRows={true}
                />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? "Edit Ticket Type" : "Add New Ticket Type"}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField label="Name" value={typeName} onChange={(e) => setTypeName(e.target.value)} fullWidth required />
                        <TextField label="Description" value={desc} onChange={(e) => setDesc(e.target.value)} fullWidth required />
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="error">Cancel<CloseIcon /></Button>
                            <Button type="submit" variant="contained" color="success">{editMode ? "Save Changes" : "Add Ticket Type"}</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DialogTitle>Delete Ticket Type</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete ticket type {selectedTicketType ? selectedTicketType.name : ""}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)} variant="contained" color="error">Cancel<CloseIcon /></Button>
                    <Button onClick={confirmDelete} variant="contained" color="success">Delete<DeleteIcon /></Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ListTicketTypes;
