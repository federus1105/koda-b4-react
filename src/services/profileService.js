import { apiClient } from "./apiClient";

// --- GET USER ---
export const profileUser = async (token) => {
    return apiClient("/profile", {
        method: "GET",
        headers: {
         Authorization: `Bearer ${token}`,
        }
    })
}

// --- UPDATE PROFILE ---
export const UpdateProfile = async (formData, token) => {
  return await apiClient("/profile", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

// --- UPDATE PASSWORD ---
export const UpdatePasswordUser = async (input, token) => {
    return await apiClient("/profile", {
    method: "PUT",
    headers: {
         Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
        },
    body: JSON.stringify(input),
  });
}