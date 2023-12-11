import { Navigate, Outlet } from "react-router-dom";

function privateRoute() {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default privateRoute;
