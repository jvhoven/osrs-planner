import styled from 'styled-components'
import { SkillIcon, SkillIconContainer } from './icon'
import { SkillName } from '@/lib/types'
import { Hoverable } from '@/styles'

const SkillContainer = styled.div`
  ${Hoverable}

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid white;
  border-radius: 8px;

  ${SkillIconContainer} {
    display: flex;
    flex: 0.3;

    justify-content: center;
  }

  &:hover {
    ${SkillIconContainer} {
      img {
        filter: invert(1);
      }
    }
  }

  .information {
    display: flex;
    .divider {
      font-size: 25px;
    }

    .level {
      font-size: 20px;
    }

    .max {
      font-size: 14px;
      opacity: 0.5;
      margin-top: 1rem;
    }
  }
`

export const Skill = ({ name, level }: { name: SkillName; level: number }) => {
  if (name === 'overall') {
    return null
  }

  return (
    <SkillContainer className={name}>
      <SkillIcon name={name} />
      <div className='information'>
        <span className='level'>{level}</span>
        <span className='divider'>/</span>
        <span className='max'>99</span>
      </div>
    </SkillContainer>
  )
}
