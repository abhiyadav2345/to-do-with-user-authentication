import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material';
import { MoonIcon, SunIcon } from '../icons';
import { AppThemeContext } from '../../providers/theme';
import { AuthContext } from '../../providers/auth';
import { Theme } from '../../theme';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './header.css';
import { Appbar } from '../user-profile/appbar';

const Header = () => {
    const { currentTheme, setTheme } = useContext(AppThemeContext);
    const { user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const headerText = location.pathname === '/login' ? 'LOGIN' : 'TODO';

    const setCurrentTheme = () => {
        const newTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        setTheme && setTheme(newTheme);
    };

    const logout = () => {
        signOut && signOut();
        navigate('/login');
    };

    return (
        <header>
            <Grid container justifyContent="right">
                {user ? (
                    <>
                        <Grid container>
                            <Appbar />
                        </Grid>

                        <Button sx={{ color: 'white' }} onClick={logout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <Link to="/login">
                        <Button sx={{ color: 'white' }}>Login</Button>
                    </Link>
                )}
            </Grid>
            <Grid container justifyContent={'space-between'} mt={5} mb={3}>
                <h1 className="app-header">{headerText}</h1>
                <IconButton
                    color="primary"
                    aria-label="theme switcher"
                    onClick={setCurrentTheme}
                >
                    {currentTheme === Theme.DARK ? <SunIcon /> : <MoonIcon />}
                </IconButton>
            </Grid>
        </header>
    );
};

export default Header;
