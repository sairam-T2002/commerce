import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../Redux/Slices/CartSlice';

export default function Search() {
    // const count = useSelector((state) => state.CartCount.count)
    // const dispatch = useDispatch()
    const handleMarkerChange = (location) => {
        console.log('New marker location:', location);
    };
    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <Text>Profile</Text>
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
});
