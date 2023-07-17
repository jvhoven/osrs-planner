import { styled } from "styled-components";

export const Loader = styled.span`
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;

  &:before, &:after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &:before {
    left: -10px;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: #e3e3e3;
    color: #9880ff;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 0s;
  }

  &:after {
    left: 10px;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: #e3e3e3;
    color: #9880ff;
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dot-flashing {
    0% {
      background-color: #fff;
    }
    50%, 100% {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`
