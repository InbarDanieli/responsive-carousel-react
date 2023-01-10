import React, { useEffect, useRef } from 'react'

interface itemInfo{
  style:React.CSSProperties,
  children: JSX.Element,
   onWidthUpdate: (arg:number)=>void
}

function CarouselItem({ style, children, onWidthUpdate }:itemInfo) {

  const childrenRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if(childrenRef.current !== null){
      onWidthUpdate(childrenRef.current.clientWidth)
    }
  }, [childrenRef, onWidthUpdate])
  return (
    <div ref={childrenRef}
      style={style}
    >
      {children}
    </div>
  )
}

export default CarouselItem