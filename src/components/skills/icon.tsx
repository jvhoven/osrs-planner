import { SkillName } from "@/lib/types";
import Image from "next/image";
import styled from "styled-components";

export const SkillIconContainer = styled.div``

export const SkillIcon = ({ name }: { name: SkillName }) => {
  return (
    <SkillIconContainer>
      <Image src={`/skills/${name}.svg`} alt={name} width='25' height='25' />
    </SkillIconContainer>
  )
}

