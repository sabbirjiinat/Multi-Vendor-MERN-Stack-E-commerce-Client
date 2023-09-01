import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Loader from "../components/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
