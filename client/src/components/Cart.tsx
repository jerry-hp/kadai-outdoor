import React from "react";
import { IoClose } from "react-icons/io5";
import { ImBin2 } from "react-icons/im";
import useCart from "../hooks/useCart";
import { CgSearchLoading } from "react-icons/cg";
import { TbError404Off } from "react-icons/tb";
function Cart({ setShowCart }: { setShowCart: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { dataCart, isLoading, isError, userID, deleteCart, totalPriceCart, createTransaction } = useCart();
  return (
    <div className="min-h-screen  box-border p-2">
      <div className=" bg-[#0B2545] absolute top-0  left-0 right-0 py-2 ">
        <IoClose onClick={() => setShowCart(false)} className="text-[#EEF4ED] cursor-pointer text-3xl absolute right-2" />
        <h1 className="text-[#EEF4ED] text-center font-bold text-xl">My Cart</h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen gap-1">
          <p className="text-[#0B2545] font-bold text-5xl">Loading...</p>
          <CgSearchLoading className="text-[#0B2545] font-bold text-5xl" />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center min-h-screen gap-1">
          <p className="text-[#0B2545] font-bold text-5xl">error</p>
          <TbError404Off className="text-[#0B2545] font-bold text-5xl" />
        </div>
      ) : !userID ? (
        ""
      ) : dataCart.length === 0 ? (
        <div className="flex justify-center items-center min-h-screen gap-1">
          <h3 className="text-[#0B2545] font-bold text-1xl">Cart Kosong</h3>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-10 overflow-auto max-h-[80vh]">
          {dataCart?.map((item: any, index: number) => (
            <div key={index} className=" relative text-[#0B2545] flex gap-1  border-[1px] rounded-[10px] border-[#0B2545] box-border p-1">
              <img className="w-[100px] rounded-md" src={item.product_id[0]?.product_image} alt="" />
              <div className="flex flex-col ">
                <h1 className="font-bold text-sm">{item.product_id[0]?.product_name}</h1>
                <h1 className="font-bold mt-auto text-xs">Size : {item.size}</h1>
                <h1 className="font-bold text-xs">Quantity : {item.quantity}</h1>
                <h1 className="font-bold text-xs">Total Price : {item.total_price}</h1>
              </div>
              <div className="flex items-baseline absolute bottom-1 right-1">
                <ImBin2 onClick={() => deleteCart(item.id)} className="ml-auto mt-auto text-[#0B2545] w-10 text-2xl cursor-pointer p-1 border-[1px] border-[#0B2545] rounded-md" />
              </div>
            </div>
          ))}
        </div>
      )}
      {dataCart.length !== 0 && (
        <div className="flex flex-col  mx-auto justify-center w-[96%]  absolute bottom-1">
          <h2 className="text-[#0B2545] font-bold text-base">Cart Total : {totalPriceCart}</h2>
          <button onClick={createTransaction} className="text-[#EEF4ED] w-[100%] bg-[#0B2545] py-2 rounded-lg font-bold mt-2  ">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
