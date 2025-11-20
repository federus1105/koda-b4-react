import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
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
        Logout: (state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        }
    }
});

export const { login, Logout } = authSlice.actions;
export default authSlice.reducer;
