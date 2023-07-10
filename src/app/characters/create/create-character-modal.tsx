import { Gamemode } from "@/lib/types"
import { FunctionComponent, useEffect, useState } from "react"
import { useCharacter } from "../hooks/useCharacter"
import { useForm, SubmitHandler } from "react-hook-form"
import { db } from "@/models/db"
import { Modal } from "@/components/modal"
import { FormBlock } from "@/components/forms/form-block"
import { Form } from "@/components/forms/form"
import { FORMATTED_GAMEMODE_NAMES, GAMEMODES } from "@/lib/constants"
import { Button } from "@/components/button"
import { useRouter } from "next/navigation"

type FormData = {
  rsn: string
  gamemode: Gamemode
}

type CreateCharacterModalProps = {
  id: string
  title: string
  mode: 'create' | 'import'
}

export const CreateCharacterModal: FunctionComponent<CreateCharacterModalProps> = ({
  id,
  title,
  mode,
}) => {
  const [formState, setFormState] = useState<Partial<FormData>>({})
  const { stats, update } = useCharacter()
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    update({ rsn: data.rsn }).then(() => {
      setFormState({
        rsn: data.rsn,
        gamemode: data.gamemode,
      })
    })
  }

  useEffect(() => {
    if (stats && formState.rsn && formState.gamemode && mode === 'import') {
      db.characters.add({
        stats,
        rsn: formState.rsn,
        gamemode: formState.gamemode,
      }).then(() => {
        router.push(`/characters/${formState.rsn}`);
      });
    }
  }, [stats?.skills.overall.level, formState.rsn, formState.gamemode, mode, router, stats])

  return (
    <Modal id={id} title={title}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormBlock>
          <label htmlFor='rsn'>
            {mode === 'import' ? 'RSN' : 'Character name'}
          </label>
          <input type='text' {...register('rsn', { required: true })} />
          {errors.rsn && <span>This field is required</span>}
        </FormBlock>
        <FormBlock>
          <label htmlFor='gamemode'>Gamemode</label>
          <select {...register('gamemode')}>
            {GAMEMODES.map((gamemode) => (
              <option key={gamemode} value={gamemode}>
                {FORMATTED_GAMEMODE_NAMES[gamemode]}
              </option>
            ))}
          </select>
          {errors.gamemode && <span>This field is required</span>}
        </FormBlock>
        <Button type='submit'>
          <span>
            {mode === 'import' ? 'Import character' : 'Create character'}
          </span>
        </Button>
      </Form>
    </Modal>
  )
}

