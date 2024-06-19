import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';

const Cart = () => {
    const cart = useSelector((state) => state.Cart.items);
    console.log(cart);
    return (
        <View style={styles.container}>
            {cart.length === 0
                ?
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/Empty_cart.png')} style={styles.logo} />
                    <Text>Empty cart</Text>
                </View>
                :
                <View style={styles.subContainer}>
                    <Text>cart</Text>
                </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
    },
    subContainer: {
        flex: 1
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    }
});

export default Cart;
