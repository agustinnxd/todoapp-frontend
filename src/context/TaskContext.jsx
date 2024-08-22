import { createContext, useContext, useState } from "react";

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
        await createTaskRequest(task)
    }

    const deleteTask = async (taskId) => {
        await deleteTaskRequest(taskId)
        const newTasks = tasks.filter((task) => task._id != taskId)
        setTasks(newTasks)
    }

    const updateTask = async(id, task) => {
        try {
            await updateTaskRequest(id, task)
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}