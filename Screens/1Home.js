import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Pressable, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from '../Components/Carousel';
import Icon from 'react-native-vector-icons/Feather';
import { decrement, increment } from '../Redux/Slices/CartSlice';
import { useState } from 'react';

const Imgdata = [
    `https://blog.fnp.com/wp-content/uploads/2021/08/birthday-cakes.jpg`,
    `https://i7.fnp.com/images/pr/l/v20210325114240/chocolaty-truffle-cake-half-kg_1.jpg`
];

const Featureddata = [
    { name: 'Item1', price: 60, description: 'Freshly baked', image: 'https://www.ndtv.com/cooks/images/bread%20%281%29.jpg' },
    { name: 'Item1', price: 60, description: 'Freshly baked', image: 'https://www.ndtv.com/cooks/images/bread%20%281%29.jpg' },
    { name: 'Item1', price: 60, description: 'Freshly baked', image: 'https://www.ndtv.com/cooks/images/bread%20%281%29.jpg' },
    { name: 'Item1', price: 60, description: 'Freshly baked', image: 'https://www.ndtv.com/cooks/images/bread%20%281%29.jpg' },
]

const catlog = [
    { name: 'Item1' },
    { name: 'Item2' },
    { name: 'Item3' },
    { name: 'Item4' },
    { name: 'Item5' },
    { name: 'Item6' },
    { name: 'Item7' },
    { name: 'Item8' },
    { name: 'Item9' },
    { name: 'Item10' },
];

function Cards({ item }) {
    const [quantity, setQuantity] = useState(0);
    const handleCart = () => {
        setQuantity(1);
    }
    const handleQuantity = (action) => {
        if (action === '+') {
            setQuantity(quan => quan + 1);
        } else {
            setQuantity(quan => quan - 1);
        }
    }

    return (<View style={styles.cards}>
        <View>
            <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
            <Text style={{ fontSize: 20 }}>{item.name}</Text>
            <Text style={{ marginTop: 10 }}>Price: ₹{item.price}</Text>
            <Text style={{ marginTop: 10 }}>{item.description}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, marginRight: 15 }}>
                {quantity === 0 ? <Pressable onPress={handleCart} style={{ backgroundColor: 'green', padding: 5 }}>
                    <Text style={{ color: 'white' }}>Add to Cart</Text>
                </Pressable> :
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Pressable onPress={() => handleQuantity('+')} style={{ alignItems: 'center', justifyContent: 'center', width: 30, backgroundColor: 'green', padding: 2, borderRadius: 5 }}>
                            <Text style={{ color: 'white' }}>+</Text>
                        </Pressable>
                        <TextInput keyboardType="numeric" style={{ textAlign: 'center', fontSize: 16, padding: 10 }}>{quantity}</TextInput>
                        <Pressable onPress={() => handleQuantity('-')} style={{ alignItems: 'center', justifyContent: 'center', width: 30, backgroundColor: 'red', padding: 2, borderRadius: 5 }}>
                            <Text style={{ color: 'white' }}>-</Text>
                        </Pressable>
                    </View>}
            </View>
        </View>
    </View>);
}

export default function Home() {
    const count = useSelector((state) => state.CartCount.count);
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <View style={styles.section1}>
                <Carousel isImage={true} data={Imgdata} />
            </View>
            <View style={styles.section2}>
                <View style={styles.headerContainer}>
                    <Icon name="grid" size={20} color={"#b8095a"} />
                    <Text style={styles.header}>Catalog</Text>
                </View>
                <View style={styles.catlogcontainer}>
                    {catlog.map((item, index) => (
                        <View key={index} style={styles.catlogItem}>
                            <View style={styles.circle}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                                <Text>{item.name}</Text>
                                <View style={{ backgroundColor: '#d75311', borderRadius: 20, height: 20, width: 25, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon name="arrow-right" size={15} color={"#ffffff"} />
                                </View>
                                {/* <Text>{"->"}</Text> */}
                            </View>

                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.section3}>
                <View style={styles.headerContainer}>
                    <Icon name="star" size={20} color={"#b8095a"} />
                    <Text style={styles.header}>Featured</Text>
                </View>
                <Carousel isImage={false} data={Featureddata.map(item => (<Cards item={item} />))} />
                {/* <Cards item={Featureddata[0]} /> */}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcf1d2'
    },
    section1: {
        height: 250,
        width: '100%',
        padding: 10
    },
    section2: {
        flexDirection: 'column'
    },
    section3: {
        flexDirection: 'column',
        height: 200,
        width: '100%',
        padding: 10
    },
    item: {
        backgroundColor: 'lightblue',
        borderRadius: 5,
        height: 200,
        padding: 20,
        marginLeft: 25,
        marginRight: 25,
    },
    header: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    headerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    catlogcontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    catlogItem: {
        width: '48%',
        height: 80, // Adjust the height as needed
        backgroundColor: 'lightgray',
        padding: 10,
        marginVertical: 5,
        marginTop: 43,
        borderRadius: 5,
        position: 'relative', // Ensure positioning context for the circle
    },
    circle: {
        position: 'absolute',
        top: -40, // Move the circle 50% above the catlogItem
        marginHorizontal: '30%',
        width: 80,
        height: 80,
        backgroundColor: 'cyan',
        borderRadius: 40,
    },
    cards: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 10,
        margin: 5
    }
});
