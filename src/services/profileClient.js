import { apiClient } from "./apiClient";


export const profileUser = async (token) => {
    return apiClient("/profile", {
        method: "GET",
        headers: {
         Authorization: `Bearer ${token}`,
        }
    })
}