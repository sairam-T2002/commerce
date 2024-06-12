import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ActiveScreen: 'Home',
    isLoading: false
}

export const ScreenSlice = createSlice({
    name: 'ActiveScreen',
    initialState,
    reducers: {
        nav: (state, action) => {
            if (state.ActiveScreen !== action.payload)
                state.ActiveScreen = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
})

export const { nav, setLoading } = ScreenSlice.actions

export default ScreenSlice.reducer