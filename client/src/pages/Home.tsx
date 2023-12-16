import useHome from "../hooks/useHome";
// import { TiShoppingCart } from "react-icons/ti";
import { RiShirtFill } from "react-icons/ri";
import { PiPantsFill } from "react-icons/pi";
import { GiRunningShoe, GiSlippers, GiCampingTent, GiBackpack } from "react-icons/gi";
import { CgSearchLoading } from "react-icons/cg";
import { TbError404Off } from "react-icons/tb";
import ImageSlider from "../components/ImageSlider";
import logoEiger from "../assets/eiger.png";
import logoArei from "../assets/arei.png";
import logoConsina from "../assets/consina.png";
import { product } from "../types";

function Home() {
  const { isMen, setIsMen, products, isLoading, isError, goToProductDetail } = useHome();

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
          <div className=" my-1 sm:my-3 flex flex-wrap justify-between sm:gap-2">
            <div onClick={() => goToProductDetail("clothes")} className="item1 text-[#0B2545] w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg cursor-pointer">
              <RiShirtFill className="mx-auto text-3xl sm:text-5xl" />
              <p className="font-normal sm:font-bold text-center">Clothes</p>
            </div>
            <div onClick={() => goToProductDetail("pant")} className="item1 text-[#0B2545] w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg cursor-pointer">
              <PiPantsFill className="mx-auto text-3xl sm:text-5xl" />
              <p className="font-normal sm:font-bold text-center">Pants</p>
            </div>
            <div onClick={() => goToProductDetail("shoes")} className="item1 text-[#0B2545] w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg cursor-pointer">
              <GiRunningShoe className="mx-auto text-3xl sm:text-5xl" />
              <p className="font-normal sm:font-bold text-center">Shoes</p>
            </div>
            <div onClick={() => goToProductDetail("slippers")} className="item1 text-[#0B2545] w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg cursor-pointer">
              <GiSlippers className="mx-auto text-3xl sm:text-5xl" />
              <p className="font-normal sm:font-bold text-center">Slippers</p>
            </div>
            <div onClick={() => goToProductDetail("tent")} className="item1 text-[#0B2545] w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg cursor-pointer">
              <GiCampingTent className="mx-auto text-3xl sm:text-5xl" />
              <p className="font-normal sm:font-bold text-center">Tents </p>
            </div>
            <div onClick={() => goToProductDetail("carrier")} className="item1 text-[#0B2545] w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg cursor-pointer">
              <GiBackpack className="mx-auto text-3xl sm:text-5xl" />
              <p className="font-normal sm:font-bold text-center">Carriers</p>
            </div>
          </div>
          {/* imageSlider */}
          <div>
            <ImageSlider />
          </div>
          {/* all products  title*/}
          <div className="text-[#0B2545] text-xl font-bold my-1 sm:my-2">ALL PRODUCTS</div>
          {/* all products buttons */}
          <button onClick={() => setIsMen(true)} style={{ borderBottomColor: isMen ? "#0B2545" : "", borderBottomWidth: isMen ? "2px" : "", color: isMen ? "#0B2545" : "#0B2545" }} className={` font-bold px-4`}>
            Men
          </button>
          <button onClick={() => setIsMen(false)} style={{ borderBottomColor: !isMen ? "#0B2545" : "", borderBottomWidth: !isMen ? "2px" : "", color: !isMen ? "#0B2545" : "#0B2545" }} className=" font-bold px-4 ">
            Women
          </button>
          {/* all products card */}
          <div className="my-1 sm:my-3 flex justify-between gap-2 flex-wrap">
            {products &&
              products.map((item: product, index: number) => (
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
      )}
    </div>
  );
}

export default Home;
