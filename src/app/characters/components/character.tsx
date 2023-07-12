import Image from "next/image"

import { Button } from "@/components/button";
import { ContentStateContainer } from "@/components/content-state";
import { Wrapper } from "@/components/wrapper";
import { db } from "@/models/db";
import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import { ReactNode, FunctionComponent } from "react";
import { Character as CharacterType } from "@/lib/types";

type Props = {
  children: (character: CharacterType) => ReactNode;
  rsn: string;
}

export const Character: FunctionComponent<Props> = ({ rsn, children }) => {
  const character = useLiveQuery(
    () => db.characters.get({ rsn }),
    [rsn],
  );

  if (character === undefined) {
    return (
      <ContentStateContainer>
        <Wrapper>
          <Image
            src='/gnome-child.svg'
            alt=''
            width='350'
            height='350'
            style={{ opacity: '0.2', marginBottom: '1rem' }}
          />
          <h4>This character does not exist</h4>
          <Button>
            <Link href='/characters'>Back to characters</Link>
          </Button>
        </Wrapper>
      </ContentStateContainer>
    )
  }

  return <>{children(character)}</>
}
