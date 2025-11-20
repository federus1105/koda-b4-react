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

// ==== FORGOT PASSWORD ====
export const forgotPassword = async (formData) => {
   return apiClient("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}


// ==== RESET PASSWORD ===
export const resetPassword = async (formData) => {
   return apiClient("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}