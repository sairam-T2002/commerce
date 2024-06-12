import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './Redux/Slices/CartSlice';
import ActiveScreen from './Redux/Slices/ActiveScreen';
import CatlogNav from './Redux/Slices/CatlogNav';

export const store = configureStore({
    reducer: {
        Cart: CartReducer,
        ActiveScreen: ActiveScreen,
        ActCatlog: CatlogNav
    },
})