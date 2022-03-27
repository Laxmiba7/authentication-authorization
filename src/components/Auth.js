import { Children, createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

export const AuthProvider =() => {
    const [user,setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }

    return (
        <AuthContext.Provider value={{user, login}}>
            {Children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}