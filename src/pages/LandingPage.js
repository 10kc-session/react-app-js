import React from 'react';
import { Box, Typography, Button, Container, Paper, Card, CardContent, CardActions, useMediaQuery } from '@mui/material';
import { People as PeopleIcon, PersonAdd as PersonAddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const featureCards = [
    {
        title: 'Manage Users',
        description: 'Easily add, update, or remove users with full control and visibility.',
        icon: <PeopleIcon sx={{ fontSize: 60, color: '#bbb' }} />,
        path: '/users',
        buttonText: 'Get Started'
    },
    {
        title: 'Create Users',
        description: 'Register new users with essential details through a streamlined form.',
        icon: <PersonAddIcon sx={{ fontSize: 60, color: '#999' }} />,
        path: '/users/add',
        buttonText: 'Add User'
    },
    {
        title: 'Modify Users',
        description: 'Update user information seamlessly with our intuitive interface.',
        icon: <EditIcon sx={{ fontSize: 60, color: '#777' }} />,
        path: '/users/edit/0',
        buttonText: 'Edit User'
    },
    {
        title: 'Remove Users',
        description: 'Effortlessly delete users when no longer needed with proper confirmation.',
        icon: <DeleteIcon sx={{ fontSize: 60, color: '#555' }} />,
        path: '/users/delete',
        buttonText: 'Delete User'
    }
];

const LandingPage = () => {
    const isMobile = useMediaQuery('(max-width: 768px)'); // Detect mobile screens

    return (
        <Box sx={{ bgcolor: '#111', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header Section */}
            <Paper sx={{
                background: 'linear-gradient(135deg, #222 0%, #444 100%)',
                color: 'white',
                mb: 4,
                py: 6,
                textAlign: 'center',
                borderRadius: 0,
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)'
            }}>
                <Container maxWidth="md">
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, fontSize: '2.5rem' }}>
                        Streamline Your User Management
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.8, maxWidth: '700px', mx: 'auto' }}>
                        Manage your users effortlessly
                    </Typography>
                    <Button variant="contained" component={Link} to="/users" sx={{
                        mt: 3,
                        bgcolor: '#666',
                        color: 'white',
                        fontWeight: 600,
                        '&:hover': { bgcolor: '#888', transform: 'translateY(-2px)' },
                        transition: 'all 0.3s ease'
                    }}>
                        Get Started
                    </Button>
                </Container>
            </Paper>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
                <Typography variant="h4" textAlign="center" sx={{ fontWeight: 600, mb: 4, color: '#ddd' }}>
                    Key Features
                </Typography>

                {/* Responsive Cards */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',  // Stack on mobile, row on larger screens
                        gap: 3,
                        overflowX: isMobile ? 'visible' : 'auto', // Allow scrolling only on large screens
                        justifyContent: isMobile ? 'center' : 'flex-start',
                        px: 2,
                        '&::-webkit-scrollbar': { display: 'none' } // Hide scrollbar
                    }}
                >
                    {featureCards.map((card, index) => (
                        <Card key={index} sx={{
                            minWidth: isMobile ? '100%' : 250, // Full width on mobile
                            maxWidth: isMobile ? '100%' : 280,
                            display: 'flex',
                            flexDirection: 'column',
                            bgcolor: '#222',
                            color: 'white',
                            borderRadius: 3,
                            boxShadow: '0 8px 16px rgba(255, 255, 255, 0.1)',
                            '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(255, 255, 255, 0.2)' },
                            transition: 'all 0.3s ease'
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4, pb: 2 }}>
                                {card.icon}
                            </Box>
                            <CardContent sx={{
                                textAlign: 'center',
                                flexGrow: 1,
                                px: 3,
                                pb: 2,
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" sx={{
                                    opacity: 0.8,
                                    lineHeight: 1.6,
                                    mb: 2
                                }}>
                                    {card.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                justifyContent: 'center',
                                pb: 3,
                                pt: 1,
                                mt: 'auto'
                            }}>
                                <Button
                                    component={Link}
                                    to={card.path}
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#444',
                                        color: 'white',
                                        px: 3,
                                        fontWeight: 500,
                                        '&:hover': { bgcolor: '#666', transform: 'scale(1.05)' },
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {card.buttonText}
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Container>

            {/* Footer Section */}
            <Box component="footer" sx={{ bgcolor: '#111', py: 3, mt: 'auto', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="body2" sx={{ color: '#bbb' }}>
                    © {new Date().getFullYear()} User Management Portal. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;
