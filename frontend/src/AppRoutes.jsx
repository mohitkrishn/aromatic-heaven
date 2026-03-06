import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./features/auth/pages/Signup";
import Login from "./features/auth/pages/Login";
import Home from "./features/auth/pages/Home";
import AppLayout from "./layout/AppLayout";
import MyAccount from "./features/auth/pages/MyAccount";
import ProtectedRoute from "./components/ProtectedRoute";
import Services from "./features/auth/pages/Services";
import BookService from "./features/auth/pages/BookService";

const AppRoutes = () => {
    // <BrowserRouter>
    //     <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/signup" element={<Signup />} />
    //     </Routes>
    // </BrowserRouter>

    const router = createBrowserRouter([
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
                }
            ]
        }
    ])

    return <RouterProvider router={router} />;
}

export default AppRoutes;