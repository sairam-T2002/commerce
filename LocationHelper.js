// locationHelper.js

import * as Location from 'expo-location';

export const LocationHelper = {
    /**
     * Request location permissions from the user
     * @returns {Promise<boolean>} Whether permission was granted
     */
    requestLocationPermission: async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            return status === 'granted';
        } catch (error) {
            console.error('Error requesting location permission:', error);
            return false;
        }
    },

    /**
     * Get the current location of the device
     * @returns {Promise<Location.LocationObject|null>} The location object or null if unable to get location
     */
    getCurrentLocation: async () => {
        try {
            const { coords } = await Location.getCurrentPositionAsync({});
            return coords;
        } catch (error) {
            console.error('Error getting current location:', error);
            return null;
        }
    },

    /**
     * Check if location services are enabled on the device
     * @returns {Promise<boolean>} Whether location services are enabled
     */
    isLocationServicesEnabled: async () => {
        try {
            const enabled = await Location.hasServicesEnabledAsync();
            return enabled;
        } catch (error) {
            console.error('Error checking location services:', error);
            return false;
        }
    }
};