import { css } from "styled-components";

export const Hoverable = css`
  transition-duration: 0.15s;
  transition-property: border-color, background, color, transform, box-shadow;
  transition-timing-function: ease;

  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: #000;

    > span, > a {
      background-color: #fff;
      color: #000;
    }
  }
`
