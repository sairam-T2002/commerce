import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../Redux/Slices/CartSlice';
import Custommap from '../Components/Custommap';

export default function Search() {
    // const count = useSelector((state) => state.CartCount.count)
    // const dispatch = useDispatch()
    const handleMarkerChange = (location) => {
        console.log('New marker location:', location);
    };
    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <Custommap
                    initialRegion={{
                        latitude: 12.790361,
                        longitude: 78.716606,
                    }}
                    markerColor="red"
                    onMarkerChange={handleMarkerChange}
                    style={styles.map}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapContainer: {
        width: '95%', // Adjust this to change the width of the map container
        aspectRatio: 16 / 19, // This maintains a 16:9 aspect ratio
        maxHeight: 10000, // Maximum height of the map
        borderRadius: 10, // Rounded corners for the map container
        overflow: 'hidden', // Ensures the map respects the border radius
        elevation: 5, // Adds a shadow on Android
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
