import { createContext, useContext, useState } from "react"
import { deleteUserRequest, updateUserRequest } from "../api/users"
import { useAuth } from "./AuthContext"

const UserContext = createContext()

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a userProvider')
    }

    return context
}

export function UserProvider({ children }) {

    const { setUser, logout } = useAuth()
    const [errors, setErrors] = useState([])
    const [editUsername, setEditUsername] = useState(false)
    const [editEmail, setEditEmail] = useState(false)

    const updateEmail = async (id, data) => {
        try {
            const res = await updateUserRequest(id, data)
            setUser(res.data)
            setEditEmail(false)
            setErrors([])
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message)
            setEditEmail(true)
        }
    }

    const updateUsername = async (id, data) => {
        try {
            const res = await updateUserRequest(id, data)
            setUser(res.data)
            setEditUsername(false)
            setErrors([])
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message)
            setEditUsername(true)
        }
    }

    const deleteUser = async (userId) => {
        try {
            await deleteUserRequest(userId)
            logout()
        } catch (error) {
            setErrors(error.response.data.message)
        };

    };

    return (
        <UserContext.Provider value={{
            errors,
            setErrors,
            updateEmail,
            updateUsername,
            deleteUser,
            editEmail,
            editUsername,
            setEditEmail,
            setEditUsername
        }}>
            {children}
        </UserContext.Provider>
    )
}