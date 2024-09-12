import { BiEdit } from "react-icons/bi";

import { useUser } from "../context/UserContext"
import { useAuth } from '../context/AuthContext'
import { EditUserInfo } from "../components/EditUserInfo";

export const ProfilePage = () => {

  const { user } = useAuth()
  const { setEditEmail, setEditUsername, editEmail, editUsername, deleteUser } = useUser()

  return (

    <div className='flex justify-center'>
      <div className='flex flex-col mt-8 bg-zinc-800 max-w-xl  w-full p-8 rounded-lg'>
        <h1 className='text-2xl font-bold mb-4'>User Information</h1>
        <hr className="mb-4" />


        {
          editUsername

            ?

            <EditUserInfo type={'username'} user={user} />


            :

            <div className="flex">
              <div className="flex flex-col">
                <p className='text-lg mt-2'>{user.username}</p>
                <p className='text-sm text-gray-400'>Username</p>
              </div>

              <button className="text-xl pb-2 ml-2" onClick={() => { setEditUsername(true); setEditEmail(false); }}><BiEdit /></button>
            </div>


        }

        {
          editEmail

            ?

            <EditUserInfo type={'email'} user={user} />


            :

            <div className="flex">
              <div className="flex flex-col">
                <p className='text-lg mt-2'>{user.email}</p>
                <p className='text-sm text-gray-400'>Email</p>
              </div>

              <button className="text-xl pb-2 ml-2" onClick={() => { setEditEmail(true); setEditUsername(false) }}><BiEdit /></button>
            </div>


        }
        <div className='mt-4'>
          <button
            className="align-middle mr-8 bg-red-600 rounded-md text-center w-28 h-9 font-semibold"
            onClick={() => { deleteUser(user._id) }}
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div >

  )


}
