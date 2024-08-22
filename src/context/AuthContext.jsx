import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (values) => {
        try {
            const res = await registerRequest(values)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data.message)
        }
    }

    const signin = async (values) => {
        try {
            const res = await loginRequest(values);
            setUser(res.data);
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data.message)
        }
    }

    const logout = async () => {
        Cookies.remove("token")
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return;
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false)
                    return
                }

                setIsAuthenticated(true);
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false)
            };
        }
        checkLogin()
    }, [])


    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}