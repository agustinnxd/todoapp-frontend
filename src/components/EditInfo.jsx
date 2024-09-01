import React from 'react'
import { useUser } from '../context/UserContext'
import { useForm } from 'react-hook-form'

export const EditInfo = ({ type, user }) => {


    const { updateEmail, updateUsername, errors: updateErrors } = useUser()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmitUsername = handleSubmit(async (values) => {
        await updateUsername(user._id, values)
    })

    const onSubmitEmail = handleSubmit(async (values) => {
        await updateEmail(user._id, values)
    })

    return (

        <>
            {
                updateErrors.map((error, i) => (
                    <div className='bg-red-500 p-2 text-white mt-2' key={i}>{error}</div>
                ))
            }
            {
                (type === 'username')

                    ?

                    <form onSubmit={onSubmitUsername}>
                        <input
                            type="text"
                            {...register('username', { minLength: 4, maxLength: 15 })}
                            className='max-w-4xl w-full bg-zinc-700 text-white px-4 py-2 mt-2 rounded-md'
                            placeholder='Username'
                        />

                        {
                            (errors.username && errors.username.type === 'minLength') && <p className='text-red-500'>Username must be at least 4 characters</p>
                        }

                        {
                            (errors.username && errors.username.type === 'maxLength') && <p className='text-red-500'>Username must be less than 16 characters</p>
                        }

                        <button
                            className='bg-blue-600 w-20 h-8 my-4 rounded-md font-semibold text-center'
                        >
                            Save
                        </button>
                        <hr />
                    </form>

                    :

                    <form onSubmit={onSubmitEmail}>
                        <input
                            type="text"
                            {...register('email')}
                            className='max-w-4xl w-full bg-zinc-700 text-white px-4 py-2 mt-4 rounded-md'
                            placeholder='Email'
                        />

                        <button
                            className='bg-blue-600 w-20 h-8 my-4 rounded-md font-semibold text-center'
                        >
                            Save
                        </button>
                        <hr />
                    </form>
            }
        </>
    )
}
