import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaWpforms, FaHome } from "react-icons/fa";
import { FaMoneyBillTransfer, FaUsers } from "react-icons/fa6";
import { MdNotifications } from "react-icons/md";
function Sidebar() {
  return (
    <div className="bg-[#0B2545] text-white w-1/5 p-4">
      <img src={logo} alt="logo" className="w-40 mb-5" />
      <ul className="flex flex-col gap-2">
        <li>
          <Link to="/" className="flex items-center gap-2">
            <FaHome />
            Home
          </Link>
        </li>
        <li>
          <Link to="/admin" className="flex items-center gap-2">
            <FaWpforms />
            Product
          </Link>
        </li>
        <li>
          <Link to="/transactions" className="flex items-center gap-2">
            <FaMoneyBillTransfer />
            Transaction
          </Link>
        </li>
        <li>
          <Link to="#" className="flex items-center gap-2">
            <FaUsers />
            Users
          </Link>
        </li>
        <li>
          <Link to="#" className="flex items-center gap-2">
            <MdNotifications />
            Notification
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
