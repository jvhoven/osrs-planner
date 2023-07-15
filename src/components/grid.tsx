import styled from "styled-components";

export const Grid = styled.section<{ $columns: number, $sizes?: string}>`
  --columnDefinition: ${props => props.$sizes ? props.$sizes : `repeat(auto-fit, minmax(calc(100% / ${props.$columns}), 1fr))`};

  display: grid;
  grid-template-columns: var(--columnDefinition);
  gap: 1rem 1rem;


  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
  
  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
  }
`
