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
  const sections = [];

  for (let i = 0; i < childrenArray.length; i += itemsPerSlide) {
    sections.push(childrenArray.slice(i, i + itemsPerSlide));
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(sections.length - 1);
    }
  };

  return (
    <div className="alice-carousel-container">
      <div className="carousel-content">
        <div
          className="carousel-wrapper"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {sections.map((section, index) => (
            <div className="carousel-section" key={index}>
              {section.map((child, childIndex) => (
                <div className="carousel-item" key={childIndex}>
                  {child}
                </div>
              ))}
            </div>
          ))}
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
