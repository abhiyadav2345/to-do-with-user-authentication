import { Button, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

//import { Outlet } from 'react-router-dom';
import './App.css';
import { Header } from './components/header';
function App() {
    return (
        <Container maxWidth="sm">
            <Header />
            <main>
                <Outlet />
            </main>
            <footer>copy:2022</footer>
        </Container>
    );
}

export default App;
