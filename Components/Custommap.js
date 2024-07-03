import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const Custommap = ({
    initialRegion,
    markerColor = 'red',
    onMarkerChange,
    style
}) => {
    const [marker, setMarker] = useState(initialRegion);

    const handleMarkerChange = (newLocation) => {
        setMarker(newLocation);
        if (onMarkerChange) {
            onMarkerChange(newLocation);
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={[styles.map, style]}
                initialRegion={{
                    ...initialRegion,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(e) => handleMarkerChange(e.nativeEvent.coordinate)}
            >
                <Marker
                    draggable
                    pinColor={markerColor}
                    coordinate={marker}
                    onDragEnd={(e) => handleMarkerChange(e.nativeEvent.coordinate)}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default Custommap;