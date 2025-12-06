import { apiClient } from "./apiClient";

export const AdminUserList = async (filters,token) => {
     const params = new URLSearchParams();

  if (filters.name) params.append("name", filters.name);
  
    return apiClient(`/admin/user?${params.toString()}`, {
        method: "GET",
         headers: {
         Authorization: `Bearer ${token}`,
        }
    })
}


export const AdminCreateUser = async (formData, token) => {
  return await apiClient("/admin/user", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
        body: formData,
  });
}


export const AdminUpdateUser = async ({ id, formData, token}) => {
  return await apiClient(`/admin/user/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}