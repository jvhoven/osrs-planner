import { Hoverable } from "@/styles";
import styled from "styled-components";
import { Grid } from "../grid";

export const InventoryContainer = styled.div`
  align-self: flex-end;

  ${Grid} {
    div {
      display: flex;
      justify-content: center;
      align-items: center;

      ${Hoverable}
      width: 100%;
      height: 55px;
      border: 1px solid white;
      border-radius: 6px;

      img {
        width: auto;
        height: 35px;
      }
    }
  }
`

export const ArmourSetupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0.8;

  .items {
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
      ${Hoverable}

      display: flex;
      justify-content: center;
      align-items: center;
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
  }

  .stats {
      margin: 0;

      h4 {
        margin: 0.6rem 0;
          &:first-letter {
              text-transform: uppercase;
            }
        }

      li {
          list-style: none;
          font-size: 14px;
        }
    }
`
