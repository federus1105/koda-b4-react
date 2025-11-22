import { apiClient } from "./apiClient";


// --- GET LIST HISTORY ---
export const historyUser = async ( filters, token) => {
 const params = new URLSearchParams();

  // === FILTER STATUS ===
  if (filters.month) params.append("month", filters.month);
  // === FILTER PRICE ===
  if (filters.status) params.append("status", filters.status);

const queryString = params.toString();
  const url = `/history${queryString ? `?${queryString}` : ""}`;

    return apiClient(url, {
        method: "GET",
        headers: {
         Authorization: `Bearer ${token}`,
        }
    })
}

// --- GET DETAIL HISTORY ---
export const DetailHistory = async (id_history,token)=> {
  return await apiClient(`/history/${id_history}`, {
    method: "GET",
    headers: {
         Authorization: `Bearer ${token}`,
        },
  });
}