import React, { useEffect, useRef, useState } from 'react'
import ContributerCard from '../contributerCard/ContributerCard'
import style from "./Contribiuters.module.css"

function Contribiuters({ contribiuterNames }) {
  const ItemSize = 152
  const gapBetweenItems = 24
  // the minimum gap between cards
  const MinGapBetweenItems = 8
  const paddingBodyContainer = 60
  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50


  const myref = useRef()
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [contributerContainerSize, setContributerContainerSize] = useState()
  const [iconSlide, setIconSlide] = useState(0)
  const [carouselNeeded, setCarouselNeeded] = useState(false)
  const [gapCards, setGapCards] = useState(gapBetweenItems)
  const [cardsAmount, setCardsAmount] = useState(0)


  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    function handleResize() {
      const fullContainerSize = myref.current.clientWidth
      setCardsAmount(Math.floor((fullContainerSize - paddingBodyContainer * 2 + MinGapBetweenItems) / (ItemSize + MinGapBetweenItems)));
      setContributerContainerSize(fullContainerSize - (paddingBodyContainer * 2))
      setIconSlide(0) // try to find solution!

      const fullCardsContainerLength = (contribiuterNames.length) * ItemSize + gapBetweenItems * (contribiuterNames.length - 1)
      if (fullContainerSize > fullCardsContainerLength) {
        return setCarouselNeeded(false)
      }
      setCarouselNeeded(true)
    }
  }, [myref, contribiuterNames])

  useEffect(() => {
    setGapCards((contributerContainerSize - (cardsAmount * ItemSize)) / (cardsAmount))
  }, [contributerContainerSize, cardsAmount])


  function onTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX)
  }
  function onTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  function onTouchEnd() {
    if (!touchStart || !touchEnd) {
      return setTouchEnd(null)
    }
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe || isRightSwipe) {
      isLeftSwipe ? slideToRight() : slideToLeft();
    }
    setTouchEnd(null)
  }


  function slideToRight() {
    if (iconSlide - contributerContainerSize < - ((contribiuterNames.length) * ItemSize + gapCards * ((contribiuterNames.length - 1)))) {
      return setIconSlide(0)
    }
    setIconSlide(iconSlide - contributerContainerSize)
  }
  function slideToLeft() {
    if (iconSlide >= 0) {
      return setIconSlide(- ((Math.floor(contribiuterNames.length / cardsAmount) - (contribiuterNames.length % cardsAmount === 0 ? 1 : 0)) * contributerContainerSize))
    }
    setIconSlide(iconSlide + contributerContainerSize)
  }


  return (
    <div className={style.container}>
      <span className={style.ContribiutersText}>Contributers</span>
      <div
        className={style.bodyContainer}
        ref={myref}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ padding: `${carouselNeeded ? `0 ${paddingBodyContainer}px` : "0 0"}` }}
      >
        <button
          onClick={slideToLeft}
          style={{ display: `${carouselNeeded ? "" : "none"}` }}
          className={style.buttonSlideLeft}>
        </button>
        <div
          className={style.ContributerCardContainer}
          style={{ gap: `${carouselNeeded ? gapCards : gapBetweenItems}px` }}
        >
          {contribiuterNames.map((name, index) =>
            <ContributerCard
              key={index}
              contributerCardSize={ItemSize}
              slide={iconSlide + (carouselNeeded && (gapCards) / 2)}
              contributerName={name}
            />
          )}
        </div>
        <button
          onClick={slideToRight}
          style={{ display: `${carouselNeeded ? "" : "none"}` }}
          className={style.buttonSlideRight}>
        </button>
      </div>
    </div>
  )
}

export default Contribiuters
