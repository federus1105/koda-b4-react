export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

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


  export const activeClass = "bg-orange-400 text-white";
  export const baseClass = "flex gap-5 cursor-pointer items-center p-2 rounded-xl hover:bg-orange-400 hover:text-white";