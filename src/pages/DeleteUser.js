import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Paper,
    Button,
    Box,
    Divider,
    LinearProgress,
    Alert,
    Card,
    CardContent,
    FormControl,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Delete as DeleteIcon, Warning as WarningIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUsers, deleteUser } from "../services/api";

const DeleteUser = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        if (location.state?.userId) {
            setSelectedUserId(location.state.userId);
        }
    }, [location.state]);

    useEffect(() => {
        const user = users.find((u) => u.id === selectedUserId);
        setSelectedUser(user || null);
    }, [selectedUserId, users]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await fetchUsers();
            setUsers(data);
            setError(null);

            // Ensure only preselected user is selected
            if (location.state?.userId) {
                setSelectedUserId(location.state.userId);
            } else {
                setSelectedUserId(""); // Keep empty instead of selecting first user
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Failed to load users. Please try again.");
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };


    const handleUserChange = (e) => setSelectedUserId(e.target.value);
    const handleOpenConfirm = () => setConfirmOpen(true);
    const handleCloseConfirm = () => setConfirmOpen(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteUser(selectedUserId);
            toast.success("User deleted successfully!");
            setSelectedUserId("");
            setSelectedUser(null);
            setConfirmOpen(false);
            loadUsers(); // Refresh list
            navigate("/users");
        } catch (error) {
            console.error("Error deleting user:", error);
            setError("Failed to delete user. Please try again.");
            toast.error("Failed to delete user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={4} sx={{ p: 4, bgcolor: "#1e1e1e", color: "white", borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <DeleteIcon fontSize="large" sx={{ mr: 2, color: "error.main" }} />
                    <Typography variant="h4">Delete User</Typography>
                </Box>
                <Divider sx={{ mb: 4, bgcolor: "#444" }} />

                {loading && <LinearProgress sx={{ mb: 3 }} />}
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <FormControl fullWidth sx={{ mb: 4 }}>
                    <Select
                        value={selectedUserId || ""}
                        onChange={handleUserChange}
                        disabled={loading || users.length === 0}
                        displayEmpty
                        renderValue={(selected) =>
                            selected ? users.find(user => user.id === selected)?.username : "Select User to Delete"
                        }
                        sx={{
                            bgcolor: "#333",
                            color: "white",
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#888" },
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
                        }}
                    >
                        <MenuItem value="" disabled>Select User to Delete</MenuItem>
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.username} ({user.email})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


                {selectedUser && (
                    <Card variant="outlined" sx={{ mb: 4, bgcolor: "rgba(255, 0, 0, 0.1)", border: "1px solid red" }}>
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <WarningIcon sx={{ mr: 2, color: "error.main" }} />
                                <Typography variant="h6" color="error">Warning</Typography>
                            </Box>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                You are about to delete the following user:
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                                Username: {selectedUser.username}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 2 }}>
                                Email: {selectedUser.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                This action cannot be undone.
                            </Typography>
                        </CardContent>
                    </Card>
                )}

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/users")}
                        disabled={loading}
                        sx={{ color: "white", borderColor: "white", "&:hover": { borderColor: "#ccc" } }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleOpenConfirm}
                        disabled={loading || !selectedUserId}
                        startIcon={<DeleteIcon />}
                        sx={{ "&:hover": { bgcolor: "error.dark" } }}
                    >
                        Delete User
                    </Button>
                </Box>

                {/* Confirmation Dialog */}
                <Dialog open={confirmOpen} onClose={handleCloseConfirm}>
                    <DialogTitle>Confirm User Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this user? This action <b>cannot</b> be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirm} sx={{ color: "#555" }}>
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="error" autoFocus disabled={loading}>
                            {loading ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    );
};

export default DeleteUser;
