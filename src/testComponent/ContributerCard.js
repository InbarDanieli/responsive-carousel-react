import React from 'react'
import styleModule from "./ContributerCard.module.css"
function Testy({ contributerName }) {
  return (
    <div
      className={styleModule.contContainer}
      >
      <span className={styleModule.contributetext}>{contributerName}</span>
    </div>
  )
}

export default Testy