import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import Cards from '../Components/Card';
import { products } from '../data';

const BannerWidth = Dimensions.get('window').width;

let tempO = [];

export default function Search() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [text, setText] = useState('');
    const actCat = useSelector((state) => state.ActCatlog.actNav);
    const cart = useSelector((state) => state.Cart.items);
    const [isLoading, setIsLoading] = useState(true);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        let prodcutsList = [];
        if (actCat === 'All') {
            for (let key in products) {
                prodcutsList = [...prodcutsList, ...products[key]];
            }
        } else {
            prodcutsList = products[actCat];
        }
        tempO = prodcutsList;
        setFilteredProducts([...prodcutsList]);
        setIsLoading(false);
    }, [actCat]);

    const handleSearch = (e) => {
        if (e === '') {
            setFilteredProducts([...tempO]);
            setText(e);
            return;
        }
        const lowercasedInput = e.toLowerCase();
        const temp = tempO
            .filter(item => item.name.toLowerCase().includes(lowercasedInput))
            .sort((a, b) => {
                const indexA = a.name.toLowerCase().indexOf(lowercasedInput);
                const indexB = b.name.toLowerCase().indexOf(lowercasedInput);
                return indexA - indexB;
            });
        setText(e);
        setFilteredProducts([...temp]);
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="gray" />
            ) : (
                <>
                    <View style={[styles.searchContainer, styles.elevation]}>
                        <Icon name="search" size={20} color={"#4f4f4f"} />
                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            value={text}
                            onChangeText={handleSearch}
                        />
                    </View>
                    <ScrollView ref={scrollViewRef} contentContainerStyle={cart.length > 0 ? { ...styles.productList, paddingBottom: 45 } : styles.productList}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item, i) => (
                                <Cards key={i} item={item} />
                            ))
                        ) : (
                            <View style={styles.noProducts}>
                                <Text>No Products</Text>
                            </View>
                        )}
                    </ScrollView>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcf1d2',
        padding: 10
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        width: '100%'
    },
    productList: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10, // Add some padding at the bottom
    },
    noProducts: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    elevation: {
        elevation: 200,
        shadowColor: 'black',
    },
});
