import {useQuery} from '@tanstack/react-query';
import { getStaffData } from '../../services/staffService';

export const useGetStaff = () => {
    return useQuery({
        queryKey:['facility-staff'],
        queryFn: getStaffData,
    })
}