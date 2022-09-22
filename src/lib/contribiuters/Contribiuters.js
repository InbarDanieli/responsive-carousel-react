import React, { useEffect, useRef, useState } from 'react'
import ContributerCard from '../contributerCard/ContributerCard'
import style from "./Contribiuters.module.css"

// TODO ensble getting children elements
// TODO add Docs to *every* function

function Contribiuters({ contribiuterNames, maxGapItems, minGapItems, paddingBodyContainer, swipeSensativity }) {
  // think what to do with it / from where to get it
  const ItemWidth = 152

  const bodyContainer = useRef()
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
      setItemsAmount(Math.floor((fullContainerSize - paddingBodyContainer * 2 + minGapItems) / (ItemWidth + minGapItems)));
      setContainerSize(fullContainerSize - (paddingBodyContainer * 2))
      setItemTransalte(0) // try to find solution!

      const fullCardsContainerLength = (contribiuterNames.length) * ItemWidth + maxGapItems * (contribiuterNames.length - 1)
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
  }, [bodyContainer, contribiuterNames, minGapItems, paddingBodyContainer, maxGapItems])

  // TODO add docs about the useEffect, what dose it calculate?
  useEffect(() => {
    setGapItems((containerSize - (itemsAmount * ItemWidth)) / (itemsAmount))
  }, [containerSize, itemsAmount])

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
   * *****************
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
   * *************** what does it caculate
   * slide the items to the right
   * @returns {number}
   */
  function slideToRight() {
    if (itemTransalte - containerSize < - ((contribiuterNames.length) * ItemWidth + gapItems * ((contribiuterNames.length - 1)))) {
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
      return setItemTransalte(- ((Math.floor(contribiuterNames.length / itemsAmount) - (contribiuterNames.length % itemsAmount === 0 ? 1 : 0)) * containerSize))
    }
    setItemTransalte(itemTransalte + containerSize)
  }

  return (
    <div className={style.container}>
      <span className={style.ContribiutersText}>Contributers</span>
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
        </button>
        <div
          className={style.ContributerCardContainer}
          style={{ gap: `${carouselNeeded ? gapItems : maxGapItems}px` }}
        >
          {contribiuterNames.map((name, index) =>
          // make it a parameter of container?
            <ContributerCard
              key={index}
              contributerCardWidth={ItemWidth}
              slide={itemTransalte + (carouselNeeded && (gapItems) / 2)}
              contributerName={name}
            />
          )}
        </div>
        <button
          onClick={slideToRight}
          hidden={!carouselNeeded}
          className={style.buttonSlideRight}>
        </button>
      </div>
    </div>
  )
}

export default Contribiuters

Contribiuters.defaultProps = {
  contribiuterNames: ["test", "test2"],
  maxGapItems: 24,
  minGapItems: 8,
  paddingBodyContainer: 60,
  swipeSensativity: 50
}
