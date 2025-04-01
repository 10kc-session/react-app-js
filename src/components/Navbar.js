import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {
    Menu as MenuIcon,
    People as PeopleIcon,
    PersonAdd as PersonAddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Home as HomeIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();

    const navItems = [
        { text: "Home", icon: <HomeIcon />, path: "/" },
        { text: "List Users", icon: <PeopleIcon />, path: "/users" },
        { text: "Add User", icon: <PersonAddIcon />, path: "/users/add" },
        { text: "Edit User", icon: <EditIcon />, path: "/users/edit/0" },
        { text: "Delete User", icon: <DeleteIcon />, path: "/users/delete" },
    ];

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const isActive = (path) => location.pathname === path;

    const drawerList = (
        <Box
            sx={{
                width: 260,
                bgcolor: "#181818",
                color: "#f5f5f5",
                fontFamily: "Inter, sans-serif",
                height: "100vh",
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <List>
                {navItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        component={Link}
                        to={item.path}
                        selected={isActive(item.path)}
                        sx={{
                            "&.Mui-selected": {
                                backgroundColor: "#333",
                                "&:hover": {
                                    backgroundColor: "#444",
                                },
                            },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        <ListItemIcon sx={{ color: "#f5f5f5" }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} sx={{ color: "#f5f5f5" }} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="sticky" sx={{ bgcolor: "#181818", fontFamily: "Inter, sans-serif" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, color: "#f5f5f5" }}>
                        User Management
                    </Typography>

                    {isMobile ? (
                        <IconButton
                            aria-label="open drawer"
                            edge="end"
                            onClick={toggleDrawer(true)}
                            sx={{ ml: "auto", color: "#f5f5f5" }}
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        navItems.map((item) => (
                            <Button
                                key={item.text}
                                component={Link}
                                to={item.path}
                                startIcon={item.icon}
                                sx={{
                                    mx: 1.5,
                                    textTransform: "none",
                                    fontWeight: isActive(item.path) ? "bold" : "normal",
                                    borderBottom: isActive(item.path) ? "2px solid #f5f5f5" : "none",
                                    color: "#f5f5f5",
                                    transition: "color 0.3s ease",
                                    "&:hover": {
                                        color: "#bbb",
                                    },
                                }}
                            >
                                {item.text}
                            </Button>
                        ))
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawerList}
            </Drawer>
        </>
    );
};

export default Navbar;
