import useDetailProduct from "../hooks/useDetailProduct";
import logoEiger from "../assets/eiger.png";
import logoArei from "../assets/arei.png";
import logoConsina from "../assets/consina.png";
import { CgSearchLoading } from "react-icons/cg";
import { TbError404Off } from "react-icons/tb";

function DetailProduct() {
  const { productById, isLoading, isError } = useDetailProduct();
  console.log(productById);
  return (
    <div className="max-w-6xl mx-auto my-2 box-border flex gap-2">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen gap-1">
          <p className="text-[#0B2545] font-bold text-5xl">Loading...</p>
          <CgSearchLoading className="text-[#0B2545] font-bold text-5xl" />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center min-h-screen gap-1">
          <p className="text-[#0B2545] font-bold text-5xl  ">error</p>
          <TbError404Off className="text-[#0B2545] font-bold text-5xl" />
        </div>
      ) : (
        productById.length === 1 && (
          <div className="w-full flex gap-2 box-border">
            <img className="w-1/2 rounded-lg" src={productById[0]?.product_image} alt="" />
            <div>
              <img src={productById[0]?.product_brand === "CONSINA" ? logoConsina : productById[0]?.product_brand === "EIGER" ? logoEiger : logoArei} className="w-[50px] mx-auto" alt="" />
              <h3 className="text-[#0B2545] text-xl font-bold my-1 sm:my-2">{productById[0]?.product_name}</h3>
              <h5 className="text-[#0B2545] text-lg font-bold my-1 sm:my-2">{productById[0]?.product_price}</h5>
              <p className="text-[#0B2545]">{productById[0]?.product_description}</p>
              <div className="my-3 border-[1px] border-[#0B2545] p-1 rounded-lg w-1/2 mx-auto">
                <p className="text-[#0B2545] ">SIZE</p>
                <div className="flex gap-1 text-[#0B2545]">
                  <button className="border-[1px] border-[#0B2545] w-10 h-10 rounded-lg font-bold cursor-pointer">S</button>
                  <button className="border-[1px] border-[#0B2545] w-10 h-10 rounded-lg font-bold cursor-pointer">M</button>
                  <button className="border-[1px] border-[#0B2545] w-10 h-10 rounded-lg font-bold cursor-pointer">L</button>
                  <button className="border-[1px] border-[#0B2545] w-10 h-10 rounded-lg font-bold cursor-pointer">XL</button>
                </div>
                <p className="text-[#0B2545] ">TOTAL</p>
                <div className="border-[1px] text-[#0B2545] text-xl border-[#0B2545] p-1 rounded-lg w-max flex gap-3 items-center">
                  <button className=" text-xl font-bold cursor-pointer">-</button>1<button className=" text-xl font-bold cursor-pointer">+</button>
                </div>
                <button className="my-3 bg-[#0B2545] text-[#EEF4ED] w-full h-10 rounded-lg font-bold cursor-pointer">ADD TO CART</button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default DetailProduct;
