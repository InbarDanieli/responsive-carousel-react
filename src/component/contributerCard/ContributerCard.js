import React from 'react'
import style from "./ContributerCard.module.css"
function ContributerCard({ contributerName, slide, contributerCardWidth }) {
  return (
    <div
      style={{
        transform: `translatex(${slide}px)`,
        width: `${contributerCardWidth}px`,
        minWidth: `${contributerCardWidth}px`
      }}
      // all of this can be component
      className={style.contContainer}>
      <span className={style.contributetext}>{contributerName}</span>
    </div>
  )
}

export default ContributerCard