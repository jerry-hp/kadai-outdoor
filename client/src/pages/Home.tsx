// import useHome from "../hooks/useHome";
// import { TiShoppingCart } from "react-icons/ti";
import { RiShirtFill } from "react-icons/ri";
import { PiPantsFill } from "react-icons/pi";
import { GiRunningShoe, GiSlippers, GiCampingTent, GiBackpack } from "react-icons/gi";
import ImageSlider from "../components/ImageSlider";

function Home() {
  return (
    <div className=" box-border max-w-6xl mx-auto  ">
      {/* filter card */}
      <div className=" my-1 sm:my-3 flex flex-wrap gap-1 sm:gap-2">
        <div className="item1 text-[#0B2545] mx-auto w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg">
          <RiShirtFill className="mx-auto text-3xl sm:text-5xl" />
          <p className="font-normal sm:font-bold text-center">Shirt</p>
        </div>
        <div className="item1 text-[#0B2545] mx-auto w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg">
          <PiPantsFill className="mx-auto text-3xl sm:text-5xl" />
          <p className="font-normal sm:font-bold text-center">Pants</p>
        </div>
        <div className="item1 text-[#0B2545] mx-auto w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg">
          <GiRunningShoe className="mx-auto text-3xl sm:text-5xl" />
          <p className="font-normal sm:font-bold text-center">Shoes</p>
        </div>
        <div className="item1 text-[#0B2545] mx-auto w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg">
          <GiSlippers className="mx-auto text-3xl sm:text-5xl" />
          <p className="font-normal sm:font-bold text-center">Slippers</p>
        </div>
        <div className="item1 text-[#0B2545] mx-auto w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg">
          <GiCampingTent className="mx-auto text-3xl sm:text-5xl" />
          <p className="font-normal sm:font-bold text-center">Tents </p>
        </div>
        <div className="item1 text-[#0B2545] mx-auto w-[15%] sm:w-[15%] py-2 sm:py-3 bg-[RGBA(255,255,255,0.1)] rounded-lg">
          <GiBackpack className="mx-auto text-3xl sm:text-5xl" />
          <p className="font-normal sm:font-bold text-center">Carriers</p>
        </div>
      </div>
      {/* imageSlider */}
      <div>
        <ImageSlider />
      </div>
    </div>
  );
}

export default Home;
