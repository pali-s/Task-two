import {useMutation} from '@tanstack/react-query';
import { loginUser } from '../services/authService';

export const useLogin = () => {
    console.log('queries/useLogin')
    return useMutation({
        mutationFn: loginUser,
    })
}