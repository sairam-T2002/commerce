import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './Redux/Slices/CartSlice';
import ActiveScreen from './Redux/Slices/ActiveScreen';

export const store = configureStore({
    reducer: {
        CartCount: CartReducer,
        ActiveScreen: ActiveScreen,
    },
})