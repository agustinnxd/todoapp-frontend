import { useNavigate } from "react-router-dom"
import { useTasks } from "../context/TaskContext"

export const TaskCard = ({ title, description, id }) => {

    const {deleteTask} = useTasks()
    const navigate = useNavigate()
    
    
    
    return (
        <div className='bg-zinc-800 max-w-md w-full py-8 px-2'>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-2 max-w-40">{title}</h1>
                <div>
                    <button 
                        className="align-middle ml-4 mr-2 bg-red-600 rounded-md text-center w-16 h-7 font-semibold"
                        onClick={async () => { await deleteTask(id)}}
                    >Delete</button>
                    <button 
                        className="align-middle bg-blue-600 rounded-md text-center w-16 h-7 font-semibold"
                        onClick={()=>navigate(`/tasks/${id}`)}
                    >Edit</button>
                </div>
            </div>
            <hr />
            <p className="mt-2 text-xl">{description ? description : null}</p>
        </div>
    )
}
