import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: "800px", mx: "auto", mt: 3, p: 1 }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: "#222" }}>
                        <TableCell sx={{ color: "white", fontWeight: 600 }}>ID</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: 600 }}>Username</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: 600 }}>Email</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: 600, textAlign: "center" }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{
                                "&:nth-of-type(odd)": { bgcolor: "#333" },
                                "&:hover": { bgcolor: "#444" },
                            }}
                        >
                            <TableCell sx={{ color: "white" }}>{user.id}</TableCell>
                            <TableCell sx={{ color: "white" }}>{user.username}</TableCell>
                            <TableCell sx={{ color: "white" }}>{user.email}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <IconButton onClick={() => onEdit(user)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(user.id)} color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
