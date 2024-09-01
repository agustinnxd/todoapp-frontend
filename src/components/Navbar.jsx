import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Navbar = () => {

    const { isAuthenticated, logout } = useAuth()

    return (
        <nav className='bg-zinc-700 flex justify-between py-5 px-10 rounded-b-md items-center'>
            <Link to='/'>
                <h1 className='text-4xl font-semibold'>Tasks Manager</h1>
            </Link>

            <ul className='flex gap-x-2'>
                {isAuthenticated == true ? (
                    <>
                        <li>
                            <Link to='/tasks' className='bg-blue-600 px-4 py-1 rounded-lg font-semibold'>Tasks</Link>
                        </li>

                        <li>
                            <Link to='/add-task' className='bg-blue-600 px-4 py-1 rounded-lg font-semibold'>Add Task</Link>
                        </li>

                        <li>
                            <Link to='/profile' className='bg-blue-600 px-4 py-1 rounded-lg font-semibold'>Profile</Link>
                        </li>

                        <li>
                            <Link to='/login' className='bg-blue-600 px-4 py-1 rounded-lg font-semibold' onClick={() => { logout() }}>Logout</Link>
                        </li>

                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login' className='bg-blue-600 px-4 py-1 rounded-lg font-semibold'>Login</Link>
                        </li>

                        <li>
                            <Link to='/register' className='bg-blue-600 px-4 py-1 rounded-lg font-semibold'>Signin</Link>
                        </li>
                    </>
                )
                }
            </ul>
        </nav>
    )
}
