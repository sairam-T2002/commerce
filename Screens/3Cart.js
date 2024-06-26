import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addItem, removeItem, updateQuantity, updateRQuantity } from '../Redux/Slices/CartSlice';
import { payMethodTriggerAnimation } from '../Redux/Slices/Animations';

const Cart = () => {
    const [total, setTotal] = useState([]);
    const cart = useSelector((state) => state.Cart.items);
    const delCharge = useSelector((state) => state.Cart.deliveryCharge);
    const dispatch = useDispatch();
    const payMethodBool = useSelector((state) => state.Animations.payMethod);
    console.log(cart);
    useEffect(() => {
        setTotal([...cart.map(item => item.price * item.Uquantity)])
    }, [cart])

    const handleQuantity = (action, prd_id, quantity) => {
        console.log(action, prd_id, quantity);
        if (action === '+') {
            dispatch(updateQuantity({ id: prd_id, quantity: quantity + 1 }));
        } else {
            if (quantity === 1) {
                dispatch(removeItem(prd_id));
            } else {
                dispatch(updateQuantity({ id: prd_id, quantity: Math.max(quantity - 1, 0) }));
            }
        }
    };
    const PressOutchangePayment = () => {
        dispatch(payMethodTriggerAnimation(!payMethodBool));
    }
    return (
        <View style={styles.container}>
            {cart.length === 0
                ?
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/Empty_cart.png')} style={styles.logo} />
                    <Text>Empty cart</Text>
                    <View style={styles.addItem}>
                        <Pressable style={styles.addItembtn}>
                            <Text>Add Items</Text>
                        </Pressable>
                    </View>
                </View>
                :
                <View style={styles.subContainer}>
                    <ScrollView style={styles.cartList}>
                        {cart.map((item, i) => (<View key={i} style={styles.product}>
                            <View style={styles.col1}>
                                <Text>{item.name}</Text>
                                <View style={styles.row}>
                                    <Text>{item.Rquantity}   </Text>
                                    <Text>{item.Uquantity} x ₹ {item.price}</Text>
                                </View>
                            </View>
                            <View style={styles.col2}>
                                <View style={styles.quantityContainer}>
                                    <Pressable onPress={() => handleQuantity('+', item.prd_id, item.Uquantity)} style={styles.quantityButton}>
                                        <Text style={{ color: 'black', fontSize: 20 }}>+</Text>
                                    </Pressable>
                                    <TextInput editable={false} keyboardType="numeric" style={styles.quantityInput} value={String(item.Uquantity)} />
                                    <Pressable onPress={() => handleQuantity('-', item.prd_id, item.Uquantity)} style={styles.quantityButton}>
                                        {item.Uquantity > 1 ? <Text style={{ color: 'black', fontSize: 20 }}>-</Text> : <Icon name="trash-2" size={20} color={"#4f4f4f"} />}

                                    </Pressable>
                                </View>
                                <Text>₹ {item.price * item.Uquantity}</Text>
                            </View>
                        </View>))}
                    </ScrollView>
                    <View style={styles.payment}>
                        <View style={styles.charges}>
                            <Text>Sub Total</Text>
                            <Text>₹ {total.reduce((accumulator, currentValue) => {
                                return accumulator + currentValue;
                            }, 0)}</Text>
                        </View>
                        <View style={styles.charges}>
                            <Text>Delivery Charge</Text>
                            <Text>₹ {delCharge}</Text>
                        </View>
                        <View style={styles.proceed}>
                            <Pressable android_ripple={{ color: 'lightblue' }} onPressOut={PressOutchangePayment} style={styles.payMethod}>
                                <Image source={require('../assets/gpay.png')} style={styles.paymethodIcon} />
                                <Text>   Gpay   </Text>
                                <FontAwesome name="caret-up" size={20} color={"#4f4f4f"} />
                            </Pressable>
                            <Pressable android_ripple={{ color: '#dcdcaa' }} style={styles.pay}>
                                <FontAwesome name="money" size={20} color={"#4f4f4f"} />
                                <Text>   Pay ₹ {delCharge + total.reduce((accumulator, currentValue) => {
                                    return accumulator + currentValue;
                                }, 0)}</Text>
                            </Pressable>
                        </View>
                    </View>
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    cartList: {
        flex: 1
    },
    product: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 5
    },
    col1: {
        padding: 10
    },
    col2: {
        padding: 15,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        marginTop: 45,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 5,
        height: 50,
        marginBottom: 10,
        borderRadius: 10
    },
    quantityButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        borderRadius: 5,
    },
    quantityInput: {
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: 6,
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'black'
    },
    payment: {
        flexDirection: 'column',
        width: '100%',
        backgroundColor: 'white',
        padding: 10
    },
    charges: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    proceed: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    pay: {
        backgroundColor: '#e2c08d',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fcc522',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    payMethod: {
        flexDirection: 'row',
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d0d5da',
        backgroundColor: '#d0d5da',
        borderRadius: 10,
        padding: 10,
        marginRight: 15
    },
    paymethodIcon: {
        width: 20,
        height: 20,
        borderRadius: 12,
    }
});

export default Cart;
