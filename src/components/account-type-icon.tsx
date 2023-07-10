import Image from "next/image";
import { Character } from "@/lib/types";
import { FunctionComponent } from "react";
import styled from "styled-components";

export const AccountTypeIconContainer = styled.div`
`;

export const NeonText = styled.span<{ $color: string }>`
  font-size: 10px;
  letter-spacing: 1px;
  color: ${props => props.$color};
`

export const AccountTypeIcon: FunctionComponent<Pick<Character, "gamemode">> = ({ gamemode }) => {
  let icon;
  switch (gamemode) {
      case "pure": icon = <NeonText $color="red">PURE</NeonText>; break;
      case "main": icon = <NeonText $color="lightgray">MAIN</NeonText>; break;
      case "group_ironman": icon = <Image src="/osrs-planner/account-icons/ironman_group.svg" alt="Group ironman" width="15" height="15" />; break;
      case "ironman": icon = <Image src="/osrs-planner/account-icons/ironman_regular.svg" alt="Ironman" width="15" height="15" />; break;
      case "hardcore": icon = <Image src="/osrs-planner/account-icons/ironman_hardcore.svg" alt="Hardcore ironman" width="15" height="15"/>; break;
      case "ultimate": icon = <Image src="/osrs-planner/account-icons/ironman_ultimate.svg" alt="Ultimate ironman" width="15" height="15"/>; break;
      case "hardcore_group_ironman": icon = <Image src="/osrs-planner/account-icons/ironman_group.svg" alt="Hardcore group ironman" width="15" height="15"/>; break;
    }

    return (
      <AccountTypeIconContainer>
        {icon}       
      </AccountTypeIconContainer>
    )
  }
