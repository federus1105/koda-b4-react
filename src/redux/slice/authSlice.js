import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    currentUser: null,
    users: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state, action) => {
            const { email, password, fullname } = action.payload;
            state.users.push({ email, password, fullname });
        },
        login: (state, action) => {
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        },
        Logout: (state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        }
    }
});

export const { register, login, Logout } = authSlice.actions;
export default authSlice.reducer;
