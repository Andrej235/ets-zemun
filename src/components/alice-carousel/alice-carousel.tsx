import React, { useState } from "react";
import "./alice-carousel.scss";

type AliceCarouselProps = {
  children: React.ReactNode;
  itemsPerSlide: number;
};

export default function AliceCarousel({
}: AliceCarouselProps) {
  const childrenArray = [0, 1, 2];

  const [visibleItemsArray, setVisibleItemsArray] = useState(() => {
    if (childrenArray.length > 1) {
      const lastItem = childrenArray[childrenArray.length - 1];
      const firstItem = childrenArray[0]; 
      return [lastItem, ...childrenArray, firstItem];
    } else {
      return childrenArray;
    }
  });
  const [nextIndex, setNextIndex] = useState(1);

  const goToNext = () => {
    setVisibleItemsArray((prevArray) => {
      const updatedArray = [
        ...prevArray.slice(1),
        childrenArray[nextIndex],
      ];
      nextIndex!==childrenArray.length-1 ? setNextIndex(nextIndex+1):setNextIndex(0);
      return updatedArray;})
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
