import { useEffect } from 'react';
import { useAuthStore } from '../../stores/admin/auth.admin';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';


const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const admin = useAuthStore(state => state.user);
    const loading = useAuthStore(state => state.loading);
    const checkAuth = useAuthStore(state => state.checkAuth);

    useEffect(() => {
        if (admin === null && !loading) {
            checkAuth();
        }
    }, [admin, loading, checkAuth]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!admin) {
        // If not admin, redirect to user login
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;