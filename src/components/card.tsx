import { Hoverable } from "@/styles";
import { FC, ReactNode } from "react";
import styled from "styled-components";

export const CardContainer = styled.div`
  ${Hoverable}

  width: 100%;
  border: 1px solid white;
  box-sizing: border-box;
  border-radius: 6px;

  .image {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 0;
      width: 100%;
      height: 175px;
      border-bottom: 1px solid white;
    }

  img {
    width: auto;
    height: 100%;
  }

  .content {
    padding: 1rem;
  }

  &:hover {
    .image {
        border-bottom: 1px solid black;
      }

      border: 1px solid black;
  }
`

type Props = {
  title: string;
  image: ReactNode;
}

export const Card: FC<Props> = ({ image, title }) => {
  return (
    <CardContainer>
      {image && (
        <div className="image">
          {image}
        </div>
      )}
      <div className="content">
        {title}
      </div>
    </CardContainer>
  )
}
