import React, { useEffect, useRef, useState } from "react";
import style from "./Carousel.module.css";
import CarouselItem from "../carousel-item/CarouselItem";
import GreaterThan from "../GreaterThan";

// TODO add Docs to *every* function

interface carouselInfo {
  maxGapItems: number;
  minGapItems: number;
  paddingBodyContainer: number;
  swipeSensativity: number;
  title: string;
  children: JSX.Element | readonly JSX.Element[];
  carouselStyle: import('react').CSSProperties;
  titleStyle: import('react').CSSProperties;
}

export function Carousel({
  maxGapItems,
  minGapItems,
  paddingBodyContainer,
  swipeSensativity,
  title,
  children,
  carouselStyle,
  titleStyle,
}: carouselInfo): JSX.Element {
  const bodyContainer = useRef<HTMLDivElement>(null);
  const [childWidth, setChildWidth] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>();
  const [touchEnd, setTouchEnd] = useState<number>();
  const [containerSize, setContainerSize] = useState<number>(0);
  const [itemTransalte, setItemTransalte] = useState<number>(0);
  const [carouselNeeded, setCarouselNeeded] = useState<boolean>(false);
  const [gapItems, setGapItems] = useState<number>(maxGapItems);
  const [itemsAmount, setItemsAmount] = useState<number>(0);

  // TODO add docs about the useEffect, what dose it calculate?

  useEffect(() => {
    function handleResize() {
      if (!bodyContainer.current) {
        return
      }
      const fullContainerSize = bodyContainer.current.clientWidth;
      setItemsAmount(
        Math.floor(
          (fullContainerSize - paddingBodyContainer * 2 + minGapItems) /
          (childWidth + minGapItems)
        )
      );
      setContainerSize(fullContainerSize - paddingBodyContainer * 2);
      setItemTransalte(0); // try to find solution!

      const fullCardsContainerLength =
        React.Children.count(children) * childWidth +
        maxGapItems * (React.Children.count(children) - 1);
      if (fullContainerSize > fullCardsContainerLength) {
        return setCarouselNeeded(false);
      }
      setCarouselNeeded(true);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    bodyContainer,
    children,
    minGapItems,
    paddingBodyContainer,
    maxGapItems,
    childWidth,
  ]);

  // TODO add docs about the useEffect, what dose it calculate?
  useEffect(() => {
    setGapItems((containerSize - itemsAmount * childWidth) / itemsAmount);
  }, [containerSize, itemsAmount, childWidth]);

  /**
   * save the location of the firt touch on the screen
   */
  function onTouchStart(e:React.TouchEvent) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  /**
   * update the location where the finger swipes
   */
  function onTouchMove(e:React.TouchEvent) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  /**
   *
   * @returns
   */
  function onTouchEnd() {
    if (!touchStart || !touchEnd) {
      return setTouchEnd(undefined);
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > swipeSensativity;
    const isRightSwipe = distance < -swipeSensativity;

    if (isLeftSwipe || isRightSwipe) {
      isLeftSwipe ? slideToRight() : slideToLeft();
    }

    setTouchEnd(undefined);
  }

  /**
   * *************** what does it caculate\
   * slide the items to the right
   * @returns {number}
   */
  function slideToRight() {
    if (
      itemTransalte - containerSize <
      -(
        React.Children.count(children) * childWidth +
        gapItems * (React.Children.count(children) - 1)
      )
    ) {
      return setItemTransalte(0);
    }
    setItemTransalte(itemTransalte - containerSize);
  }

  /**
   * slide the items to the left
   * @returns {number}
   */
  function slideToLeft() {
    if (itemTransalte >= 0) {
      return setItemTransalte(
        -(
          (Math.floor(React.Children.count(children) / itemsAmount) -
            (React.Children.count(children) % itemsAmount === 0 ? 1 : 0)) *
          containerSize
        )
      );
    }
    setItemTransalte(itemTransalte + containerSize);
  }


  return (
    <div className={style.container} style={carouselStyle}>
      <span className={style.ContribiutersText} style={titleStyle}>
        {title}
      </span>
      <div
        className={style.bodyContainer}
        ref={bodyContainer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          padding: `${carouselNeeded ? `0 ${paddingBodyContainer}px` : "0 0"}`,
        }}
      >
        <button
          onClick={slideToLeft}
          hidden={!carouselNeeded}
          className={style.buttonSlideLeft}
        >
          <GreaterThan />
        </button>
        <div
          className={style.ContributerCardContainer}
          style={{ gap: `${carouselNeeded ? gapItems : maxGapItems}px` }}
        >
          {React.Children.map(children, (child) => {
            return (
              <CarouselItem
                onWidthUpdate={(updateWidth: number) => {
                  childWidth < updateWidth && setChildWidth(updateWidth);
                }}
                style={{
                  transform: `translatex(${itemTransalte + (carouselNeeded ? gapItems / 2 : 0)}px)`,
                  transition: "all 0.3s ease",
                  // minWidth: `${childWidth}px`,
                }}
              >
                {child}
              </CarouselItem>
            );
          })}
        </div>
        <button
          onClick={slideToRight}
          hidden={!carouselNeeded}
          className={style.buttonSlideRight}
        >
          <GreaterThan />
        </button>
      </div>
    </div>
  );
}

Carousel.defaultProps = {
  maxGapItems: 24,
  minGapItems: 8,
  paddingBodyContainer: 60,
  swipeSensativity: 50,
};
