import React from 'react'
import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TaskContext'

export const EditTask = ({ type, id }) => {

    const { updateDescription, updateTitle, errors: updateErrors } = useTasks()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmitTitle = handleSubmit(async (values) => {
        await updateTitle(id, values)
    })

    const onSubmitDescription = handleSubmit(async (values) => {
        await updateDescription(id, values)
    })

    return (
        <>

            {
                updateErrors.map((error, i) => (
                    <div className='bg-red-500 p-2 text-white mt-2' key={i}>{error}</div>
                ))
            }
            {
                (type === 'title')

                    ?

                    <form onSubmit={onSubmitTitle}>
                        <input
                            type="text"
                            {...register('title', { minLength: 3, maxLength: 21 })}
                            className='max-w-4xl w-full bg-zinc-700 text-white px-4 py-2 mt-2 rounded-md'
                            placeholder='Title'
                        />

                        {
                            (errors.title && errors.title.type === 'minLength') && <p className='text-red-500'>Title must be at least 3 characters</p>
                        }
                        {
                            (errors.title && errors.title.type === 'maxLength') && <p className='text-red-500'>Title must be at less than 22 characters</p>
                        }

                        <button
                            className='bg-blue-600 w-20 h-8 my-4 rounded-md font-semibold text-center'
                        >
                            Save
                        </button>
                    </form>

                    :

                    <form onSubmit={onSubmitDescription}>
                        <input
                            type="text"
                            {...register('description')}
                            className='max-w-4xl w-full bg-zinc-700 text-white px-4 py-2 mt-2 rounded-md'
                            placeholder='Description'
                        />

                        <button
                            className='bg-blue-600 w-20 h-8 my-4 rounded-md font-semibold text-center'
                        >
                            Save
                        </button>
                    </form>
            }
        </>
    )
}
