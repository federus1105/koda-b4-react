import { apiClient } from "./apiClient";


// =======================================================
//                         USER
// =======================================================


// ---- CREATE CART ----
export const createCart = async ({ product_id, quantity, size, variant, token }) => {
  const body = {
    product_id,
    quantity,
    ...(size ? { size } : {}),
    ...(variant ? { variant } : {}),
  };

  return await apiClient("/cart", {
    method: "POST",
    headers: {
         Authorization: `Bearer ${token}`,
        },
    body: JSON.stringify(body),
  });
};

// --- GET CART ---
export const GetCart = async (token) => {
  try {
    const data = await apiClient(`/cart`, {
      method: "GET",
       headers: {
         Authorization: `Bearer ${token}`,
        }
    });
    return data;
  } catch (error) {
  console.error(error)
  throw error;
}
}


// --- DELETE CART ---
export const DeleteCart = async (id_Cart,token)=> {
  return await apiClient(`/cart/${id_Cart}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// --- ORDER ---
export const OrderProduct = async (input, token)=>{
  return await apiClient("/transactions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
}


// =======================================================
//                         ADMIN
// =======================================================


export const AdminOrderList = async (filters,token) => {
     const params = new URLSearchParams();

  if (filters.ordernumber) params.append("ordernumber", filters.ordernumber);
  if (filters.status) params.append("status", filters.status);
    return apiClient(`/admin/order?${params.toString()}`, {
        method: "GET",
         headers: {
         Authorization: `Bearer ${token}`,
        }
    })
}

// --- GET DETAIL ORDER ---
export const AdminDetailOrder = async (id,token)=> {
  return await apiClient(`/admin/order/${id}`, {
    method: "GET",
    headers: {
         Authorization: `Bearer ${token}`,
        },
  });
}

export const AdminUpdateStatusOrder = async (input, id, token)=> {
  return await apiClient(`/admin/order/${id}`, {
    method: "PUT",
    headers: {
         Authorization: `Bearer ${token}`,
        },
    body: JSON.stringify(input),
  });
}