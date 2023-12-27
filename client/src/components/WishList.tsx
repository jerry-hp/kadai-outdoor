import { FaTag } from "react-icons/fa6";
import useWishList from "../hooks/useWishList";
function WishList() {
  const { wistList, handleNavigate } = useWishList();
  return (
    <div className="flex flex-col box-border  gap-[3px]">
      {wistList &&
        wistList.map(
          (item: any, index: number) =>
            item.products[0] && (
              <div onClick={() => handleNavigate(item.products[0].id)} key={index} className="flex flex-row gap-1 h-14 cursor-pointer  hover:text-[#EEF4ED] overflow-hidden box-border p-1 shadow-[0_0px_3px_0_rgba(0,0,0,0.2)]">
                <img className="w-[20%] h-full rounded-[2px]" src={item.products[0].product_image} alt="" />
                <div className="flex flex-col w-[80%] ">
                  <h4 className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{item.products[0].product_name}</h4>
                  <p className="flex gap-1 items-center">
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

export default WishList;
