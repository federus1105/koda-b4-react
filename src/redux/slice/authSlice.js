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
        setCurrentUser: (state, action) => {
       state.currentUser = action.payload
       },
        Logout: (state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
            state.token = null;
        },
        updateUser(state, action) {
        state.currentUser = { ...state.currentUser, ...action.payload };
       }
    }
});

export const { login, Logout, setCurrentUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
