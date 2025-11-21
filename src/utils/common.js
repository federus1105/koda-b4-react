export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const activeClass = "bg-orange-400 text-white";
export const baseClass = "flex gap-5 cursor-pointer items-center p-2 rounded-xl hover:bg-orange-400 hover:text-white";

// ---- CATEGORY PRODUCT ---
export const categoryOptions = [
    { id: 1, label: "Foods", value: 1 },
    { id: 2, label: "Snack", value: 2 },
    { id: 3, label: "Steak", value: 3 },
    { id: 4, label: "Rice", value: 4 },
    { id: 5, label: "Noodles", value: 5 },
    { id: 6, label: "Pasta", value: 6 },
    { id: 7, label: "Drinks", value: 7 },
    { id: 8, label: "Coffee", value: 8 },
    { id: 9, label: "Non Coffee", value: 9 },
];

// --- DELIVERY ORDERS ---
export const deliveryOptions = [
  { id: 1, label: "Dine In"},
  { id: 2, label: "Door Delivery"},
  { id: 3, label: "Pick Up"},
];


// --- PAYMENT METHOD ---
export const paymentMethods = [
    { id: 3, name: "Gopay", img: "https://storage.googleapis.com/flip-prod-mktg-strapi/media-library/Virtual_Account_Go_Pay_1_a96fb1aedb/Virtual_Account_Go_Pay_1_a96fb1aedb.jpg"},
    { id: 4, name: "Paypal", img: "https://www.centerklik.com/wp-content/uploads/2016/02/paypal.jpg" },
    { id: 5, name: "Dana", img: "https://eswpcd25uod.exactdn.com/blog/wp-content/uploads/2023/08/DANA-Apa-pun-transaksinya-selalu-ada-DANA-1.png" },
    { id: 6, name: "BCA", img: "https://kilasjatim.com/wp-content/uploads/2024/01/BCA.png" },
    { id: 7, name: "BRI", img: "https://cdn.ngopibareng.id/uploads/2025/2025-04-03/kapan-bank-bri-buka-jadwal-dan-jam-operasional-selama-lebaran--thumbnail-289" },
    { id: 8, name: "OVO", img: "https://i.pinimg.com/736x/28/fd/ed/28fdedc2022b5de9ae5a7f2507eb5f2d.jpg" },
  ];