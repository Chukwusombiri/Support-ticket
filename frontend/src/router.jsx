import { createBrowserRouter } from "react-router-dom"
import App from "./App";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewTicket from "./pages/NewTicket";
import PrivateRoute from "./accessibility/PrivateRoute";
import GuestRoute from "./accessibility/GuestRoute";
import AllTickets from "./pages/AllTickets";
import SingleTicket from "./pages/SingleTicket";
import EditTicket from "./pages/EditTicket";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/register',
                element: <GuestRoute><Register /></GuestRoute>
            },
            {
                path: '/login',
                element: <GuestRoute><Login /></GuestRoute>
            },
            {
                path: '/tickets',
                element: <PrivateRoute><AllTickets /></PrivateRoute>
            },
            {
                path: '/new-ticket',
                element: <PrivateRoute><NewTicket /></PrivateRoute>
            },
            {
                path: '/tickets/:id',
                element: <PrivateRoute><SingleTicket /></PrivateRoute>
            },
            {
                path: '/tickets/:id/edit',
                element: <PrivateRoute><EditTicket /></PrivateRoute>
            }
        ]
    }
]);

export default router;