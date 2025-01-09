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
      setTimeout(() => setIsButtonPressed(false), 400);
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
      setTimeout(() => setIsButtonPressed(false), 400);
    }
  };

  const getClassNameFromActiveIndex = (
    index: number,
    arrayLength: number,
    itemsPerSlide: number
  ) => {
    const middleIndex = Math.floor(arrayLength / 2);
    const startIndex = Math.max(0, middleIndex - Math.floor(itemsPerSlide / 2));
    const endIndex = Math.min(
      arrayLength - 1,
      middleIndex + Math.floor(itemsPerSlide / 2)
    );

    const distanceFromMiddle = Math.abs(middleIndex - index);

    const maxScale = 1.2;
    const scale = Math.max(1, maxScale - distanceFromMiddle * 0.05);

    const scaleClass = `scale_${scale.toFixed(2).replace(".", "_")}`;

    if (index < startIndex || index > endIndex) {
      return " outside";
    } else if (index === middleIndex) {
      return " middle";
    } else if (index < middleIndex) {
      return ` grow-left ${scaleClass}`;
    } else {
      return ` grow-right ${scaleClass}`;
    }
  };

  return (
    <div className="alice-carousel-container">
      <div className={`carousel-content${changePosition}`}>
        {visibleItemsArray.map((child, childIndex) => (
          <div
            className={`carousel-item${getClassNameFromActiveIndex(
              childIndex,
              visibleItemsArray.length,
              itemsPerSlide
            )}`}
            key={childIndex}
          >
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

