import api from "../api/api";
import type { EditStaffFormData } from "../components/Modals/EditStaff";

export const getStaffData= async()=>{
    const res = await api.get("/facility-staff");
    console.log("staff service",res.data.data.results);
    return res.data.data.results || [];
}

export const getStaffById = async (id:string)=>{
    const res = await api.get(`/facility-staff/${id}`);
    console.log("staff by id",res.data.data);
    return res.data.data;
}

export const updateStaff = async (id:string,data:EditStaffFormData) =>{
    const res = await api.patch(`facility-staff/${id}`,data);
    console.log("update status:",res.status)
    return res.status;
}
