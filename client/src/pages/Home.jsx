import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import { fetchProjects } from "../Util/http.js";
import "../styles/Home.css";

import MainInfo from "../components/info/MainInfo";
import Card from "../UI/Card.jsx";
import SectionTitle from "../UI/SectionTitle.jsx";

export default function Home() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 10000,
  });
  const projects = data?.data || [];

  return (
    <>
      <MainInfo />
      <SectionTitle
        title="Discover my creative projects"
        text="Check out some of my projects by area of expertise"
      />
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {isError && (
        <p style={{ textAlign: "center" }}>
          Error: {error.message || "Something went wrong"}
        </p>
      )}
      {projects && (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="swiper-container"
        >
          {projects.map((project, idx) => (
            <SwiperSlide
              key={project._id}
              style={{
                maxWidth: "80rem",
                maxHeight: "40rem",
                overflow: "hidden",
              }}
            >
              <NavLink to="/project-details" state={project}>
                <Card {...project} order={idx & 1}>
                  {project.title}
                </Card>
              </NavLink>
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      )}
    </>
  );
}
