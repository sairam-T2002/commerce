import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import Cards from '../Components/Card';
import { products } from '../data';

let tempO = [];

export default function Search() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [text, setText] = useState('');
    const actCat = useSelector((state) => state.ActCatlog.actNav);
    const cart = useSelector((state) => state.Cart.items);

    useEffect(() => {
        let prodcutsList = [];
        if (actCat === 'All') {
            for (let key in products) {
                prodcutsList = [...prodcutsList, ...products[key]]
            }
        } else {
            prodcutsList = products[actCat];
        }
        tempO = prodcutsList;
        setFilteredProducts([...prodcutsList]);
    }, [actCat])

    const handleSearch = (e) => {
        if (e === '') {
            setFilteredProducts([...tempO]);
            setText(e);
            return;
        }
        const lowercasedInput = e.toLowerCase();
        const temp = filteredProducts
            .filter(item => item.name.toLowerCase().includes(lowercasedInput))
            .sort((a, b) => {
                const indexA = a.name.toLowerCase().indexOf(lowercasedInput);
                const indexB = b.name.toLowerCase().indexOf(lowercasedInput);
                return indexA - indexB;
            });
        setText(e);
        setFilteredProducts([...temp]);
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
            <View style={cart.length > 0 ? { ...styles.productList, marginBottom: 45 } : styles.productList}>
                {filteredProducts.map((item, i) => (<Cards key={i} item={item} />))}
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
        width: '100%',
    }
});
