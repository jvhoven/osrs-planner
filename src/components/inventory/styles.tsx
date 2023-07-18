import { Hoverable } from "@/styles";
import styled from "styled-components";

export const InventoryContainer = styled.div`
  width: 100%;
  align-self: flex-end;
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
  grid-auto-columns: minmax(55px, 1fr);
  grid-gap: 1rem;

  div {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    ${Hoverable}
    width: 100%;
    aspect-ratio: 1 / 1;
    border: 1px solid white;
    border-radius: 6px;
    padding: 0.5rem;

    img {
      width: auto;
      height: 75%;
    }
  }
`

export const ArmourSetupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;

  .items {
    width: 250px;
    max-height: 500px;
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
      aspect-ratio: 1 / 1;
      width: 75px;
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
