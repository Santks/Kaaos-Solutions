// Importing necessary libraries and components
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { fetchUsers, addUser, editUser, deleteUser } from "../components/UserHandler";
import AddchartIcon from '@mui/icons-material/Addchart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from "@mui/icons-material/CheckBox";


// ListUsers component
const ListUsers = () => {

    // State variables for storing row data, dialog open state, user name, description, selected user, delete dialog open state, edit mode state, and user.
    const [rowData, setRowData] = useState([]);
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [desc, setDesc] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState({
        "userId": "",
        "firstName": "",
        "lastName": "",
        "phone": "0",
        "email": "",
        "address": "",
        "activeUser": true,
        "postalCode": "",
        "userRole": {
            "userRoleId": "",
        },
        "password": "",
    })

    // Default user object
    const defaultUser = {
        "userId": "",
        "firstName": "",
        "lastName": "",
        "phone": "",
        "email": "",
        "address": "",
        "activeUser": true,
        "postalCode": "",
        "userRole": {
            "userRoleId": "",
        },
        "password": "",
    }

    // Function to get the role name based on the role ID
    const getRoleName = (roleId) => {
        switch (roleId) {
            case 57: return 'Admin';
            case 58: return 'Seller';
            case 59: return 'Inspector';
            case 60: return 'Manager';
            default: return 'No role';
        }
    }

    // Fetching the users when the component mounts
    useEffect(() => {
        fetchUsers()
            .then(data => {
                setRowData(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    // Function to handle opening the dialog
    const handleOpen = () => {
        setOpen(true);
    };

    // Function to handle closing the dialog
    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedUser(null);
        setUser(defaultUser)
        setUserName("");
        setDesc("");
    };

    // Function to handle editing a user
    const handleEdit = (user) => {
        setSelectedUser(user);
        setUser(user)
        setDesc(user.email);
        setEditMode(true);
        setOpen(true);
    };

    // Function to handle deleting a user
    const handleDelete = (user) => {
        setSelectedUser(user);
        setDeleteDialog(true);
    };

    // Function to confirm deleting a user
    const confirmDelete = () => {
        deleteUser(selectedUser.userId)
            .then(() => {
                fetchUsers().then(data => setRowData(data));
            })
            .catch(error => {
                console.error('Error:', error);
            });
        setDeleteDialog(false);
    };

    // Column definitions for the Ag-Grid table
    const columnDefs = [
        { field: "firstName", headerName: "First Name", sortable: true, filter: true },
        { field: "lastName", headerName: "Last Name", sortable: true, filter: true },
        { field: "address", headerName: "Address", sortable: true, filter: true },
        { field: "postalCode.postalCode", headerName: "Postal Code", sortable: true, filter: true },
        { field: "postalCode.city", headerName: "City", sortable: true, filter: true },
        { field: "postalCode.country", headerName: "Country", sortable: true, filter: true },
        { field: "email", headerName: "Email", sortable: true, filter: true },
        { field: "phone", headerName: "Phone", sortable: true, filter: true },
        { field: "userRole.userRoleId", headerName: "Role", sortable: true, filter: true, valueGetter: params => getRoleName(params.data.userRole.userRoleId) },
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

        // If in edit mode, call the editUser function, otherwise call the addUser function
        if (editMode) {
            editUser(user.userId, user)
                .then(() => {
                    // After editing the user, fetch the updated list of users
                    fetchUsers().then(data => setRowData(data));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            addUser(user)
                .then(() => {
                    // After adding a new user, fetch the updated list of users
                    fetchUsers().then(data => setRowData(data));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        // Close the dialog
        handleClose();
    };

    // Function to handle changes in the user form
    const handleChangeUser = (e) => {
        // If the changed field is 'postalCode', 'city', or 'country', update the corresponding field in the 'postalCode' object of the 'user' state
        if (['postalCode', 'city', 'country'].includes(e.target.name)) {
            setUser(prevUser => ({
                ...prevUser,
                postalCode: {
                    ...prevUser.postalCode,
                    [e.target.name]: e.target.value
                }
            }));
        }
        // If the changed field is 'userRoleId', update the corresponding field in the 'userRole' object of the 'user' state
        else if (e.target.name === 'userRoleId') {
            setUser(prevUser => ({
                ...prevUser,
                userRole: {
                    ...prevUser.userRole,
                    [e.target.name]: e.target.value
                }
            }));
        }
        // For all other fields, update the corresponding field in the 'user' state
        else {
            setUser(prevUser => ({
                ...prevUser,
                [e.target.name]: e.target.value
            }));
        }
    }

    // Rendering the component
    return (
        <>
            <Button style={{ marginBottom: "10px", marginLeft: "10px" }} color="primary" variant="contained" onClick={handleOpen}>Add New User<AddchartIcon /></Button>
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
                <DialogTitle>{editMode ? "Edit User" : "Add New User"}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="First Name" name="firstName" id="firstName" value={user.firstName} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Last Name" name="lastName" id="lastName" value={user.lastName} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Email" name="email" id="email" value={user.email} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Phone" name="phone" id="phone" value={user.phone} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Address" name="address" id="address" value={user.address} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Postal Code" name="postalCode" id="postalCode" value={user.postalCode ? user.postalCode.postalCode : ''} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="City" name="city" id="city" value={user.postalCode ? user.postalCode.city : ''} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Country" name="country" id="country" value={user.postalCode ? user.postalCode.country : ''} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <FormControl style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} fullWidth required>
                            <InputLabel id="userRoleId-label">Role</InputLabel>
                            <Select
                                labelId="userRoleId-label"
                                name="userRoleId"
                                id="userRoleId"
                                value={user.userRole.userRoleId}
                                onChange={(e) => handleChangeUser(e)}
                            >
                                <MenuItem value={57}>Admin</MenuItem>
                                <MenuItem value={58}>Seller</MenuItem>
                                <MenuItem value={59}>Inspector</MenuItem>
                                <MenuItem value={60}>Manager</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Password" name="password" id="password" value={user.password} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="error">Cancel<CloseIcon /></Button>
                            <Button type="submit" variant="contained" color="success">{editMode ? "Edit User" : "Add User"}<CheckBoxIcon /></Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete user {selectedUser ? selectedUser.name : ""}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)} variant="contained" color="error">Cancel<CloseIcon /></Button>
                    <Button onClick={confirmDelete} variant="contained" color="success">Delete<DeleteIcon /></Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ListUsers;