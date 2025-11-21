import { apiClient } from "./apiClient";


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