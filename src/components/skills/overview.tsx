import { SkillName, Skills, Stats } from '@/lib/types'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Skill } from './skill'

const Skills = styled.section`
  width: 100%;
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: 33.3% calc(33.3% - 15px) calc(33.3% - 15px);
  grid-template-rows: auto;
  row-gap: 15px;
  column-gap: 15px;

  > .attack,
  > .strength,
  > .defence,
  > .ranged,
  > .prayer,
  > .magic,
  > .runecraft,
  > .construction {
    grid-column: 1;
  }

  > .hitpoints,
  > .agility,
  > .herblore,
  > .thieving,
  > .crafting,
  > .fletching,
  > .slayer,
  > .hunter {
    grid-column: 2;
  }

  > .mining,
  > .smithing,
  > .fishing,
  > .cooking,
  > .firemaking,
  > .woodcutting,
  > .farming {
    grid-column: 3;
  }
`

type Props = {
  skills: Stats['skills']
}

export const SkillsOverview: FunctionComponent<Props> = ({ skills }) => {
  return (
    <Skills>
      {Object.entries(sort(skills)).map(([name, { rank, level, xp }]) => (
        <Skill key={name} name={name as SkillName} level={level} />
      ))}
    </Skills>
  )
}

/*
 * Makes sure the skill view is exactly the same as the one in-game
 */
const sort = (skills: Skills) => {
  const order: SkillName[] = [
    'attack',
    'strength',
    'defence',
    'ranged',
    'prayer',
    'magic',
    'runecraft',
    'construction',
    'hitpoints',
    'agility',
    'herblore',
    'thieving',
    'crafting',
    'fletching',
    'slayer',
    'hunter',
    'mining',
    'smithing',
    'fishing',
    'cooking',
    'firemaking',
    'woodcutting',
    'farming',
  ]

  return order.reduce((acc, curr) => {
    acc[curr] = skills[curr]
    return acc
  }, {} as Skills)
}
