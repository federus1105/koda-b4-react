import { apiClient } from "./apiClient";


// ==============================
//             USER
// ==============================

// --- FAVORITE PRODUCT ---
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

  if (filters.name) params.append("name", filters.name);
  if (filters.min_price) params.append("min_price", filters.min_price);
  if (filters.max_price) params.append("max_price", filters.max_price);
  if (filters.category && Array.isArray(filters.category)) {
    filters.category.forEach((cat) => params.append("category", cat));
  }
  if (filters.sortBy) params.append("sort_by", filters.sortBy);
    if (filters.page) params.append("page", filters.page);

  return apiClient(`/product?${params.toString()}`, {
    method: "GET",
  });
}


// =======================================================
//                         ADMIN
// =======================================================

export const AdminGetCategory = async (token) => {
   return apiClient("/admin/categories", {
        method: "GET",
         headers: {
         Authorization: `Bearer ${token}`,
        }
    })
}

export const AdminProductList = async (filters,token) => {
     const params = new URLSearchParams();

  if (filters.name) params.append("name", filters.name);
    if (filters.page) params.append("page", filters.page);
    return apiClient(`/admin/product?${params.toString()}`, {
        method: "GET",
         headers: {
         Authorization: `Bearer ${token}`,
        }
    })
}

export const AdminCreateProduct = async (formData, token) => {
  return await apiClient("/admin/product", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export const AdminDeleteProduct = async (id_product, token) => {
  return await apiClient(`/admin/product/delete/${id_product}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const AdminUpdateProduct = async (id_product, token, formdata) => {
 return await apiClient(`/admin/product/${id_product}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  }); 
}