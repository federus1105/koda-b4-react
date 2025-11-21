import { apiClient } from "./apiClient";


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
