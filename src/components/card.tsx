import { Hoverable } from "@/styles";
import { FC, ReactNode } from "react";
import styled from "styled-components";

export const CardContainer = styled.div`
  ${Hoverable}

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border: 1px solid white;
  box-sizing: border-box;
  border-radius: 6px;

  .image {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 0;
    }
  
  h3 {
      margin-bottom: 1rem;
    }

  .content {
    padding: 1rem;
  }

  .footer {
      flex: 1;
display: flex;
justify-content: flex-end;
align-items: center;
flex-direction: column;
    }
`

type CardProps = {
  title?: string
  image?: ReactNode;
  children?: ReactNode
  footer?: ReactNode
  onClick?: () => void
}

export const Card: FC<CardProps> = ({
  title,
  image,
  children,
  footer,
  onClick,
}) => {
  return (
    <CardContainer onClick={onClick}>
      {title && (<h3 className="title">{title}</h3>)}
      {image && (
        <div className="image">
          {image}
        </div>
      )}
      {children && (
        <div className="content">
          {children}
        </div>
      )}

      {footer && (
        <div className="footer">{footer}</div>
      )}
    </CardContainer >
  )
}



