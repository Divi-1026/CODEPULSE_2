import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import slide1 from "../assets/RUN.png";
import slide2 from "../assets/CODERUN.png";
import slide3 from "../assets/Linear.jpg.png";
import slide4 from "../assets/CODERUN.png";

const slides = [slide1, slide2, slide3, slide4];

const HomeSlider = () => {
  return (
    <div className="w-full py-10 bg-gray-100 ml-2 mr- rounded-xl">
      <h2 className="text-4xl font-bold text-center text-purple-800 pb-3 mb-8">
        Visuals of Our Site
      </h2>

      <div className="w-full max-w-5xl px-2 mx-auto">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="w-full"
        >
          {slides.map((src, i) => (
            <SwiperSlide
              key={i}
              className="w-80 h-60 md:w-96 md:h-72 flex justify-center items-center"
            >
              <img
                src={src}
                alt={`Slide ${i}`}
                className="rounded-2xl shadow-lg object-cover w-full h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;

