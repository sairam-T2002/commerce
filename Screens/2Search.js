import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../Redux/Slices/CartSlice';
import { actNav } from '../Redux/Slices/CatlogNav';
import { products, catlog } from '../data';

export default function Search() {
    const [text, setText] = useState('');
    const actCat = useSelector((state) => state.ActCatlog.actNav);
    // const count = useSelector((state) => state.CartCount.count)
    // const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color={"#4f4f4f"} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={text}
                    onChangeText={setText}
                />
            </View>
            <View style={styles.productList}>
                <View style={styles.product}>
                    <Text> </Text>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fcf1d2',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 5,
        backgroundColor: 'white',
        width: 'auto',
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        width: '100%'
    },
    productList: {
        flex: 1,
        flexDirection: 'column',
        padding: 10
    },
    product: {
        flexDirection: 'row',
        width: '100%',
        height: 100,
        backgroundColor: 'white'
    }
});
