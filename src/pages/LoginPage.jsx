import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, errors: signinErrors, isAuthenticated } = useAuth()

  const navigate = useNavigate()

  const onSubmit = handleSubmit(data => {
    signin(data)
  })

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/tasks')
    }
  
    
  }, [isAuthenticated])
  

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        {
          signinErrors.map((error, i) => (
            <div className='bg-red-500 p-2 text-white' key={i}> {error} </div>
          ))
        }
        <h1 className='text-2xl font-bold mb-8'>Login</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register('email', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'
            placeholder='Email'
          />

          {
            errors.email && <p className='text-red-500'>Email is required</p>
          }

          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mt-4'
            placeholder='Password'
          />

          {
            (errors.password && errors.password.type === 'required') && <p className='text-red-500'>Password is required</p>
          }
          {
            (errors.password && errors.password.type === 'minLength') && <p className='text-red-500'>Password must be at least 6 characters</p>
          }

          <button className='bg-blue-600 w-20 h-8 mt-4 rounded-md font-semibold text-center'>
            Login
          </button>
        </form>
        <p className='flex gap-x-2 mt-8'>
          Don't have an account? <Link to="/register" className='text-sky-500'>Sign up</Link>
        </p>
      </div>
    </div>
  )
}
