import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem } from '@mui/material';
import AddchartIcon from '@mui/icons-material/Addchart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { fetchUsers, addUser, editUser, deleteUser } from "../components/UserHandler";

const ListUsers = () => {
    const [rowData, setRowData] = useState([]);
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [desc, setDesc] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);


    const [user, setUser] = useState({
        "userId": null,
        "firstName": "",
        "lastName": "",
        "phone": null,
        "email": "",
        "address": null,
        "activeUser": false,
        "postalCode": null,
        "userRole": {
            "userRoleId": 1,
        },
        "password": "",
    })
    const defaultUser = {
        "userId": null,
        "firstName": "",
        "lastName": "",
        "phone": null,
        "email": "",
        "address": null,
        "activeUser": false,
        "postalCode": null,
        "userRole": {
            "userRoleId": 1,
        },
        "password": "",
    }

    useEffect(() => {
        fetchUsers()
            .then(data => setRowData(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedUser(null);
        setUser(defaultUser)
        setUserName("");
        setDesc("");
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setUser(user)
        setDesc(user.email);
        setEditMode(true);
        setOpen(true);
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setDeleteDialog(true);
    };

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

    const columnDefs = [
        { field: "lastName", headerName: "Last Name", sortable: true, filter: true },
        { field: "firstName", headerName: "First Name", sortable: true, filter: true },
        { field: "email", headerName: "email", sortable: true, filter: true },
        { field: "phone", headerName: "phone", sortable: true, filter: true },
        { field: "userRole.userRoleId", headerName: "User Role", sortable: true, filter: true },
        { field: "address", headerName: "Address", sortable: true, filter: true },
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

        if (editMode) {
            editUser(user.userId, user)
                .then(() => {
                    fetchUsers().then(data => setRowData(data));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            addUser(user)
                .then(() => {
                    fetchUsers().then(data => setRowData(data));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        handleClose();
    };

    const handleChangeUser = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)

        if (e.target.name === 'postalCode') {
            parseInt(e.target.value)
        }
        if (e.target.name === 'userRoleId') {
            setUser(prevUser => ({
                ...prevUser,
                userRole: {
                    ...prevUser.userRole,
                    [e.target.name]: e.target.value
                }
            }));
        } else {
            setUser(prevUser => ({
                ...prevUser,
                [e.target.name]: e.target.value
            }));
        }
        console.log(user)
    }

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
                    animateRows={true}
                    autoSizeStrategy={{ type: 'fitCellContents' }}

                />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? "Edit User" : "Add New User"}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField disabled label="ID" name="userId" id="userId" value={user.userId} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <TextField label="First Name" name="firstName" id="firstName" value={user.firstName} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <TextField label="Last Name" name="lastName" id="lastName" value={user.lastName} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <TextField label="Email" name="email" id="email" value={user.email} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <TextField label="Phone" name="phone" id="phone" value={user.phone} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <TextField label="Address" name="address" id="address" value={user.address} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        {/* <TextField label="Postal Code" name="postalCode" id="postalCode" value={user.postalCode} onChange={(e) => handleChangeUser(e)} fullWidth required /> */}
                        <Select label="User Role ID" name="userRoleId" id="userRoleId" value={user.userRole.userRoleId} onChange={(e) => handleChangeUser(e)} fullWidth required>
                            <MenuItem value={57}>Admin</MenuItem>
                            <MenuItem value={58}>Seller</MenuItem>
                            <MenuItem value={59}>Inspector</MenuItem>
                            <MenuItem value={60}>Manager</MenuItem>
                        </Select>
                        <TextField label="Password" name="password" id="password" value={user.password} onChange={(e) => handleChangeUser(e)} fullWidth required />
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="error">Cancel<CloseIcon /></Button>
                            <Button type="submit" variant="contained" color="success">{editMode ? "Save Changes" : "Add User"}</Button>
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
