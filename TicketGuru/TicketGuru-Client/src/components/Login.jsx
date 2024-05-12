import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from '@mui/icons-material/Close';

const Login = ({ open, onClose, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        onLogin(username, password);
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <DialogActions>
                        <Button variant="contained" color="error" onClick={onClose}>Cancel <CloseIcon /></Button>
                        <Button variant="contained" color="success" type="submit">Login<LoginIcon /></Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Login;
