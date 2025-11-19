import { apiClient } from "./apiClient";


// ===== REGISTER ======
export const registerUser = (formData) =>
  apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify(formData),
  });

// ====== LOGIN ========
export const loginUser = async (formData) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });
};