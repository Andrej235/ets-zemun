import React, { useState } from "react";
import "./alice-carousel.scss";

type AliceCarouselProps = {
  children: React.ReactNode;
  itemsPerSlide: number;
};

export default function AliceCarousel({
  children,
  itemsPerSlide,
}: AliceCarouselProps) {
  const childrenArray = React.Children.toArray(children);

  const [startIndex, setStartIndex] = useState(0);

  const totalItems = childrenArray.length;

  const goToNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const goToPrev = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + totalItems) % totalItems
    );
  };

  const visibleItems = Array.from({ length: itemsPerSlide }, (_, i) => {
    const index = (startIndex + i) % totalItems;
    return childrenArray[index];
  });

  return (
    <div className="alice-carousel-container">
      <div className="carousel-content">
        <div className="carousel-wrapper">
          <div className="carousel-section">
            {visibleItems.map((child, childIndex) => (
              <div className="carousel-item" key={childIndex}>
                {child}
              </div>
            ))}
          </div>
        </div>
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
