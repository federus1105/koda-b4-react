import { apiClient } from "./apiClient";

//--- FAVORITE PRODUCT ---
export const favoriteProduct = async () => {
    return apiClient("/favorite-product", {
        method: "GET",
    })
}

// --- GET PRODUCT BY ID ---
export const getProductById = async (productId, token) => {
  try {
    const data = await apiClient(`/product/${productId}`, {
      method: "GET",
       headers: {
         Authorization: `Bearer ${token}`,
        }
    });
    return data;
  } catch (error) {
    console.error("Fetch product by ID failed:", error);
    throw error;
  }
}