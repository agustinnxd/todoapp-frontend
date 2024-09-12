import { createContext, useContext, useEffect, useState } from "react";

import { createTaskRequest, deleteTaskRequest, getTaskRequest, getTasksRequest, updateTaskRequest } from '../api/tasks'

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider")
    }

    return context
}

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([])
    const [errors, setErrors] = useState([])
    const [editTitle, setEditTitle] = useState(false)
    const [editDescription, setEditDescription] = useState(false)

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data
        } catch (error) {
            console.log(error);
        }

    }

    const createTask = async (task) => {
        try {
            await createTaskRequest(task)
        } catch (error) {
            setErrors(error.response.data.message)
        }
    }

    const deleteTask = async (taskId) => {
        await deleteTaskRequest(taskId)
        const newTasks = tasks.filter((task) => task._id != taskId)
        setTasks(newTasks)
    }

    const updateTitle = async (id, task) => {
        try {
            const newTask = await updateTaskRequest(id, task)
            const newTasks = tasks.map((t) => t._id !== id ? t : newTask)
            setTasks(newTasks)
            setEditTitle(false)
        } catch (error) {
            setErrors(error.response.data.message);
        }

    }

    const updateDescription = async (id, task) => {
        try {
            await updateTaskRequest(id, task)
            setEditDescription(false)

        } catch (error) {
            setErrors(error.response.data.message);
        }

    }

    useEffect(() => {
      getTasks()

    }, [tasks])
    
    

    return (
        <TaskContext.Provider value={{
            tasks,
            setEditDescription,
            setEditTitle,
            editTitle,
            editDescription,
            errors,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateDescription,
            updateTitle
        }}>
            {children}
        </TaskContext.Provider>
    )
}