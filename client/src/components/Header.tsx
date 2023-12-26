import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { BsClipboardHeartFill } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import useHeader from "../hooks/useHeader";
import { useState } from "react";
import WishList from "./WishList";

function Header() {
  const { user, showCart, setShowCart, userID, data } = useHeader();
  const [isOpenWishLish, setIsOpenWishLish] = useState(false);
  const [isOpenNotif, setIsOpenNotif] = useState(false);

  return (
    <div className="bg-[#0B2545] p-3">
      {isOpenNotif || isOpenWishLish ? <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#0B2545] opacity-30 z-10" onClick={() => setIsOpenWishLish(false)} /> : null}
      <div className="mx-auto max-w-6xl flex flex-row justify-between items-center shadow-2xl">
        <img src={logo} alt="logo" className="w-40" />
        {userID && (
          <div className="flex flex-row items-center bg-[#EEF4ED] p-1 rounded-lg w-96">
            <input className="bg-transparent outline-none w-full" type="text" placeholder="Search products" />
            <FaSearch className="text-[#0B2545] cursor-pointer" />
          </div>
        )}
        <ul className="flex flex-row items-center gap-4">
          {userID && (
            <Link to={"/"}>
              <li className="text-[#EEF4ED] cursor-pointer hover:text-[#8da9c4]">Home</li>
            </Link>
          )}
          {userID && (
            <Link to={"#"}>
              <li onClick={() => setIsOpenNotif(!isOpenNotif)} className="text-[#EEF4ED] cursor-pointer  relative z-50 ">
                <MdNotifications onMouseEnter={() => setIsOpenWishLish(false)} className="hover:text-[#8da9c4]" />
                <div onMouseLeave={() => setIsOpenNotif(false)} className={`${isOpenNotif ? "block" : "hidden"} absolute z-50 right-[100%] w-[300px] h-[300px] bg-[#8da9c4] text-[#0B2545] rounded-[0_0_8px_8px] box-border `}>
                  <h3 className="p-1 font-semibold shadow-[0_0_10px_0_#0B2545] ">Notification</h3>
                </div>
              </li>
            </Link>
          )}
          {userID && (
            <Link to={"#"}>
              <li onClick={() => setIsOpenWishLish(!isOpenWishLish)} className="text-[#EEF4ED]  cursor-pointer relative z-50 ">
                <BsClipboardHeartFill onMouseEnter={() => setIsOpenNotif(false)} className="hover:text-[#8da9c4]" />
                <div onMouseLeave={() => setIsOpenWishLish(false)} className={`${isOpenWishLish ? "block" : "hidden"} absolute z-50 right-[100%] w-[300px] h-[300px] bg-[#8da9c4] text-[#0B2545] rounded-[8px_0_8px_8px] box-border  `}>
                  <h3 className="p-1 font-semibold shadow-[0_0_10px_0_#0B2545] ">WishList</h3>
                  <div className="p-1">
                    <WishList />
                  </div>
                </div>
              </li>
            </Link>
          )}
          <li>
            {userID && (
              <div className="relative">
                <TiShoppingCart onClick={() => setShowCart(!showCart)} className="text-[#EEF4ED] cursor-pointer text-lg hover:text-[#8da9c4]" />
                {data?.length > 0 && (
                  <div className=" absolute top-[-7px]  right-[-7px] w-[14px] h-[14px] rounded-full bg-[#EEF4ED] text-[#0B2545] flex justify-center items-center ">
                    <p>{data?.length}</p>
                  </div>
                )}
              </div>
            )}
          </li>
          {user.image ? (
            <Link to={"/profile"}>
              <li className="text-[#EEF4ED] cursor-pointer">
                <img src={user.image} alt="foto" className="w-8 h-8 rounded-full hover:border-[1px]" />
              </li>
            </Link>
          ) : (
            userID && (
              <Link to={"/sign-in"}>
                <li className="text-[#EEF4ED] cursor-pointer">Sign in</li>
              </Link>
            )
          )}
        </ul>
      </div>
      {showCart && (
        <div>
          <div onClick={() => setShowCart(false)} className="absolute top-0 left-0 w-full h-full z-40 cursor-pointer bg-[#0B2545] opacity-50"></div>
          <div className="absolute bg-[#8da9c4]  top-0 right-0 w-[350px] z-50">
            <Cart setShowCart={setShowCart} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
