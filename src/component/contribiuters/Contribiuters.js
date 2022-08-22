import React, { useEffect, useRef, useState } from 'react'
import ContributerCard from '../contributerCard/ContributerCard'
import style from "./Contribiuters.module.css"

function Contribiuters({ contribiuterNames }) {
  const cardSize = 152
  const gapBetweenCards = 24
  const MinGapBetweenCards = 8
  const paddingBodyContainer = 60




  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
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





  const myref = useRef()
  const [contributerContainerSize, setContributerContainerSize] = useState()
  const [iconSlide, setIconSlide] = useState(0)
  const [carouselNeeded, setCarouselNeeded] = useState(false)
  const [gapCards, setGapCards] = useState(gapBetweenCards)
  const [cardsAmount, setCardsAmount] = useState(0)

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    function handleResize() {
      const fullContainerSize = myref.current.clientWidth
      setCardsAmount(Math.floor((fullContainerSize - paddingBodyContainer * 2 + MinGapBetweenCards) / (cardSize + MinGapBetweenCards)));
      setContributerContainerSize(fullContainerSize - (paddingBodyContainer * 2))
      setIconSlide(0) // try to find solution!

      const fullCardsContainerLength = (contribiuterNames.length) * cardSize + gapBetweenCards * (contribiuterNames.length - 1)
      if (fullContainerSize > fullCardsContainerLength) {
        return setCarouselNeeded(false)
      }
      setCarouselNeeded(true)
    }
  }, [myref, contribiuterNames])

  useEffect(() => {
    setGapCards((contributerContainerSize - (cardsAmount * cardSize)) / (cardsAmount))
  }, [contributerContainerSize, cardsAmount])


  function slideToRight() {
    if (iconSlide - contributerContainerSize < - ((contribiuterNames.length) * cardSize + gapCards * ((contribiuterNames.length - 1)))) {
      return setIconSlide(0)
    }
    setIconSlide(iconSlide - contributerContainerSize)
  }
  function slideToLeft() {
    if (iconSlide >= 0) {
      return setIconSlide(- (Math.floor(contribiuterNames.length / cardsAmount) * contributerContainerSize))
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
          style={{ gap: `${carouselNeeded ? gapCards : gapBetweenCards}px` }}
        >
          {contribiuterNames.map((name, index) =>
            <ContributerCard
              key={index}
              contributerCardSize={cardSize}
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