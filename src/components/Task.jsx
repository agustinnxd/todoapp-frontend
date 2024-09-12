import React from 'react'
import { BiEdit } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import { useTasks } from '../context/TaskContext'
import { EditTask } from "./EditTask";

export const Task = ({ title, description, id }) => {

    const { deleteTask, editTitle, editDescription, setEditTitle, setEditDescription } = useTasks()

    return (
        <div className='max-w-lg w-full p-12 pt-8 bg-zinc-800 rounded-lg mb-4'>

            <div className="flex justify-end mb-4">
                <button
                    onClick={async () => { await deleteTask(id) }}
                    className="text-xl text-gray-500 hover:text-red-500"
                ><AiOutlineClose /></button>
            </div>

            {
                editTitle

                    ?

                    <EditTask type={'title'} id={id} />

                    :

                    <div className="flex flex-row justify-between mb-4">

                        <h1 className="text-2xl font-bold max-w-40">{title}</h1>

                        <button
                            onClick={() => { setEditTitle(true); setEditDescription(false) }}
                            className="text-2xl"
                        ><BiEdit /></button>

                    </div>
            }




            <hr />

            {
                editDescription

                    ?
                    <EditTask type={'description'} id={id} />

                    :
                    <div className="flex flex-row justify-between mt-4">
                        <p className="text-xl">{description ? description : null}</p>

                        <button
                            onClick={() => { setEditTitle(false); setEditDescription(true) }}
                            className="text-2xl"
                        ><BiEdit /></button>
                    </div>

            }




        </div>
    )
}
