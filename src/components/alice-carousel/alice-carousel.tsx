import React, { useState } from "react";
import "./alice-carousel.scss";

type AliceCarouselProps = {
  children: React.ReactNode;
  itemsPerSlide: number;
};

export default function AliceCarousel({
  children,
}: AliceCarouselProps) {
  const childrenArray = React.Children.toArray(children);

  const [visibleItemsArray, setVisibleItemsArray] = useState(() => {
    if (childrenArray.length > 1) {
      const lastItem = childrenArray[childrenArray.length - 1];
      const firstItem = childrenArray[0]; 
      return [lastItem, ...childrenArray, firstItem];
    } else {
      return childrenArray;
    }
  });

  const goToNext = () => {
  };

  const goToPrev = () => {
  };

  return (
    <div className="alice-carousel-container">
      <div className="carousel-content">
            {visibleItemsArray.map((child, childIndex) => (
              <div className="carousel-item" key={childIndex}>
                {child}
              </div>
            ))}
      </div>

      <button className="arrow-left" onClick={goToPrev}>
        &#60;
      </button>

      <button className="arrow-right" onClick={goToNext}>
        &#62;
      </button>
    </div>
  );
}
