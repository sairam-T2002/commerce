import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LocationHelper } from '../LocationHelper'; // Make sure this path is correct

const Custommap = ({ isActive }) => {
    const [region, setRegion] = useState({
        latitude: 12.790361,
        longitude: 78.716606,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        console.log(isActive, "From map");
        if (isActive) {
            checkLocationPermissionAndSetPosition();
        }
    }, [isActive]);

    const checkLocationPermissionAndSetPosition = async () => {
        const isServiceEnabled = await LocationHelper.isLocationServicesEnabled();
        console.log(isServiceEnabled, "For Location Service");
        if (!isServiceEnabled) {
            Alert.alert('Location Service Disabled', 'Please enable location services in your device settings.');
            return;
        }

        const hasPermission = await LocationHelper.requestLocationPermission();
        console.log(hasPermission, "For Location Permission");
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Location permission is required to show your position on the map.');
            return;
        }

        const location = await LocationHelper.getCurrentLocation();
        if (location) {
            console.log(location, "For Location");
            setRegion({
                ...region,
                latitude: location.latitude,
                longitude: location.longitude,
            });
        } else {
            Alert.alert('Location Error', 'Unable to get your current location.');
        }
    };

    return (
        <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={(region) => setRegion(region)}
            onError={(error) => console.error('Map error:', error)}
            onMapReady={() => console.log('Map is ready')}
            onLayout={() => console.log('Map layout is ready')}
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
