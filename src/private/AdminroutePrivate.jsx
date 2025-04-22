import { useContext } from "react";
import { AuthContext } from "../context/auth-context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutePrivate = () => {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default AdminRoutePrivate;
