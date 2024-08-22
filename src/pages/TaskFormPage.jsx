import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const TaskFormPage = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const { createTask, getTask, updateTask } = useTasks()
  const params = useParams()

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id)
        setValue('title', task.title)
        setValue('description', task.description)
      }
    }


  }, [])


  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data)
    } else {
      await createTask(data)
    }
    navigate('/tasks')
  })

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <h1 className='text-2xl font-bold mb-8'>Create Task</h1>
        <form onSubmit={onSubmit}>
          {
            (errors.title && errors.title.type === 'minLength') && <p className='text-red-500'>Title must be at least 3 characters</p>
          }

          {
            (errors.title && errors.title.type === 'maxLength') && <p className='text-red-500'>Title must be less than 23 characters</p>
          }

          <input
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4'
            type="text"
            placeholder="Title"
            {...register('title', { minLength: 3, maxLength: 22 })}
            autoFocus
          />  

          <textarea
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'
            rows='3'
            placeholder="Description"
            {...register('description')}

          ></textarea>

          <button className='bg-blue-600 w-24 h-8 mt-4 rounded-md font-semibold text-center'>Save</button>
        </form>

      </div>
    </div>

  )
}
