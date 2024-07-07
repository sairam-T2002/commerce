import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LocationHelper } from '../LocationHelper'; // Make sure this path is correct

const Custommap = () => {
    const [region, setRegion] = useState({
        latitude: 12.790361,
        longitude: 78.716606,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        checkLocationPermissionAndSetPosition();
    }, []);

    const checkLocationPermissionAndSetPosition = async () => {
        const isServiceEnabled = await LocationHelper.isLocationServicesEnabled();
        if (!isServiceEnabled) {
            Alert.alert('Location Service Disabled', 'Please enable location services in your device settings.');
            return;
        }

        const hasPermission = await LocationHelper.requestLocationPermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Location permission is required to show your position on the map.');
            return;
        }

        const location = await LocationHelper.getCurrentLocation();
        if (location) {
            setRegion(prevRegion => ({
                ...prevRegion,
                latitude: location.latitude,
                longitude: location.longitude,
            }));
        } else {
            Alert.alert('Location Error', 'Unable to get your current location.');
        }
    };

    return (
        <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={setRegion}
        >
            <Marker
                draggable
                coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                }}
                title="Your Location"
                description="This marker represents your current location"
            />
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Custommap;