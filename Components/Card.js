import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity, updateRQuantity } from '../Redux/Slices/CartSlice';
import Icon from 'react-native-vector-icons/Feather';

export default function Cards({ item, resetTimer }) {
    // console.log(item);
    const [quantity, setQuantity] = useState(0);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(item.qunatityList[0]);
    const [items, setItems] = useState(item.qunatityList.map(ex => ({ label: ex, value: ex })));
    const [priceI, setPriceI] = useState(0);
    const cart = useSelector((state) => state.Cart.items);
    const dispatch = useDispatch();

    useEffect(() => {
        const cardprd = cart.find(ex => ex.prd_id === item.prd_id);
        if (cardprd) {
            setQuantity(cardprd.Uquantity);
            setValue(cardprd.Rquantity);
            setPriceI(item.qunatityList.indexOf(cardprd.Rquantity));
        } else {
            setQuantity(0);
            setPriceI(0);
        }
    }, [cart, item.prd_id, item.qunatityList]);

    const handleCart = () => {
        setQuantity(1);
        dispatch(addItem({ prd_id: item.prd_id, Uquantity: 1, Rquantity: value, price: item.price[priceI] }));
        if (resetTimer && typeof resetTimer === 'function') {
            resetTimer();
        }
    };

    const handleQuantity = (action) => {
        if (action === '+') {
            dispatch(updateQuantity({ id: item.prd_id, quantity: quantity + 1 }));
            setQuantity((quan) => quan + 1);
        } else {
            if (quantity === 1) {
                dispatch(removeItem(item.prd_id));
            }
            dispatch(updateQuantity({ id: item.prd_id, quantity: Math.max(quantity - 1, 0) }));
            setQuantity((quan) => Math.max(quan - 1, 0));
        }
        if (resetTimer && typeof resetTimer === 'function') {
            resetTimer();
        }
    };

    const handleDropDown = () => {
        setOpen(op => !op);
        if (resetTimer && typeof resetTimer === 'function') {
            resetTimer();
        }
    };

    const handleDropDownSelect = (event) => {
        setValue(event());
        setPriceI(item.qunatityList.indexOf(event()));
        dispatch(updateRQuantity({ id: item.prd_id, quantity: event(), price: item.price[item.qunatityList.indexOf(event())] }));
        if (resetTimer && typeof resetTimer === 'function') {
            resetTimer();
        }
    };

    return (
        <View style={styles.cards}>
            <View>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={{ flexDirection: 'column', flex: 1, width: '100%', marginLeft: 5 }}>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
                <Text style={{ marginTop: 35 }}>Price: ₹{item.price[priceI]}</Text>
                <View style={styles.controlsContainer}>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={handleDropDown}
                        setValue={handleDropDownSelect}
                        setItems={setItems}
                        containerStyle={styles.dropdownContainer}
                        style={styles.dropdown}
                        dropDownContainerStyle={{ ...styles.dropdownBox, height: item.qunatityList.length * 45 }}
                        placeholder="Qty"
                        placeholderStyle={styles.placeholderStyle}
                        dropDownDirection="TOP"
                    />
                    {quantity === 0 ? (
                        <Pressable onPress={handleCart} style={styles.addToCartButton}>
                            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                        </Pressable>
                    ) : (
                        <View style={styles.quantityContainer}>
                            <Pressable onPress={() => handleQuantity('+')} style={styles.quantityButton}>
                                <Text style={{ color: 'black', fontSize: 20 }}>+</Text>
                            </Pressable>
                            <TextInput editable={false} keyboardType="numeric" style={styles.quantityInput} value={String(quantity)} />
                            <Pressable onPress={() => handleQuantity('-')} style={styles.quantityButton}>
                                {quantity > 1 ? <Text style={{ color: 'black', fontSize: 20 }}>-</Text> : <Icon name="trash-2" size={20} color={"#4f4f4f"} />}

                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cards: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 120,
        height: 140,
        borderRadius: 10,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: -5,
        marginRight: 30,
        height: 50,
    },
    quantityButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        borderRadius: 5,
    },
    dropdownContainer: {
        width: 100,
        marginRight: 8,
        marginLeft: 2,
        height: 60,
    },
    dropdown: {
        backgroundColor: '#fafafa',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        height: 30,
    },
    dropdownBox: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        height: 45,
    },
    placeholderStyle: {},
    addToCartButton: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        height: 47,
        marginBottom: 8,
    },
    addToCartButtonText: {
        color: 'white',
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
});
