import { FaArrowLeft } from "react-icons/fa6";
import { FaTag } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useWishList from "../hooks/useWishList";
import { BsThreeDotsVertical } from "react-icons/bs";
function WishListPage() {
  const navigate = useNavigate();
  const { wistList, handleNavigate } = useWishList();
  return (
    <div className="min-h-screen text-[#0B2545]   block sm:hidden">
      <div className="flex justify-between items-center box-border p-3 font-bold bg-[#eef4ed] text-[#0B2545] text-xl">
        <div className="flex gap-2  items-center">
          <FaArrowLeft onClick={() => navigate("/")} className="cursor-pointer" />
          <p>Wish list</p>
        </div>
        <BsThreeDotsVertical />
      </div>
      {wistList &&
        wistList.map(
          (item: any, index: number) =>
            item.products[0] && (
              <div onClick={() => handleNavigate(item.products[0].id)} key={index} className="flex flex-row gap-1 h-22 cursor-pointer  hover:text-[#EEF4ED] overflow-hidden box-border p-2  bg-[#eef4ed] hover:bg-[#0B2545] mb-1">
                <img className="w-[20%] h-full rounded-[5px]" src={item.products[0].product_image} alt="" />
                <div className="flex flex-col w-[80%] justify-evenly  ">
                  <h4 className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">{item.products[0].product_name}</h4>
                  <p className="flex gap-1 items-center  font-bold">
                    <FaTag />
                    {item.products[0].product_price}
                  </p>
                </div>
              </div>
            )
        )}
    </div>
  );
}

export default WishListPage;
