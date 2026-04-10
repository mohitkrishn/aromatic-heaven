import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./features/auth/pages/user/Home.jsx";
import Login from "./features/auth/pages/user/Login.jsx";
import Signup from "./features/auth/pages/user/Signup.jsx";
import AppLayout from "./layout/AppLayout.jsx";
import MyAccount from "./features/auth/pages/user/MyAccount.jsx";
import ProtectedRoute from "./components/user/ProtectedRoute.jsx";
import Services from "./features/auth/pages/user/Services.jsx";
import BookService from "./features/auth/pages/user/BookService.jsx";
import VerifyAccount from "./features/auth/pages/user/VerifyAccount.jsx";
import ResetPassword from "./features/auth/pages/user/ResetPassword.jsx";
import ForgotPassword from "./features/auth/pages/user/ForgotPassword.jsx";
import MyBookings from "./features/auth/pages/user/MyBookings.jsx";

// --- 2. Admin Routes ---
import AdminLayout from "./layout/AdminLayout.jsx";
import AdminDashboard from "./features/auth/pages/admin/AdminDashboard.jsx";
import CustomersList from "./features/auth/pages/admin/CustomersList.jsx";
import ServiceList from "./features/auth/pages/admin/ServiceList.jsx";
import AddService from "./features/auth/pages/admin/AddService.jsx";
import AdminLogin from "./features/auth/pages/admin/AdminLogin.jsx";
import PrivateRoute from "./components/admin/PrivateRoute.jsx";
import EditServices from "./features/auth/pages/admin/EditServices.jsx";
// import TotalBookings from "./features/auth/pages/admin/TotalBookings.jsx";



const AppRoutes = () => {
    // <BrowserRouter>
    //     <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/signup" element={<Signup />} />
    //     </Routes>
    // </BrowserRouter>

    const router = createBrowserRouter([

        // --- 1. User Routes ---
        {
            path: "/",
            element: <AppLayout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/signup",
                    element: <Signup />
                },
                {
                    path: "/my-account",
                    element: <ProtectedRoute>
                        <MyAccount />
                    </ProtectedRoute>
                },
                {
                    path: "/services",
                    element: <Services />
                },
                {
                    path: "/book-service/:serviceId",
                    element: <ProtectedRoute>
                        <BookService />
                    </ProtectedRoute>
                },
                {
                    path: "/forgot-password",
                    element: <ForgotPassword />
                },
                {
                    path: "/reset-password/:token",
                    element: <ResetPassword />
                },
                {
                    path: "/my-bookings",
                    element: <ProtectedRoute>
                        <MyBookings />
                    </ProtectedRoute>
                }
            ]
        },

        // verify account
        {
            path: "/verify-account/:token",
            element: <VerifyAccount />
        },

        // --- 2. Admin Routes ---
        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                {
                    path: "/admin/login",
                    element: <AdminLogin />
                },
                {
                    path: "/admin/dashboard",
                    element: <PrivateRoute >
                        <AdminDashboard />
                    </PrivateRoute>
                },
                {
                    path: "/admin/customers",
                    element: <PrivateRoute>
                        <CustomersList />
                    </PrivateRoute>
                },
                {
                    path: "/admin/services",
                    element: <PrivateRoute>
                        <ServiceList />
                    </PrivateRoute>
                },
                {
                    path: "/admin/add-service",
                    element: <PrivateRoute>
                        <AddService />
                    </PrivateRoute>
                },
                {
                    path: "/admin/edit-service",
                    element: <PrivateRoute>
                        <EditServices />
                    </PrivateRoute>
                },
                // {
                //     path: "/admin/total-bookings",
                //     element: <PrivateRoute>
                //         <TotalBookings />
                //     </PrivateRoute>
                // },
            ]
        }
    ])

    return <RouterProvider router={router} />;
}

export default AppRoutes;