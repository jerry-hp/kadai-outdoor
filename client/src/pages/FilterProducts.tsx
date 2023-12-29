import useFilterProducts from "../hooks/useFilterProducts";
import { product } from "../types";
import logoEiger from "../assets/eiger.png";
import logoArei from "../assets/arei.png";
import logoConsina from "../assets/consina.png";
import { MdArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaTag } from "react-icons/fa6";
function FilterProducts() {
  const { filteredProducts, isLoading, isError, category } = useFilterProducts();
  const plural = category == "clothes" || category === "shoes" ? "" : "s";
  const navigate = useNavigate();
  return (
    <div className=" p-2 lg:p-0 box-border max-w-6xl mx-auto  min-h-screen ">
      <div className="text-[#0B2545] text-[14px] font-bold my-1 sm:my-1 flex items-center ">
        Category
        <MdArrowRight />
        {category}
        {plural}
      </div>
      {/* card */}
      <div className="my-1 sm:my-3 flex justify-between gap-2 flex-wrap">
        {filteredProducts?.map((item: product, index: number) => (
          <div onClick={() => navigate(`/detail-product/${item.id}`)} key={index} className="relative w-[48%] sm:w-[30%] lg:w-[23%] hover:scale-110 cursor-pointer shadow-[0_0_10px_0_rgba(0,0,0,0.2)] rounded-md">
            <img src={item.product_image} alt="" className="w-full rounded-[6px_6px_0_0] h-[200px]" />
            <p className="text-[#0B2545] text-[14px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis box-border p-1 ">{item.product_name}</p>
            <div className="flex justify-between items-center box-border p-1">
              <p className="text-[#0B2545] flex items-center gap-1 text-lg font-semibold">
                <FaTag /> {item.product_price}
              </p>
              <img src={item.product_brand === "CONSINA" ? logoConsina : item.product_brand === "EIGER" ? logoEiger : logoArei} className="w-[28px]" alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterProducts;
