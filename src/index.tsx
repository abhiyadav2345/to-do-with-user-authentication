import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CssBaseline } from '@mui/material';
import { AppRouterProvider } from './providers/route';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './providers/auth';
import { AppThemeProvider } from './providers/theme';
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <AppThemeProvider>
                <CssBaseline />
                <AppRouterProvider />
            </AppThemeProvider>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
