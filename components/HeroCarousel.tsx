"use client";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { homeImagesSlider } from "@/constant/Constant";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroCarousel = () => (
  <div className="ss:pt-16">
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ type: "bullets", clickable: true }}
      navigation
      loop
      spaceBetween={50}
      slidesPerView={1}
      centeredSlides={true}
      scrollbar={{ draggable: true }}
      className="h-screen ss:h-[650px] w-screen"
    >
      {homeImagesSlider.map((img) => (
        <SwiperSlide key={img.Category}>
          <Link
            href={`/products/?search&category=${img.Category}`}
            className="relative h-full w-full block overflow-hidden"
          >
            <Image
              fill
              src={img.img_lg}
              alt={img.Category}
              className="h-full w-full object-cover max-ss:hidden"
            />
            <Image
              fill
              src={img.img_sm}
              alt={img.Category}
              className="h-full w-full ss:hidden"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default HeroCarousel;
