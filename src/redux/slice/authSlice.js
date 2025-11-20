import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    currentUser: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        currentUser: (state, action) => {
            state.currentUser = action.payload
        },
        Logout: (state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        }
    }
});

export const { login, Logout, currentUser } = authSlice.actions;
export default authSlice.reducer;
