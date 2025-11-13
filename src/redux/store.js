import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import userReducer from "./slice/authSlice" 
import orderReducer from "./slice/orderSlice"

const persistConfig = {
    key : "coffe-shop",
    storage
}

const rootReducer = combineReducers({
    auth: userReducer,
    order: orderReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const reduxStore = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(reduxStore)