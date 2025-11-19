import { apiClient } from "./apiClient";

//--- FAVORITE PRODUCT ---
export const favoriteProduct = async (token) => {
    return apiClient("/favorite-product", {
        method: "GET",
        headers: {
         Authorization: `Bearer ${token}`,
        }
    })
}