/* eslint-disable prettier/prettier */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { HomePage } from '../components/homePage/index';
import { LoginPage } from '../components/login-page';
import { ProtectedRoute } from '../components/protected-route';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,

        children: [
            {
                path: '/',
                element: (
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                ),
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
