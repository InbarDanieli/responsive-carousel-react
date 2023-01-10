 import styled from "styled-components"
 
 export const Container = styled.div`
  box-sizing: border-box;
  padding: 24px;
  overflow: hidden;
  width: 100%;
  height: max-content;
  box-shadow: 2px 2px 5px lightgrey;
`

export const ContribiutersText = styled.span `
  color: #39475D;
  font-weight: 800;
  font-size: 32px;
  line-height: 42px;
`

export const BodyContainer = styled.div`
  position: relative;
`

export const ContributerCardContainer = styled.div `
  display: flex;
  overflow-x: clip;
`

export const ButtonSlideLeft = styled.button `
  left: 0;
  transform: rotate(180deg);
  position: absolute;
  background: none;
  border: none;
  cursor: pointer;
  top: 50%;
  font-size: 24px;
  fill: #39475D;
`

export const ButtonSlideRight = styled.button `
  right: 0;
  position: absolute;
  background: none;
  border: none;
  cursor: pointer;
  top: 50%;
  font-size: 24px;
  fill: #39475D;
`
