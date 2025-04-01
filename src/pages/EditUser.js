import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Paper, TextField, Button, Box, Divider, LinearProgress,
    Alert, Stack, InputAdornment, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Edit as EditIcon, Email as EmailIcon, Person as PersonIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchUsers, fetchUserById, updateUser } from '../services/api';

const EditUser = () => {
    const [userData, setUserData] = useState({ username: '', email: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        if (id) {
            setSelectedUserId(parseInt(id));
        }
    }, [id]);

    useEffect(() => {
        if (selectedUserId) {
            loadUserDetails(selectedUserId);
        }
    }, [selectedUserId]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await fetchUsers();
            setUsers(data);
            if (id) {
                setSelectedUserId(parseInt(id));
            } else if (data.length > 0) {
                setSelectedUserId(data[0].id);
            }
        } catch (error) {
            setFormError('Failed to load users. Please try again.');
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const loadUserDetails = async (userId) => {
        if (!userId) return;
        setLoading(true);
        try {
            const user = await fetchUserById(userId);
            if (user) {
                setUserData({ username: user.username, email: user.email });
            }
        } catch (error) {
            setFormError('Failed to load user details. Please try again.');
            toast.error('Failed to load user details');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!userData.username.trim()) newErrors.username = 'Username is required';
        if (!userData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userData.email)) {
            newErrors.email = 'Invalid email address';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleUserChange = (e) => {
        const newUserId = e.target.value;
        setSelectedUserId(newUserId);
        loadUserDetails(newUserId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm() || !selectedUserId) return;
        setLoading(true);
        try {
            await updateUser(selectedUserId, userData);
            toast.success('User updated successfully!');
            navigate('/users');
        } catch (error) {
            setFormError('Failed to update user. Please try again.');
            toast.error('Failed to update user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, fontFamily: 'Inter, sans-serif' }}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: '12px', boxShadow: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <EditIcon fontSize="large" sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="h5" fontWeight={600}>Edit User</Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />
                {loading && <LinearProgress sx={{ mb: 3 }} />}
                {formError && <Alert severity="error" sx={{ mb: 3 }}>{formError}</Alert>}
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <FormControl fullWidth>
                            <Select
                                value={selectedUserId || ""}
                                onChange={handleUserChange}
                                displayEmpty
                                renderValue={(selected) =>
                                    selected ? users.find(user => user.id === selected)?.username : "Select User"
                                }
                            >
                                <MenuItem value="" disabled>Select User</MenuItem>
                                {users.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.username} ({user.email})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Username"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={!!errors.username}
                            helperText={errors.username}
                            disabled={!selectedUserId} // Disable if no user is selected
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>
                            }}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={userData.email}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={!!errors.email}
                            helperText={errors.email}
                            disabled={!selectedUserId} // Disable if no user is selected
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>
                            }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="inherit"
                                onClick={() => navigate('/users')}
                                sx={{ bgcolor: "grey.300", color: "black", '&:hover': { bgcolor: "grey.400" } }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<EditIcon />}
                                sx={{ ml: 2, bgcolor: "primary.dark", '&:hover': { bgcolor: "primary.main" } }}
                            >
                                Update User
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
};

export default EditUser;
