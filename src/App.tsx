import { Button } from '@mui/material';
import { Outlet } from 'react-router-dom';
//import { Outlet } from 'react-router-dom';
import './App.css';
import { Header } from './components/header';
function App() {
    return (
        <div className="container">
            <Header />
            <main>
                <Outlet />
            </main>
            <footer>copy:2022</footer>
        </div>
    );
}

export default App;
