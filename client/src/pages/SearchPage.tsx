import { FaTag } from "react-icons/fa6";
import useSearch from "../hooks/useSearch";
import logoEiger from "../assets/eiger.png";
import logoArei from "../assets/arei.png";
import logoConsina from "../assets/consina.png";

function SearchPage() {
  const { keyword, dataSearch, isLoading, isError } = useSearch();
  return (
    <div className="min-h-[70vh] max-w-6xl mx-auto text-[#0B2545]">
      <div className="border-b-[1px] border-b-[#0B2545] py-3">
        <p className="text-[12px]">Your result for searching</p>
        <div className="flex flex-row gap-2 items-baseline">
          <h3 className="text-3xl font-bold">{keyword}</h3>
          <p>{dataSearch?.length} Producs</p>
        </div>
      </div>
      <div className="mx-2 lg:mx-0 my-1 lg:my-3 flex justify-between gap-2 flex-wrap">
        {isLoading ? <div className="flex justify-center items-center min-h-screen gap-1">Please Wait...</div> : isError && <div className="flex justify-center items-center min-h-screen gap-1">Error While getting Product</div>}
        {dataSearch?.map((item: any, index: number) => (
          <div key={index} className="relative w-[48%] sm:w-[30%] lg:w-[23%] shadow-[0_0px_5px_0_rgba(0,0,0,0.2)] rounded-[6px] hover:scale-110 cursor-pointer">
            <img src={item.product_image} alt="" />
            <p className="text-[#0B2545] text-[14px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis box-border p-1">{item.product_name}</p>
            <div className="flex justify-between items-center box-border p-1">
              <p className="text-[#0B2545] flex items-center gap-1 text-sm sm:text-lg font-semibold">
                <FaTag />
                {item.product_price}
              </p>
              <img src={item.product_brand === "CONSINA" ? logoConsina : item.product_brand === "EIGER" ? logoEiger : logoArei} className="w-[24px] sm:w-[28px]" alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
