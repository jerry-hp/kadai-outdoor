import React from "react";
import { IoClose } from "react-icons/io5";
import { ImBin2 } from "react-icons/im";
function Cart({ setShowCart }: { setShowCart: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className="min-h-screen  box-border p-2">
      <div className=" bg-[#0B2545] absolute top-0  left-0 right-0 py-2 ">
        <IoClose onClick={() => setShowCart(false)} className="text-[#EEF4ED] cursor-pointer text-3xl absolute right-2" />
        <h1 className="text-[#EEF4ED] text-center font-bold text-xl">My Cart</h1>
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <div className=" relative text-[#0B2545] flex gap-1  border-[1px] rounded-[10px] border-[#0B2545] box-border p-1">
          <img className="w-[100px] rounded-md" src="https://down-id.img.susercontent.com/file/id-11134207-7r98r-lp22ji54u393e2" alt="" />
          <div className="flex flex-col ">
            <h1 className="font-bold text-sm"> PRODUCT NAME</h1>
            <h1 className="font-bold mt-auto text-xs">Size :</h1>
            <h1 className="font-bold text-xs">Quantity :</h1>
            <h1 className="font-bold text-xs">Total Price :</h1>
          </div>
          <div className="flex items-baseline absolute bottom-1 right-1">
            <ImBin2 className="ml-auto mt-auto text-[#0B2545] w-10 text-2xl cursor-pointer p-1 border-[1px] border-[#0B2545] rounded-md" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="text-[#EEF4ED] w-[90%] bg-[#0B2545] py-2 rounded-lg font-bold mt-10  absolute bottom-1 ">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
