import { useReducer } from "react"
import { types } from "../types/types"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer"

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return {
        logged: !!user,
        user
    }
}

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, {}, init)

    const login = (name = '') => {
        const user = { id: 'abc', name }
        const action = {
            type: types.login,
            payload: user
        }
        dispatch(action)
        localStorage.setItem('user', JSON.stringify(user))
    }

    const logout = () => {
        localStorage.removeItem('user')
        const action = { type: types.logout}
        dispatch(action)
    }

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
