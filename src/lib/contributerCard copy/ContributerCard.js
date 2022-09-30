import React from 'react'
import styleModule from "./ContributerCard.module.css"
function ContributerCard({ contributerName, style,children }) {
  return (
    <div
    style={style}
      // style={{
      //   transform: `translatex(${slide}px)`,
      //   width: `${contributerCardWidth}px`,
      //   minWidth: `${contributerCardWidth}px`
      // }}
      // // all of this can be component
      className={styleModule.contContainer}
      >
      <span className={styleModule.contributetext}>{contributerName}</span>
      {children}
    </div>
  )
}

export default ContributerCard