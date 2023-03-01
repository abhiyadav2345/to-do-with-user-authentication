import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, IconButton } from '@mui/material';
import { MoonIcon, SunIcon } from '../icons';

const Header = () => {
    return (
        <header>
            <Grid container justifyContent={'right'}>
                <Link to={'/login'}>
                    <Button variant="contained">Login</Button>
                </Link>
            </Grid>
            <Grid container justifyContent={'space-between'} mt={10} mb={2}>
                <h2>TODO</h2>
                <IconButton color="primary" aria-label="theme switcher">
                    <MoonIcon />
                    <SunIcon />
                </IconButton>
            </Grid>
        </header>
    );
};

export default Header;
