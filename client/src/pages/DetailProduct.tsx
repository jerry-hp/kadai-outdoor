import useDetailProduct from "../hooks/useDetailProduct";
import logoEiger from "../assets/eiger.png";
import logoArei from "../assets/arei.png";
import logoConsina from "../assets/consina.png";
import { CgSearchLoading } from "react-icons/cg";
import { TbError404Off } from "react-icons/tb";
import { FaTag } from "react-icons/fa6";
import { BsClipboardHeartFill } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";

function DetailProduct() {
  const { productById, isLoading, isError, setDataCart, dataCart, total, setTotal, addToCart, IsAvailable, sizes } = useDetailProduct();
  console.log(productById[0]);

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
            <img className="w-3/5 rounded-lg" src={productById[0]?.product_image} alt="" />
            <div className="w-2/5 p-2 ">
              <img src={productById[0]?.product_brand === "CONSINA" ? logoConsina : productById[0]?.product_brand === "EIGER" ? logoEiger : logoArei} className="w-[50px] mx-auto" alt="" />
              <h3 className="text-[#0B2545] text-xl font-bold my-1 sm:my-2">{productById[0]?.product_name}</h3>
              <h5 className="text-[#0B2545] text-lg font-bold my-1 sm:my-2 flex items-center gap-1">
                <FaTag />
                {productById[0]?.product_price}
              </h5>
              <div className="my-3 border-y-[1px] border-[#0B2545] p-1 w-full mx-auto">
                <p className="text-[#0B2545] ">SIZE : {dataCart.size}</p>
                <div className="flex gap-1 text-[#0B2545]">
                  {sizes.map((item: string, index: number) => (
                    <button
                      onClick={() => setDataCart({ ...dataCart, size: item })}
                      disabled={!IsAvailable[index]}
                      style={{ backgroundColor: item === dataCart.size ? "#0B2545" : "", color: item === dataCart.size ? "#EEF4ED" : "" }}
                      key={index}
                      className="border-[1px] disabled:opacity-30 disabled:cursor-not-allowed border-[#0B2545] w-16 h-10 rounded-lg font-bold cursor-pointer"
                    >
                      {IsAvailable[index] ? item : <span className="line-through">{item}</span>}
                    </button>
                  ))}
                </div>
                <p className="text-[#0B2545] mt-2 ">TOTAL: {total}</p>
                <div className="border-[1px] text-[#0B2545] text-xl border-[#0B2545] p-1 rounded-lg   w-20 h-10 flex gap-3 justify-around items-center">
                  <button onClick={() => setTotal(total - 1)} disabled={total <= 1} className=" text-xl font-bold cursor-pointer disabled:opacity-20">
                    -
                  </button>
                  {total}
                  <button onClick={() => setTotal(total + 1)} className=" text-xl font-bold cursor-pointer">
                    +
                  </button>
                </div>
                <div className="flex gap-2 my-3 ">
                  <button
                    onClick={addToCart}
                    disabled={dataCart.size == ""}
                    className="w-4/5 flex items-center justify-center bg-[#0B2545] disabled:cursor-not-allowed disabled:opacity-50 text-[#EEF4ED] text-2xl   h-10 rounded-lg font-bold cursor-pointer"
                  >
                    <TiShoppingCart />
                  </button>
                  <button disabled={dataCart.size == ""} className="w-1/5 flex items-center justify-center bg-[#0B2545] disabled:cursor-not-allowed disabled:opacity-50 text-[#EEF4ED]  h-10 rounded-lg font-bold cursor-pointer">
                    <BsClipboardHeartFill />
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-[#0B2545] font-bold my-1">Description</h4>
                <p className="text-[#0B2545]">{productById[0]?.product_description}</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default DetailProduct;
