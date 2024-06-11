import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    actNav: 'All',
}

export const ActiveNavSlice = createSlice({
    name: 'ActiveNav',
    initialState,
    reducers: {
        actNav: (state, action) => {
            if (state.actNav !== action.payload)
                state.actNav = action.payload;
        },
    },
})

export const { actNav } = ActiveNavSlice.actions

export default ActiveNavSlice.reducer