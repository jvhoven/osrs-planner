"use client"

import styled from "styled-components";

export const Main = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 4rem;
  min-height: 100vh;

  @media only screen and (max-width: 600px) {
    padding: 1rem 0.2rem;
  } 
`
