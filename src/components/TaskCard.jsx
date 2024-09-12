import { useNavigate } from "react-router-dom"
import { Task } from "./Task";

export const TaskCard = ({ task }) => {

    return (
        <Task title={task.title} description={task.description} id={task._id} />
    )
}
