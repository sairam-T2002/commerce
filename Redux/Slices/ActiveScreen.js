import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ActiveScreen: 'Home',
    isLoading: false,
    navigator: ['Home']
}

export const ScreenSlice = createSlice({
    name: 'ActiveScreen',
    initialState,
    reducers: {
        nav: (state, action) => {
            if (state.ActiveScreen !== action.payload) {
                state.ActiveScreen = action.payload;
                state.navigator = state.navigator.filter(ex => ex !== action.payload);
                state.navigator.push(action.payload);
            }
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        navBack: (state) => {
            const newNavigator = [...state.navigator];
            newNavigator.pop(); // Remove the last screen from the navigator array
            return {
                ...state,
                ActiveScreen: newNavigator[newNavigator.length - 1], // Set ActiveScreen to the new last screen
                navigator: newNavigator, // Update the navigator array
            };
        }
    },
})

export const { nav, setLoading, navBack } = ScreenSlice.actions

export default ScreenSlice.reducer