import React, { useState } from "react";
import {
    Container,
    Typography,
    Paper,
    TextField,
    Button,
    Box,
    Divider,
    LinearProgress,
    Alert,
    Stack,
    InputAdornment,
} from "@mui/material";
import {
    PersonAdd as PersonAddIcon,
    Email as EmailIcon,
    Person as PersonIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser } from "../services/api";

const AddUser = () => {
    const [userData, setUserData] = useState({ username: "", email: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!userData.username.trim()) newErrors.username = "Username is required";
        if (!userData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userData.email)) {
            newErrors.email = "Invalid email address";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setFormError(null);
        try {
            await createUser(userData);
            toast.success("User created successfully!");
            setUserData({ username: "", email: "" });
            navigate("/users");
        } catch (error) {
            setFormError("Failed to create user. Please try again.");
            toast.error("Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4, bgcolor: "#222", color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <PersonAddIcon fontSize="large" sx={{ mr: 2, color: "white" }} />
                    <Typography variant="h4" component="h2">
                        Add New User
                    </Typography>
                </Box>
                <Divider sx={{ mb: 3, bgcolor: "#444" }} />
                {loading && <LinearProgress color="inherit" sx={{ mb: 3 }} />}
                {formError && <Alert severity="error" sx={{ mb: 3 }}>{formError}</Alert>}
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label="Username"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={!!errors.username}
                            helperText={errors.username}
                            disabled={loading}
                            sx={{
                                bgcolor: "#333",
                                input: { color: "white" },
                                label: { color: "#bbb" },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{ color: "white" }} />
                                    </InputAdornment>
                                ),
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
                            disabled={loading}
                            sx={{
                                bgcolor: "#333",
                                input: { color: "white" },
                                label: { color: "#bbb" },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: "white" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/users")}
                                disabled={loading}
                                sx={{
                                    color: "white",
                                    borderColor: "white",
                                    "&:hover": { borderColor: "#ccc" },
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                sx={{ bgcolor: "white", color: "black", "&:hover": { bgcolor: "#ddd" } }}
                                startIcon={<PersonAddIcon />}
                            >
                                {loading ? "Creating..." : "Add User"}
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
};

export default AddUser;
