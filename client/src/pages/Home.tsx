import useHome from "../hooks/useHome";
// import { TiShoppingCart } from "react-icons/ti";
import { RiShirtFill } from "react-icons/ri";
import { PiPantsFill } from "react-icons/pi";
import { GiRunningShoe, GiSlippers, GiCampingTent, GiBackpack } from "react-icons/gi";
import { FaTag } from "react-icons/fa6";
import { CgSearchLoading } from "react-icons/cg";
import { TbError404Off } from "react-icons/tb";
import ImageSlider from "../components/ImageSlider";
import logoEiger from "../assets/eiger.png";
import logoArei from "../assets/arei.png";
import logoConsina from "../assets/consina.png";
import { product } from "../types";

function Home() {
  const { isMen, setIsMen, products, isLoading, isError, goToProductFilter, goToProductDetail } = useHome();

  return (
    <div className=" box-border max-w-6xl mx-auto  min-h-screen ">
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
        <div>
          {/* filter card */}
          <div className="m-2 sm:m-2 lg:m-0  sm:my-3 flex flex-wrap justify-between sm:gap-2">
            <div onClick={() => goToProductFilter("clothes")} className=" text-[#0B2545] w-[15%] h-max sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg cursor-pointer">
              <RiShirtFill className="mx-auto text-3xl sm:text-5xl" />
              <p className="hidden sm:block font-normal sm:font-bold text-center">Clothes</p>
            </div>
            <div onClick={() => goToProductFilter("pant")} className=" text-[#0B2545] w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg cursor-pointer">
              <PiPantsFill className="mx-auto text-3xl sm:text-5xl" />
              <p className="hidden sm:block font-normal sm:font-bold text-center">Pants</p>
            </div>
            <div onClick={() => goToProductFilter("shoes")} className=" text-[#0B2545] w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg cursor-pointer">
              <GiRunningShoe className="mx-auto text-3xl sm:text-5xl" />
              <p className="hidden sm:block font-normal sm:font-bold text-center">Shoes</p>
            </div>
            <div onClick={() => goToProductFilter("slipper")} className=" text-[#0B2545] w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg cursor-pointer">
              <GiSlippers className="mx-auto text-3xl sm:text-5xl" />
              <p className="hidden sm:block font-normal sm:font-bold text-center">Slippers</p>
            </div>
            <div onClick={() => goToProductFilter("tent")} className=" text-[#0B2545] w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg cursor-pointer">
              <GiCampingTent className="mx-auto text-3xl sm:text-5xl" />
              <p className="hidden sm:block font-normal sm:font-bold text-center">Tents </p>
            </div>
            <div onClick={() => goToProductFilter("carrier")} className=" text-[#0B2545] w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg cursor-pointer">
              <GiBackpack className="mx-auto text-3xl sm:text-5xl" />
              <p className="hidden sm:block font-normal sm:font-bold text-center">Carriers</p>
            </div>
          </div>
          {/* imageSlider */}
          <div className="m-2 lg:m-0">
            <ImageSlider />
          </div>
          {/* all products  title*/}
          <div className="m-2 lg:m-0 text-[#0B2545] text:lg sm:text-xl font-bold my-1 sm:my-2">ALL PRODUCTS</div>
          {/* all products buttons */}
          <button onClick={() => setIsMen(true)} style={{ borderBottomColor: isMen ? "#0B2545" : "", borderBottomWidth: isMen ? "2px" : "", color: isMen ? "#0B2545" : "#0B2545" }} className={`mx-2 lg:m-0 font-bold px-4`}>
            Men
          </button>
          <button onClick={() => setIsMen(false)} style={{ borderBottomColor: !isMen ? "#0B2545" : "", borderBottomWidth: !isMen ? "2px" : "", color: !isMen ? "#0B2545" : "#0B2545" }} className=" font-bold px-4 ">
            Women
          </button>
          {/* all products card */}
          <div className="mx-2 lg:mx-0 my-1 lg:my-3 flex justify-between gap-2 flex-wrap">
            {products &&
              products.map((item: product, index: number) => (
                <div key={index} onClick={() => goToProductDetail(String(item.id))} className="relative w-[48%] sm:w-[30%] lg:w-[23%] shadow-[0_0px_5px_0_rgba(0,0,0,0.2)] rounded-[6px] hover:scale-110 cursor-pointer">
                  <img src={item.product_image} alt="" className="w-full rounded-[6px_6px_0_0] h-[200px]" />
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
      )}
    </div>
  );
}

export default Home;
