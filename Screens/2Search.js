import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../Redux/Slices/CartSlice';
import { actNav } from '../Redux/Slices/CatlogNav';
import { products, catlog, Featureddata } from '../data';
import Cards from '../Components/Card';

export default function Search() {
    let prodcutsList = [];
    let searchList = [];
    const [text, setText] = useState('');
    const actCat = useSelector((state) => state.ActCatlog.actNav);
    if (actCat === 'All') {
        for (let key in products) {
            prodcutsList = [...prodcutsList, ...products[key]]
        }
        searchList = [...prodcutsList];
    } else {
        prodcutsList = products[actCat];
        searchList = [...prodcutsList];
    }
    const handleSearch = (e) => {
        const lowercasedInput = e.toLowerCase();
        prodcutsList = searchList
            .map(item => ({
                value: item,
                score: item.name.toLowerCase().includes(lowercasedInput) ? item.name.toLowerCase().indexOf(lowercasedInput) : Infinity
            }))
            .filter(item => item.score !== Infinity)
            .sort((a, b) => a.score - b.score)
            .map(item => item.value);
        setText(e);
    }
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color={"#4f4f4f"} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={text}
                    onChangeText={handleSearch}
                />
            </View>
            <View style={styles.productList}>
                {prodcutsList.map((item, i) => (<Cards key={i} item={item} />))}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fcf1d2',
        width: '100%'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 5,
        backgroundColor: 'white',
        width: '100%',
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        width: '100%'
    },
    productList: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 10,
        width: '100%',
        // backgroundColor: '#ffffff'
    }
});
