import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

export const RegisterPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signup, isAuthenticated, errors: RegisterErrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])



    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    })

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                {
                    RegisterErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white' key={i}> {error} </div>
                    ))
                }
                <h1 className='text-2xl font-bold mb-8'>Sign up</h1>

                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        {...register('username', { required: true, minLength: 4, maxLength: 15 })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4'
                        placeholder='Username'
                    />

                    {
                        (errors.username && errors.username.type === 'minLength') && <p className='text-red-500'>Username must be at least 4 characters</p>
                    }
                    {
                        (errors.username && errors.username.type === 'required') && <p className='text-red-500'>Username is required</p>
                    }
                    {
                        (errors.username && errors.username.type === 'maxLength') && <p className='text-red-500'>Username must be less than 16 characters</p>
                    }

                    <input
                        type="email"
                        {...register('email', { required: true, })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4'
                        placeholder='Email'
                    />

                    {
                        errors.email && <p className='text-red-500'>Email is required</p>
                    }

                    <input
                        type="password"
                        {...register('password', { required: true, minLength: 6 })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'
                        placeholder='Password'
                    />
                    {
                        (errors.password && errors.password.type === 'minLength') && <p className='text-red-500'>Password must be at least 6 characters</p>
                    }
                    {
                        (errors.password && errors.password.type === 'required') && <p className='text-red-500'>Password is required</p>
                    }

                    <button className='bg-blue-600 w-24 h-8 mt-4 rounded-md font-semibold text-center'>
                        Sign up
                    </button>
                </form>
                <p className='flex gap-x-2 mt-8'>
                    Already have an account? <Link to="/login" className='text-sky-500'>Login</Link>
                </p>
            </div>
        </div>
    )
}
