import React, { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { IAuth } from '../../types/auth';



const AuthContext = createContext<IAuth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useLocalStorage('user', null);
    const navigate = useNavigate();

    const login = async (data: string) => {
        setUser(data);
        navigate('/', { replace: true });
    };

    const logout = () => {
        setUser(null);
        navigate('/auth/login', { replace: true })
    }

    const value = useMemo(() => ({
        user,
        login,
        logout
    }),[user])

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}


export const useAuth = () => {
    return useContext(AuthContext);
}