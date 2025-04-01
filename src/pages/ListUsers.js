import React, { useState, useEffect, useRef } from 'react';
import {
    Container, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, IconButton, Box, LinearProgress, Divider,
    Alert, TextField, InputAdornment
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchUsers } from '../services/api';

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const isFirstLoad = useRef(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await fetchUsers();
            setUsers(data);
            setError(null);

            if (isFirstLoad.current) {
                toast.success('Users loaded successfully');
                isFirstLoad.current = false;
            }
        } catch (error) {
            setError('Failed to load users. Please try again.');
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => navigate(`/users/edit/${id}`);


    const handleDelete = (id) => navigate(`/users/delete`, { state: { userId: id } });

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={4} sx={{ p: 3, bgcolor: '#222', color: 'white', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: '#ddd' }}>User Directory</Typography>
                    <IconButton color="inherit" onClick={loadUsers} title="Refresh">
                        <RefreshIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 3 }} />

                <TextField
                    fullWidth
                    label="Search Users"
                    variant="outlined"
                    margin="normal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        sx: { bgcolor: '#333', color: 'white' }
                    }}
                    sx={{ mb: 3 }}
                />

                {loading && <LinearProgress sx={{ mb: 3 }} />}
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: '#bbb' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#bbb' }}>Username</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#bbb' }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#bbb' }} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id} hover>
                                        <TableCell sx={{ color: 'white' }}>{user.id}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{user.username}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
                                        <TableCell align="center">
                                            <IconButton color="info" onClick={() => handleEdit(user.id)} title="Edit User">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(user.id)} title="Delete User">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        {searchTerm ? 'No users match your search' : 'No users found'}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default ListUsers;
