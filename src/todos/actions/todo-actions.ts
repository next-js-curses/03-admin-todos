'use server'

import { getUserSessionServer } from '@/app/auth/actions'
import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const sleep = async(seconds: number = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}

export const toggleTodo = async(id: string, complete: boolean): Promise<Todo> => {
  await sleep(3)
  const todo = await prisma.todo.findFirst({ where: { id } })
  if (!todo) {
    throw `Todo con id ${id} no encontrado`
  }
  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete }
  })
  revalidatePath('/dashboard/server-todos')
  return updateTodo
}

interface Error {
  message: string
}

export const addTodo = async(description: string): Promise<Todo|Error> => {
  try {
    const user = await getUserSessionServer()
    if (!user) redirect('/api/auth/sigin')
    const todo = await prisma.todo.create({ data: { description, userId: user.id } });
    revalidatePath('/dashboard/server-todos')
    return todo;
  } catch (error) {
    return { message: 'Error creando TODO' }
  }
}

export const deleteCompleted = async(): Promise<void> => {
  await prisma.todo.deleteMany({ where: { complete: true } })
  revalidatePath('/dashboard/server-todos')
}
