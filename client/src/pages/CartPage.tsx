import { FaArrowLeft } from "react-icons/fa6";
import { BsClipboardHeartFill } from "react-icons/bs";
import { ImBin2 } from "react-icons/im";
import { FaTag } from "react-icons/fa6";
import { MdAddchart } from "react-icons/md";
import { RxWidth } from "react-icons/rx";
import useCart from "./../hooks/useCart";
import { useNavigate } from "react-router-dom";
function Cart() {
  const navigate = useNavigate();
  const { dataCart, isLoading, isError, userID, deleteCart, totalPriceCart, createTransaction } = useCart();
  console.log(dataCart);
  return (
    <div className="min-h-screen  block sm:hidden">
      <div className="flex justify-between items-center box-border p-3 font-bold bg-[#eef4ed] text-[#0B2545] text-xl">
        <div className="flex gap-2  items-center">
          <FaArrowLeft onClick={() => navigate("/")} className="cursor-pointer" />
          <p>My cart</p>
        </div>
        <BsClipboardHeartFill />
      </div>
      {dataCart &&
        dataCart?.map((item: any, index: number) => (
          <div key={index} className="flex gap-1  bg-[#eef4ed] text-[#0B2545] box-border p-3 mb-1">
            <img className="w-[20%] rounded-md" src={item.product_id[0]?.product_image} alt="" />
            <div className="flex flex-col justify-between w-full  overflow-hidden">
              <p className="font-bold whitespace-nowrap overflow-hidden text-ellipsis ">{item.product_id[0]?.product_name}</p>
              <div className="flex  flex-row  w-full justify-between items-center text-[13px] font-bold">
                <div>
                  <p>Price amount</p>
                  <p className="flex gap-1 items-center">
                    <FaTag />
                    {item.total_price}
                  </p>
                </div>
                <div>
                  <p>Quantity</p>
                  <p className="flex gap-1 items-center">
                    <MdAddchart /> {item.quantity}
                  </p>
                </div>
                <div>
                  <p>Size</p>
                  <p className="flex gap-1 items-center">
                    <RxWidth /> {item.size}
                  </p>
                </div>
                <div className="flex  text-medium  border border-[#0B2545] rounded-md w-7 h-7  q justify-center items-center">
                  <ImBin2 onClick={() => deleteCart(item.id)} />
                </div>
              </div>
            </div>
          </div>
        ))}

      <div className="flex justify-between absolute bottom-0 w-full box-border px-3 py-2 bg-[#eef4ed] text-lg text-[#0B2545] font-bold ">
        <div className="flex items-center gap-2">
          <p>Total =</p>
          <p className="flex gap-1 items-center">{totalPriceCart}</p>
        </div>
        <div className="bg-[#0B2545] text-[#eef4ed] px-4 py-2  rounded-md">
          <button onClick={createTransaction}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
