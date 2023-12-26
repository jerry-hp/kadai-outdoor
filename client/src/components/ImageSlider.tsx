import tes from "../assets/ImageSlider/1.jpg";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { useState } from "react";
function ImageSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [transition, setTransition] = useState(false);
  const [isToRight, setIsToRight] = useState(true);
  const slides = [
    tes,
    "https://thumbor.sirclocdn.com/unsafe/1280x354/filters:format(webp)/magento.eigeradventure.com/media/weltpixel/owlcarouselslider/images/m/a/main_banner_1800x750_20_.jpg",
    "https://thumbor.sirclocdn.com/unsafe/1280x354/filters:format(webp)/magento.eigeradventure.com/media/weltpixel/owlcarouselslider/images/m/a/main_banner_1280x354_10.jpg",
    "https://areioutdoorgear.co.id/wp-content/uploads/2023/10/Website-Product-CarrierArtboard-1_result-1536x768.webp",
    "https://areioutdoorgear.co.id/wp-content/uploads/2023/02/Banner-Website-Arei.jpg",
  ];

  const nextSlide = () => {
    setTransition(true);
    setIsToRight(true);
    const isLastSlide = activeSlide === slides.length - 1;
    const slide = isLastSlide ? 0 : activeSlide + 1;
    setActiveSlide(slide);
  };
  const prevSlide = () => {
    setTransition(true);
    setIsToRight(false);
    const isFirstSlide = activeSlide === 0;
    const slide = isFirstSlide ? slides.length - 1 : activeSlide - 1;
    setActiveSlide(slide);
  };

  const goToSlide = (slideIndex: number) => {
    setActiveSlide(slideIndex);
  };
  return (
    <div className="h-[350px] flex rounded-lg relative">
      <div className="w-full h-full overflow-hidden">
        <img
          src={slides[activeSlide]}
          alt="tes"
          className={`w-full h-full rounded-lg  ${transition ? `transition-all ${isToRight ? "translate-x-full" : "-translate-x-full"} ease-in-out duration-500` : ""}`}
          onTransitionEnd={() => setTransition(false)}
        />
      </div>
      <div className="absolute top-1/2 left-3 text-[#0B2545] bg-white/[0.2] backdrop-blur-sm rounded-lg p-1 translate-y-[-50%] cursor-pointer">
        <MdOutlineArrowBackIosNew size={30} onClick={prevSlide} />
      </div>
      <div className="absolute top-1/2 right-3 text-[#0B2545] bg-white/[0.2] backdrop-blur-sm rounded-lg p-1 translate-y-[-50%] cursor-pointer">
        <MdOutlineArrowForwardIos size={30} onClick={nextSlide} />
      </div>
      <div className="absolute bottom-1 left-1/2 flex items-center text-white  p-1 translate-x-[-50%] cursor-pointer">
        {slides.map((_, index: number) => (
          <GoDotFill key={index} size={activeSlide === index ? 30 : 20} onClick={() => goToSlide(index)} />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
