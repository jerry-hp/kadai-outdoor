import useHome from "../hooks/useHome";
import { TiShoppingCart } from "react-icons/ti";

function Home() {
  const { products, isLoading, isError } = useHome();

  console.log("yoy", products);
  return (
    <div className=" box-border max-w-6xl mx-auto ">
      <div className="w-[90%] mx-auto  my-2 shadow-[0_0_5px_0_#0B2545] rounded-[18px] box-border p-2 flex gap-2 flex-wrap">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : isError ? (
          <div className="text-center">Error</div>
        ) : (
          products &&
          products?.map((item: any, index: number) => (
            <div key={index} className="flex flex-col gap-1 sm:gap-1 rounded-[10px] shadow-[0_0_5px_0_#0B2545] w-[19%] box-border p-1  text-[#0B2545] text-sm mx-auto">
              <img src={item.product_image} alt="" className="rounded-md w-full h-[150px]" />
              <div className="flex justify-between">
                <h1 className=" font-bold">{item.product_name}</h1>
                <p className=" font-bold bg-[#0B2545] text-[#EEF4ED] w-max px-1 skew-x-[-12deg] mr-1">{item.product_brand}</p>
              </div>
              <h1 className=" font-bold">{item.product_price}</h1>
              <p className="">{item.product_description}</p>
              <TiShoppingCart className="text-[#0B2545] cursor-pointer text-lg" onClick={() => alert("belum")} />
              {/* nanti buat product category */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
