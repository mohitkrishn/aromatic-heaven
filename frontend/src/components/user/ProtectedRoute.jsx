import { Navigate, useLocation } from "react-router-dom";
import { useLoginStore } from "../../stores/auth.store";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const user = useLoginStore(state => state.user);
  const loading = useLoginStore(state => state.loading);


  // Show nothing or a spinner while loading
  if (loading) {
    return null; // Or a spinner component
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children;
};

export default ProtectedRoute;