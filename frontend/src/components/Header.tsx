import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const Header: React.FC = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Speedometer App
                </Typography>
                <Box>
                    <Button
                        component={Link}
                        to="/"
                        color="inherit"
                        sx={{ marginRight: 2 }}
                    >
                        Home
                    </Button>
                    <Button
                        component={Link}
                        to="/history"
                        color="inherit"
                    >
                        History
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
