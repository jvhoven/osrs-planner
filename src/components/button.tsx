import { Hoverable } from "@/styles";
import styled from "styled-components";

export const Button = styled.button`
  ${Hoverable}

  align-self: center;
  background-color: #000;
  border: 0;
  border-radius: 5px;
  border: 1px solid white;

  > span, > a {
    color: #fff;
    display: block;
    padding: 1rem;
  }
`;

