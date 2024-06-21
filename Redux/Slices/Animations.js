import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    payMethod: true
}

export const Animations = createSlice({
    name: 'Animations',
    initialState,
    reducers: {
        payMethodTriggerAnimation: (state, action) => {
            state.payMethod = action.payload;
        }
    }
})

export const { payMethodTriggerAnimation } = Animations.actions

export default Animations.reducer