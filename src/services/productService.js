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


// --- LIST PRODUCT FILTER ---
export const productList = async (filters) => {
   const params = new URLSearchParams();

  // === FILTER NAME ===
  if (filters.name) params.append("name", filters.name);
  
  // === FILTER PRICE ===
  if (filters.min_price) params.append("min_price", filters.min_price);
  if (filters.max_price) params.append("max_price", filters.max_price);


  // === CATEGORY ===
  if (filters.category && Array.isArray(filters.category)) {
    filters.category.forEach((cat) => params.append("category", cat));
  }

    // === SORT BY ===
  if (filters.sortBy) params.append("sort_by", filters.sortBy);


   // === PAGINATION ===
  if (filters.page) params.append("page", filters.page);

  return apiClient(`/product?${params.toString()}`, {
    method: "GET",
  });
}