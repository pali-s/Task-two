import api from "../api/api";

export const loginUser= async (payload:{email:string ;password:string ; facility_code:string})=>{
    console.log("authService");
    const res = await api.post("/auth/staff-user/login",payload);
    return res.data;
}
