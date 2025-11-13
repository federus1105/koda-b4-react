import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderInfo:  {
        selectedProduct: [],
        pieces: null,
        size: null,
        variant: null,
        fullname: "",
        address: "",
        delivery: null,
        payment: null,
    },
    orderHistory: [],
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setScelectedProduct: (state, action) => {
      state.orderInfo.selectedProduct = action.payload;
    },
    setPieces: (state, action) => {
      state.orderInfo.pieces = action.payload;
    },
    setSize: (state, action) => {
      state.orderInfo.size = action.payload;
    },
    setVariant: (state, action) => {
      state.orderInfo.variant = action.payload;
    },
    setFullname: (state, action) => {
      state.orderInfo.fullname = action.payload;
    },
    setAddress: (state, action) => {
      state.orderInfo.address = action.payload;
    },
    setDeliveri: (state, action) => {
      state.orderInfo.delivery = action.payload;
    },
    setPayment: (state, action) => {
      state.orderInfo.payment = action.payload;
    },
    setTotal: (state, action) => {
      state.orderInfo.total = action.payload
    },

  addToHistory: (state) => {
  if (!Array.isArray(state.orderHistory)) {
    state.orderHistory = [];
  }

  const newOrder = {
    ...state.orderInfo,
    timestamp: new Date().toISOString(),
  };

  state.orderHistory.push(newOrder);
},


    resetOrder: (state) => {
      state.orderInfo = {
        selectedProduct: [],
        pieces: null,
        size: null,
        variant: null,
        fullname: "",
        address: "",
        delivery: null,
        payment: null,
      };
    },
  },
});


export const {
  setScelectedProduct,
  setPieces,
  setSize,
  setVariant,
  setFullname,
  setAddress,
  setDeliveri,
  setPayment,
  addToHistory,
  resetOrder,
  setTotal,
} = orderSlice.actions;


export default orderSlice.reducer