import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Header = () => {
    return (
        <header>
            <div>
                <ul>
                    <li>
                        <Link to={'/login'}>
                            <Button variant="contained">Login</Button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'}>
                            <Button variant="outlined">Home</Button>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
