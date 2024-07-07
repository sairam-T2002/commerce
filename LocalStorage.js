// userDataHelper.js

import * as SecureStore from 'expo-secure-store';

export const UserDataHelper = {
    /**
     * Stores user data securely
     * @param {Object} userData - The user data to store
     * @returns {Promise<void>}
     */
    storeUserData: async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await SecureStore.setItemAsync(key, jsonValue);
            console.log('User data stored successfully');
        } catch (error) {
            console.error('Error storing user data:', error);
            throw error;
        }
    },

    /**
     * Retrieves stored user data
     * @returns {Promise<Object|null>} The stored user data or null if not found
     */
    getUserData: async (key) => {
        try {
            const jsonValue = await SecureStore.getItemAsync(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.error('Error retrieving user data:', error);
            throw error;
        }
    },

    /**
     * Deletes stored user data
     * @returns {Promise<void>}
     */
    deleteUserData: async (key) => {
        try {
            await SecureStore.deleteItemAsync(key);
            console.log('User data deleted successfully');
        } catch (error) {
            console.error('Error deleting user data:', error);
            throw error;
        }
    }
};