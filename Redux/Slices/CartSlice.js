import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    count: 0,
}

export const CartSlice = createSlice({
    name: 'CartCounter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            if (state.count > 0) {
                state.count -= 1
            } else {
                state.count = 0;
            }
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount } = CartSlice.actions

export default CartSlice.reducer