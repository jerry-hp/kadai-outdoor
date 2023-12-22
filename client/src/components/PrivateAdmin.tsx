import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateAdmin = () => {
  const user = useSelector((state: any) => state.user.user);

  return user.username !== "JERRY HUTARI PUTRA" ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateAdmin;
