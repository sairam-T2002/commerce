import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../Redux/Slices/CartSlice';

export default function Search() {
    // const count = useSelector((state) => state.CartCount.count)
    // const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
