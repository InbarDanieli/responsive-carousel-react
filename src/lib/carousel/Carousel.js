import React, { useEffect, useRef, useState } from 'react'
import style from "./Carousel.module.css"
import CarouselItem from '../carousel-item/CarouselItem'
import GreaterThan from '../GreaterThan'

// TODO add Docs to *every* function

/**
 * 
 * @param {Object} param0 
 * @param {number} [param0.maxGapItems]
 * @param {number} [param0.minGapItems]
 * @param {number} [param0.paddingBodyContainer]
 * @param {number} [param0.swipeSensativity]
 * @param {string} [param0.title]
 * @param {import('react').CSSProperties} [param0.carouselStyle]
 * @param {import('react').CSSProperties} [param0.titleStyle]
 * @param {JSX.Element | readonly JSX.Element[]} param0.children
 * @returns 
 */
export function Carousel({ maxGapItems, minGapItems, paddingBodyContainer, swipeSensativity, title, children, carouselStyle, titleStyle }) {
  const bodyContainer = useRef()
  const [childWidth, setChildWidth] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [containerSize, setContainerSize] = useState()
  const [itemTransalte, setItemTransalte] = useState(0)
  const [carouselNeeded, setCarouselNeeded] = useState(false)
  const [gapItems, setGapItems] = useState(maxGapItems)
  const [itemsAmount, setItemsAmount] = useState(0)

  // TODO add docs about the useEffect, what dose it calculate?
  useEffect(() => {
    function handleResize() {
      const fullContainerSize = bodyContainer.current.clientWidth
      setItemsAmount(Math.floor((fullContainerSize - paddingBodyContainer * 2 + minGapItems) / (childWidth + minGapItems)));
      setContainerSize(fullContainerSize - (paddingBodyContainer * 2))
      setItemTransalte(0) // try to find solution!

      const fullCardsContainerLength = (React.Children.count(children)) * childWidth + maxGapItems * (React.Children.count(children) - 1)
      if (fullContainerSize > fullCardsContainerLength) {
        return setCarouselNeeded(false)
      }
      setCarouselNeeded(true)
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [bodyContainer, children, minGapItems, paddingBodyContainer, maxGapItems, childWidth])

  // TODO add docs about the useEffect, what dose it calculate?
  useEffect(() => {
    setGapItems((containerSize - (itemsAmount * childWidth)) / (itemsAmount))
  }, [containerSize, itemsAmount, childWidth])

  /**
   * save the location of the firt touch on the screen
   * @param {Event} e
   */
  function onTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX)
  }

  /**
   * update the location where the finger swipes
   * @param {Event} e 
   */
  function onTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  /**
   *
   * @returns 
   */
  function onTouchEnd() {
    if (!touchStart || !touchEnd) {
      return setTouchEnd(null)
    }

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > swipeSensativity
    const isRightSwipe = distance < -swipeSensativity

    if (isLeftSwipe || isRightSwipe) {
      isLeftSwipe ? slideToRight() : slideToLeft();
    }

    setTouchEnd(null)
  }

  /**
   * *************** what does it caculate\
   * slide the items to the right
   * @returns {number}
   */
  function slideToRight() {
    if (itemTransalte - containerSize < - ((React.Children.count(children)) * childWidth + gapItems * ((React.Children.count(children) - 1)))) {
      return setItemTransalte(0)
    }
    setItemTransalte(itemTransalte - containerSize)
  }

  /**
 * slide the items to the left
 * @returns {number}
 */
  function slideToLeft() {
    if (itemTransalte >= 0) {
      return setItemTransalte(- ((Math.floor(React.Children.count(children) / itemsAmount) - (React.Children.count(children) % itemsAmount === 0 ? 1 : 0)) * containerSize))
    }
    setItemTransalte(itemTransalte + containerSize)
  }

  return (
    <div className={style.container} style={carouselStyle}>
      <span className={style.ContribiutersText} style={titleStyle}>{title}</span>
      <div
        className={style.bodyContainer}
        ref={bodyContainer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ padding: `${carouselNeeded ? `0 ${paddingBodyContainer}px` : "0 0"}` }}
      >
        <button
          onClick={slideToLeft}
          hidden={!carouselNeeded}
          className={style.buttonSlideLeft}>
          <GreaterThan />
        </button>
        <div
          className={style.ContributerCardContainer}
          style={{ gap: `${carouselNeeded ? gapItems : maxGapItems}px` }}
        >


          {React.Children.map(children, child => {
            return (<CarouselItem
              onWidthUpdate={(childWidth) => setChildWidth(childWidth)}
              style={{
                transform: `translatex(${itemTransalte + (carouselNeeded && (gapItems) / 2)}px)`,
                transition: "all 0.3s ease",
              }}>
              {child}
            </CarouselItem>)
          })}
        </div>
        <button
          onClick={slideToRight}
          hidden={!carouselNeeded}
          className={style.buttonSlideRight}>
          <GreaterThan />
        </button>
      </div>
    </div>
  )
}

Carousel.defaultProps = {
  maxGapItems: 24,
  minGapItems: 8,
  paddingBodyContainer: 60,
  swipeSensativity: 50
}
