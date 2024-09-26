export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getUserSessionServer } from "@/app/auth/actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";


export const metadata = {
 title: 'Listado de Todos',
 description: 'SEO Title',
};

export default async function ServerTodosPage() {
  const user = await getUserSessionServer()
  if (!user) redirect('/api/auth/sigin')
  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: 'asc' }
  })

  return (
    <>
      <div className="text-3xl mb-6">Server Actions</div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={ todos } />
    </>
  );
}