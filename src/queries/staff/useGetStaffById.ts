import { getStaffById } from '../../services/staffService'
import { useQuery } from '@tanstack/react-query'

export const useGetStaffById = (id: string | null) => {
    return useQuery({
        queryKey: ['facility-staff', id],
        queryFn: () => {
            if (!id) throw new Error('Staff ID is required');
            return getStaffById(id);
        },
        enabled: !!id,
    })
}

export default useGetStaffById