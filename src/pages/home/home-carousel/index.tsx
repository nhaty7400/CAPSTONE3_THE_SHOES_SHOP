import React, { useRef } from "react";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import css from "./home-carousel.module.scss";
import { useAppSelector } from "src/redux/config-store";
import CarouselPage from "./carousel-page";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const HomeCarousel: React.FC = () => {
  const onChange = (currentSlide: number) => {

  };

  /**
   * để truy cập được những methos của component export ra thì ta dùng useRef
   */
  const refCarousel = useRef<CarouselRef>(null);

  const handleNext = () => {
    refCarousel.current?.next();
  };
  const handlePrevious = () => {
    refCarousel.current?.prev();
  };

  const list = useAppSelector((state) => state.productReducer.listProduct);

  return (
    // đối với những props có giá trị là true thì chỉ cần truyền tên không cần truyền cụ thể giá trị true
    <div>
      <Carousel ref={refCarousel} afterChange={onChange} autoplay>
        {list.map((shoe) => {
          return (
            <div className={css["carousel-page"]}>
              <div style={contentStyle}>
                <CarouselPage shoe={shoe} />
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
