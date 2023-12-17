import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import { useState } from "react";

function Header() {
  const user = useSelector((state: any) => state.user.user);
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="bg-[#0B2545] p-3">
      <div className="mx-auto max-w-6xl flex flex-row justify-between items-center shadow-2xl">
        <img src={logo} alt="logo" className="w-40" />
        <div className="flex flex-row items-center bg-[#EEF4ED] p-1 rounded-lg w-96">
          <input className="bg-transparent outline-none w-full" type="text" placeholder="Search products" />
          <FaSearch className="text-[#0B2545] cursor-pointer" />
        </div>
        <ul className="flex flex-row items-center gap-4">
          <Link to={"/"}>
            <li className="text-[#EEF4ED] cursor-pointer">Home</li>
          </Link>
          <li>
            <TiShoppingCart onClick={() => setShowCart(!showCart)} className="text-[#EEF4ED] cursor-pointer text-lg" />
          </li>
          {user.image ? (
            <Link to={"/profile"}>
              <li className="text-[#EEF4ED] cursor-pointer">
                <img src={user.image} alt="foto" className="w-8 h-8 rounded-full hover:border-[1px]" />
              </li>
            </Link>
          ) : (
            <Link to={"/sign-in"}>
              <li className="text-[#EEF4ED] cursor-pointer">Sign in</li>
            </Link>
          )}
        </ul>
      </div>
      {showCart && (
        <div>
          <div onClick={() => setShowCart(false)} className="absolute top-0 left-0 w-full h-full z-40 cursor-pointer bg-black/40"></div>
          <div className="absolute bg-[#8da9c4]  top-0 right-0 w-[350px] z-50">
            <Cart setShowCart={setShowCart} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
