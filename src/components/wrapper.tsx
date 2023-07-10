"use client"

import { styled } from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    max-width: 100%;
    width: 100%;
  }

`
