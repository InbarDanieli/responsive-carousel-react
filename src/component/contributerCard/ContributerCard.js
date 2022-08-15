import React from 'react'
import style from "./ContributerCard.module.css"
function ContributerCard({ contributerName, slide, contributerCardSize }) {
  return (
    <div
      style={{
        transform: `translatex(${slide}px)`,
        width: `${contributerCardSize}px`,
        minWidth: `${contributerCardSize}px`
      }}
      className={style.contContainer}>
      <span className={style.contributetext}>{contributerName}</span>
    </div>
  )
}

export default ContributerCard