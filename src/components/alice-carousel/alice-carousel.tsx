import React, { useState } from "react";
import "./alice-carousel.scss";

type AliceCarouselProps = {
  children: React.ReactNode;
  itemsPerSlide: number;
};

export default function AliceCarousel({
  children
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
  const [nextIndex, setNextIndex] = useState(1);
  const [prevIndex, setPrevIndex] = useState(childrenArray.length-2);

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
    setVisibleItemsArray((prevArray) => {
      const updatedArray = [
        childrenArray[prevIndex],
        ...prevArray.slice(0, -1),
      ];
      prevIndex === 0 ? setPrevIndex(childrenArray.length-1) : setPrevIndex(prevIndex-1);
      return updatedArray;})
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
