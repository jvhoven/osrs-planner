"use client"

import useSWRMutation from 'swr/mutation';

import type { Activity, BH, Bosses, Clues, Skill, Skills, Stats } from '@/lib/types';
import {
  BH_MODES,
  BOSSES,
  CLUES,
  SKILLS,
} from '@/lib/constants';

async function fetchCharacter(url: string, { arg }: { arg: { rsn: string } }) {
  return fetch(`${url}?player=${encodeURIComponent(arg.rsn)}`).then(res => res.text());
}

export const useCharacter = () => {
  const { data, error, trigger } = useSWRMutation("/osrs-api/index_lite.ws", fetchCharacter, {
    revalidate: true
  });

  if (data) {
    const parsed = data.split('\n')
      .filter((entry) => !!entry)
      .map((stat) => stat.split(','));

    if (
      parsed.length !==
      SKILLS.length + BH_MODES.length + CLUES.length + BOSSES.length + 5
    ) {
      throw Error("Invalid format");
    }

    const skillObjects: Skill[] = parsed
      .filter((stat) => stat.length === 3)
      .map(([rank, level, xp]) => {
        const skill: Skill = {
          rank: parseInt(rank, 10),
          level: parseInt(level, 10),
          xp: parseInt(xp, 10)
        };
        return skill;
      });

    const activityObjects: Activity[] = parsed
      .filter((stat) => stat.length === 2)
      .map((stat) => {
        const [rank, score] = stat;
        const activity: Activity = {
          rank: parseInt(rank, 10),
          score: parseInt(score, 10)
        };
        return activity;
      });

    const [leaguePoints] = activityObjects.splice(0, 1);
    const bhObjects = activityObjects.splice(0, BH_MODES.length);
    const clueObjects = activityObjects.splice(0, CLUES.length);
    const [
      lastManStanding,
      pvpArena,
      soulWarsZeal,
      riftsClosed
    ] = activityObjects.splice(0, 4);
    const bossObjects = activityObjects.splice(0, BOSSES.length);


    const skills: Skills = skillObjects.reduce<Skills>((prev, curr, index) => {
      const newSkills = { ...prev };
      newSkills[SKILLS[index]] = curr;
      return newSkills;
    }, {} as Skills);

    const bountyHunter: BH = bhObjects.reduce<BH>((prev, curr, index) => {
      const newBH = { ...prev };
      newBH[BH_MODES[index]] = curr;
      return newBH;
    }, {} as BH);

    const clues: Clues = clueObjects.reduce<Clues>((prev, curr, index) => {
      const newClues = { ...prev };
      newClues[CLUES[index]] = curr;
      return newClues;
    }, {} as Clues);

    const bosses: Bosses = bossObjects.reduce<Bosses>((prev, curr, index) => {
      const newBosses = { ...prev };
      newBosses[BOSSES[index]] = curr;
      return newBosses;
    }, {} as Bosses);

    return {
      update: trigger,
      stats: {
        skills,
        leaguePoints,
        bountyHunter,
        lastManStanding,
        pvpArena,
        soulWarsZeal,
        riftsClosed,
        clues,
        bosses
      } as Stats,
    };
  }

  return {
    update: trigger,
    stats: undefined
  }
}


