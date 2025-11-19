import { apiClient } from "./apiClient";
// ===== REGISTER ======
export const registerUser = (formData) =>
  apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify(formData),
  });