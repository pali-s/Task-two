import React from 'react';
import {Navigate} from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const AUTH_KEY="auth";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute:React.FC<PrivateRouteProps>=({children})=>{
const queryClient = useQueryClient();
let token =queryClient.getQueryData([AUTH_KEY]);

    if (!token) {
        const storedToken = sessionStorage.getItem(AUTH_KEY);
        if (storedToken) {
            queryClient.setQueryData([AUTH_KEY], storedToken);
            token = storedToken;
        }
    }

    if (!token) return <Navigate to="/login" replace />;

    return <>{children}</>
};

export default PrivateRoute;