import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "@/lib/utils";

const ProtectedRoute = () => {
  const isAuthenticated = isTokenValid();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
