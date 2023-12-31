import { Gamemode } from "@/lib/types"
import { FunctionComponent, useEffect, useState } from "react"
import { useCharacter } from "../hooks/useCharacter"
import { useForm, SubmitHandler } from "react-hook-form"
import { db } from "@/models/db"
import { Modal } from "@/components/modal"
import { FormBlock, Form, Input, Select } from "@/components/forms"
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
    console.log("Why does this run twice?")
    if (stats && formState.rsn && formState.gamemode && mode === 'import') {
      db.characters.add({
        stats,
        rsn: formState.rsn,
        gamemode: formState.gamemode,
      }).then((id) => {
        router.push(`/characters/${id}`);
      });
    }
  }, [stats?.skills.overall.level, formState.rsn, formState.gamemode])

  return (
    <Modal id={id} title={title}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormBlock>
          <label htmlFor='rsn'>
            {mode === 'import' ? 'RSN' : 'Character name'}
          </label>
          <Input type='text' {...register('rsn', { required: true })} />
          {errors.rsn && <span>This field is required</span>}
        </FormBlock>
        <FormBlock>
          <label htmlFor='gamemode'>Gamemode</label>
          <Select {...register('gamemode')}>
            {GAMEMODES.map((gamemode) => (
              <option key={gamemode} value={gamemode}>
                {FORMATTED_GAMEMODE_NAMES[gamemode]}
              </option>
            ))}
          </Select>
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

