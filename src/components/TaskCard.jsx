import { BiEdit } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import { useTasks } from '../context/TaskContext'
import { EditTask } from "./EditTask";
import { useState } from "react";

export const TaskCard = ({ title, description, id }) => {

    const [editTitle, setEditTitle] = useState(false)
    const [editDescription, setEditDescription] = useState(false)

    const { deleteTask } = useTasks()

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

                    <EditTask type={'title'} id={id} setEditDescription={setEditDescription} setEditTitle={setEditTitle} />

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
                    <EditTask type={'description'} id={id} setEditDescription={setEditDescription} setEditTitle={setEditTitle} />

                    :

                    <div className="flex flex-row justify-between mt-4">
                        <p className="text-xl">{description ? description : null}</p>

                        {
                            description

                                ?

                                <button
                                    onClick={() => { setEditTitle(false); setEditDescription(true) }}
                                    className="text-2xl"
                                ><BiEdit /></button>

                                :

                                <button
                                    onClick={() => { setEditTitle(false); setEditDescription(true) }}
                                    className="bg-blue-600 rounded-md w-36 h-8 font-semibold"
                                >
                                    Add Description
                                </button>
                        }


                    </div>

            }




        </div>
    )
}
