import { HiHome } from "react-icons/hi2";
import { TiShoppingCart } from "react-icons/ti";
import { BsClipboardHeartFill } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHeader from "../hooks/useHeader";
import useWishList from "../hooks/useWishList";
function NavbarBottom() {
  const photo = useSelector((state: any) => state.user.user.image);
  const navigate = useNavigate();
  const { data } = useHeader();
  const { wistList } = useWishList();

  return (
    <div className="sm:hidden p-3 sticky  bottom-0 left-0 right-0 bg-[#0B2545] ">
      <ul className="flex text-[#EEF4ED] justify-between  text-3xl">
        <li onClick={() => navigate("/")} className=" flex justify-center">
          <HiHome />
        </li>
        <li onClick={() => navigate("/cart")} className=" flex justify-center relative">
          <TiShoppingCart />
          {data?.length > 0 && (
            <div className=" absolute top-[-5px]  right-[-5px] w-[16px] h-[16px] rounded-full bg-[#EEF4ED] text-[#0B2545] flex justify-center items-center ">
              <p className="text-[14px]">{data?.length}</p>
            </div>
          )}
        </li>
        <li onClick={() => navigate("/wish-list")} className=" flex justify-center relative">
          <BsClipboardHeartFill />
          {wistList?.length > 0 && (
            <div className=" absolute top-[-5px]  right-[-5px] w-[16px] h-[16px] rounded-full bg-[#EEF4ED] text-[#0B2545] flex justify-center items-center ">
              <p className="text-[14px]">{wistList?.length}</p>
            </div>
          )}
        </li>
        <li className=" flex justify-center">
          <MdNotifications />
        </li>
        <li onClick={() => navigate("/profile")} className=" flex justify-center">
          <img src={photo} className="w-[30px] rounded-[50%]" alt="" />
        </li>
      </ul>
    </div>
  );
}

export default NavbarBottom;
