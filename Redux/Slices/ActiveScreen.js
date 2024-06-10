import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ActiveScreen: 'Home',
}

export const ScreenSlice = createSlice({
    name: 'ActiveScreen',
    initialState,
    reducers: {
        nav: (state, action) => {
            if (action !== action.payload)
                state.ActiveScreen = action.payload;
        },
    },
})

export const { nav } = ScreenSlice.actions

export default ScreenSlice.reducer