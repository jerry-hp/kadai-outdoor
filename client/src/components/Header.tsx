import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-[#0B2545] p-3">
      <div className="mx-auto max-w-6xl flex flex-row justify-between items-center shadow-2xl">
        <img src={logo} alt="logo" className="w-40" />
        <div className="flex flex-row items-center bg-[#EEF4ED] p-1 rounded-lg w-96">
          <input className="bg-transparent outline-none w-full" type="text" placeholder="Search products" />
          <FaSearch className="text-[#0B2545] cursor-pointer" />
        </div>
        <ul className="flex flex-row items-center gap-4">
          <li>
            <TiShoppingCart className="text-[#EEF4ED] cursor-pointer text-lg" />
          </li>
          <Link to={"/sign-in"}>
            <li className="text-[#EEF4ED] cursor-pointer">Sign in</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
