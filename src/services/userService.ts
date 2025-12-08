import api from "../api/api";

export const getUser= async()=>{
    const res = await api.get("/facility-staff/me");
    console.log(res);
    return res.data.data;
}