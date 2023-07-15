import styled from "styled-components";

export const Grid = styled.section<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(33.33%, 1fr));

  width: calc(100% - ${props => props.$columns} * 1fr);
  gap: 1rem 1rem;


  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
  
  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
  }
`
