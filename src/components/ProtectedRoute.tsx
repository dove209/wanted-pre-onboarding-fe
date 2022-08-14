import React from 'react';
import { Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { IAuth } from '../../types/auth';


export const ProtectedRoute: React.FC = () => {
    const { user } = useAuth() as IAuth;
    const outlet = useOutlet();
    
    if(!user) {
        return <Navigate to='/auth/login' replace />
    }

    return (
        <>
            {outlet}
        </>
    )

}