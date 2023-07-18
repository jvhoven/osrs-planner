import { InventoryContainer } from "@/components/inventory/styles";
import styled from "styled-components";

export const LoadoutsPageContainer = styled.div`
  .wrapper {
    display: flex; 
    flex-direction: row;
    justify-content: space-between;

    
  @media only screen and (max-width: 600px) {
    flex-direction: column;

    ${InventoryContainer} {
        display: none;
      }


    .items {
      margin-right: 1rem;
        > div {
            width: 60px;
          }
      }
  } 
  }
`
