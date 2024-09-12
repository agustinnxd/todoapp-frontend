import { useTasks } from "../context/TaskContext"
import { TaskCard } from "../components/TaskCard"
import { useEffect } from "react"

export const TaskPage = () => {

  const { tasks, getTasks } = useTasks()

  useEffect(() => {
    getTasks()

  }, [tasks])

  if (tasks.length === 0) return (<h1>No tasks</h1>)

  return (
    <div className="flex justify-center">
      <div className='flex flex-col mt-8 items-center justify-self-center max-w-xl w-full p-8 rounded-lg'>
        {
          tasks.map((task, i) => (
            <TaskCard key={i} title={task.title} description={task.description} id={task._id} />
          ))
        }
      </div>
    </div>
  )
}
