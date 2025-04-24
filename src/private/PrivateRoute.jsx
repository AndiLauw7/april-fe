import { useContext } from "react";
import { AuthContext } from "../context/auth-context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteAnggota = () => {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "anggota") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default PrivateRouteAnggota;
