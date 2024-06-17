import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Cart = () => {
    return (
        <View style={styles.container}>
            <Text>Cart</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Cart;
