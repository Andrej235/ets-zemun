import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./alice-carousel.scss";

type AliceCarouselProps = {
  children: React.ReactNode;
  itemsPerSlide: number;
};

export default function CustomAliceCarousel({ children }: AliceCarouselProps) {
  const childrenArray = React.Children.toArray(children);

  const items = childrenArray.map((child, index) => (
    <div key={index} className="carousel-item">
      {child}
    </div>
  ));

  const responsive = {
    0: {
      items: 1,
    },
    425: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1440: {
      items: 5,
    },
  };

  return (
    <div className="alice-carousel-container">
      <div className="alice-carousel-wrapper">
        <AliceCarousel
          mouseTracking
          infinite
          responsive={responsive}
          items={items}
        />
      </div>
    </div>
  );
}

