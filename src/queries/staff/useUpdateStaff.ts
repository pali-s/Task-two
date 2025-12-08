import { updateStaff } from "../../services/staffService";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import type { EditStaffFormData } from "../../components/Modals/EditStaff";
import { toast } from "react-toastify";

export const useUpdateStaff = () => {
    const queryClient= useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: EditStaffFormData }) =>
            updateStaff(id, data),
        onSuccess:()=>{
            toast.success("Staff updated successfully.")
            queryClient.invalidateQueries({ queryKey: ['facility-staff'] });
        },
        onError:()=>{
            toast.error("Error updating staff")
        }
    })
}