import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Paper,
    Typography,
    Box,
    CircularProgress,
    Grid,
} from "@mui/material";

const UserForm = ({ onSubmit, initialData, isEditing, onCancel, loading }) => {
    const [formData, setFormData] = useState({ username: "", email: "" });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                maxWidth: 500,
                mx: "auto",
                my: 4,
                fontFamily: "Inter, sans-serif",
            }}
        >
            <Typography variant="h5" fontWeight={600} mb={2}>
                {isEditing ? "Edit User" : "Add New User"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            {isEditing && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={onCancel}
                                    sx={{ textTransform: "none" }}
                                >
                                    Cancel
                                </Button>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: "none" }}
                                disabled={loading}
                                startIcon={loading && <CircularProgress size={20} />}
                            >
                                {loading ? "Processing..." : isEditing ? "Update User" : "Add User"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default UserForm;
