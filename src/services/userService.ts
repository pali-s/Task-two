import api from "../api/api";

export const getUser= async()=>{
    const res = await api.get("/facility-staff/me");
    return res.data.data;
}