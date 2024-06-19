import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.prd_id === action.payload.prd_id);
            if (existingItem) {
                existingItem.Uquantity++;
            } else {
                state.items.push({ ...action.payload, Uquantity: 1, });
            }
        },
        removeItem: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.prd_id === action.payload);
            if (itemIndex !== -1) {
                if (state.items[itemIndex].quantity > 1) {
                    state.items[itemIndex].quantity--;
                } else {
                    state.items.splice(itemIndex, 1);
                }
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.prd_id === id);
            if (item) {
                item.Uquantity = quantity;
            }
        },
        updateRQuantity: (state, action) => {
            const { id, quantity, price } = action.payload;
            const item = state.items.find(item => item.prd_id === id);
            if (item) {
                item.Rquantity = quantity;
                item.price = price;
            }
        },
        clearCart: state => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, updateQuantity, updateRQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
