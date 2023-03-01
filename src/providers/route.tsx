/* eslint-disable prettier/prettier */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { HomePage } from '../components/home-page/index';
import { LoginPage } from '../components/login-page';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,

        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            // eslint-disable-next-line prettier/prettier
        ],
    },
]);

export const AppRouterProvider = () => {
    return <RouterProvider router={router} />;
};
