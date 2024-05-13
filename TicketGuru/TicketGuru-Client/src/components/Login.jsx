import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from '@mui/icons-material/Close';

const Login = ({ open, onClose, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await onLogin(username, password);
        if (success) {
            setUsername('');
            setPassword('');
            setError(null);
            onClose();
        } else {
            setError('Error: Wrong username or password!');
        }
    };

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setError(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField required style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField required style={{ marginBottom: "5px", marginRight: "5px", marginTop: "5px" }} label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}
                    <DialogActions>
                        <Button variant="contained" color="error" onClick={handleClose}>Cancel <CloseIcon /></Button>
                        <Button variant="contained" color="success" type="submit">Login<LoginIcon /></Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Login;
