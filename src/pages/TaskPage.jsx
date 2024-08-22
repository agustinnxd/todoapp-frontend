import { useEffect } from "react"
import { useTasks } from "../context/TaskContext"
import { TaskCard } from "../components/TaskCard"

export const TaskPage = () => {

  const { getTasks, tasks } = useTasks()

  useEffect(() => {
    getTasks()

  }, [])

  if (tasks.length === 0) return (<h1>No tasks</h1>)

  return (
    <div className="flex justify-center">
      <div className='flex flex-col mt-8 items-center justify-self-center bg-zinc-800 max-w-xl  w-full p-8 rounded-lg'>
        {
          tasks.map((task) => (
            <TaskCard key={task._id} title={task.title} description={task.description} date={task.createdAt} id={task._id}/>
          ))
        }
      </div>
    </div>
  )
}
