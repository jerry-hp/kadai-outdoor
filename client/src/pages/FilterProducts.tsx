import useFilterProducts from "../hooks/useFilterProducts";
import { product } from "../types";
import logoEiger from "../assets/eiger.png";
import logoArei from "../assets/arei.png";
import logoConsina from "../assets/consina.png";
import { MdArrowRight } from "react-icons/md";
function FilterProducts() {
  const { filteredProducts, isLoading, isError, category } = useFilterProducts();
  return (
    <div className=" box-border max-w-6xl mx-auto  min-h-screen ">
      <div className="text-[#0B2545] text-xl font-bold my-1 sm:my-2 flex items-center ">
        Category
        <MdArrowRight />
        {category}
        {category !== "clothes" ? "s" : ""}
      </div>
      {/* card */}
      <div className="my-1 sm:my-3 flex justify-between gap-2 flex-wrap">
        {filteredProducts?.map((item: product, index: number) => (
          <div key={index} className="relative w-[23%] hover:scale-110 cursor-pointer">
            <img src={item.product_image} alt="" className="w-full rounded-[8px_8px_0_0] h-[200px]" />
            <p className="text-[#0B2545] text-[14px] font-semibold">{item.product_name}</p>
            <div className="flex justify-between items-center">
              <p className="text-[#0B2545] text-lg font-semibold">{item.product_price}</p>
              <img src={item.product_brand === "CONSINA" ? logoConsina : item.product_brand === "EIGER" ? logoEiger : logoArei} className="w-[28px]" alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterProducts;
