import { queryClient } from "../main";

const AUTH_KEY="auth";

export const useAuth = () => {
    const setAuthData = (data: string) => {
        queryClient.setQueryData([AUTH_KEY], data);
        sessionStorage.setItem(AUTH_KEY,data);
        // console.log("setAuthData", queryClient.getQueryData(["auth"]));
    };

    const clearAuthData = () => {
        queryClient.removeQueries({
            queryKey: [AUTH_KEY],
        }
        );
        sessionStorage.removeItem(AUTH_KEY);
    }

    return { setAuthData, clearAuthData };
};
