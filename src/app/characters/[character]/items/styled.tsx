import { Grid } from "@/components/grid"
import { Hoverable } from "@/styles"
import styled from "styled-components"

export const InventoryPageContainer = styled.div`
  .wrapper {
    display: flex; 
    flex-direction: row;
    justify-content: space-between;
  }
`

export const InventoryContainer = styled.div`
  flex: 0.5;

  ${Grid} {
     div {
      display: flex;
      justify-content: center;
      align-items: center;

        ${Hoverable}
        width: 100%;
        height: 75px;
        border: 1px solid white;
        border-radius: 6px;

        img {
          width: auto;
            height: 50px;
          }
      }
  }
`

export const ArmourSetupContainer = styled.div`
  width: 250px;
  display: grid;
  grid-template-areas:
    'head head head'
    'cape neck ammo'
    'weapon body shield'
    'legs legs legs'
    'hands feet ring';

  gap: 1rem;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
      ${Hoverable}
      width: 75px;
      height: 75px;
      border: 1px solid white;
      border-radius: 6px;

      img {
          object-fit: contain;
          width: auto;
          height: 50px;
          margin-left: 7px;
        }
    }

  .head, .legs {
    align-self: center;
    justify-self: center;
  }

  .weapon {
grid-column: col 1 / span 1;
  grid-row: row 4;
    }
`
