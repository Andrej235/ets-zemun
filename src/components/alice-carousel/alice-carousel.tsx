import React, { useState } from "react";
import "./alice-carousel.scss";

type AliceCarouselProps = {
  children: React.ReactNode;
  itemsPerSlide: number;
};

export default function AliceCarousel({ children }: AliceCarouselProps) {
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
  const [prevIndex, setPrevIndex] = useState(childrenArray.length - 2);
  const [changePosition, setChangePosition] = useState<" prev" | " next" | "">(
    ""
  );
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);

  const goToNext = () => {
    if (!isButtonPressed) {
      setChangePosition(" next");
      setVisibleItemsArray((prevArray) => {
        const updatedArray = [...prevArray.slice(1), childrenArray[nextIndex]];
        nextIndex !== childrenArray.length - 1
          ? setNextIndex(nextIndex + 1)
          : setNextIndex(0);
        return updatedArray;
      });
      setIsButtonPressed(true);

      setTimeout(() => {
        setChangePosition("");
      }, 1);
      setTimeout(() => setIsButtonPressed(false), 500)
    }
  };

  const goToPrev = () => {
    if (!isButtonPressed) {
      setVisibleItemsArray((prevArray) => {
        const updatedArray = [
          childrenArray[prevIndex],
          ...prevArray.slice(0, -1),
        ];
        prevIndex === 0
          ? setPrevIndex(childrenArray.length - 1)
          : setPrevIndex(prevIndex - 1);
        return updatedArray;
      });
      setIsButtonPressed(true);

      setChangePosition(" prev");
      setTimeout(() => {
        setChangePosition("");
      }, 1);
      setTimeout(() => setIsButtonPressed(false), 500)
    }
  };

  return (
    <div className="alice-carousel-container">
      <div className={`carousel-content${changePosition}`}>
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

