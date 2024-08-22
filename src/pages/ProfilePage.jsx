import { useAuth } from "../context/AuthContext"

export const ProfilePage = () => {

  const { user } = useAuth()

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col mt-8 bg-zinc-800 max-w-xl  w-full p-8 rounded-lg'>
        <h1 className= 'text-2xl font-bold mb-4'>User Information</h1>
        <hr />

        <p className= 'text-lg mt-2'>{user.username}</p>
        <p className= 'text-sm text-gray-400'>Username</p>

        <p className= 'text-lg mt-4'>{user.email}</p>
        <p className= 'text-sm text-gray-400'>Email</p>
      </div>
    </div>
  )
}
