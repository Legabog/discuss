'use client'

import { FC } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@nextui-org/react"

import { Props } from "./types"

export const FormButton: FC<Props> = ({ children  }) => {
  const { pending } = useFormStatus();

  return <Button type="submit" isLoading={pending}>{children}</Button>
}