import { StyleSheet, Text, View, Button, Image, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Cards({ item, resetTimer }) {
    const [quantity, setQuantity] = useState(0);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    const handleCart = () => {
        setQuantity(1);
        resetTimer();
    };

    const handleQuantity = (action) => {
        if (action === '+') {
            setQuantity((quan) => quan + 1);
        } else {
            setQuantity((quan) => Math.max(quan - 1, 0));
        }
        resetTimer();
    };

    return (
        <View style={styles.cards}>
            <View>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
                <Text style={{ marginTop: 10 }}>Price: ₹{item.price}</Text>
                <Text style={{ marginTop: 10 }}>{item.description}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, marginRight: 30 }}>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        containerStyle={styles.dropdown}
                    />
                    {quantity === 0 ? (
                        <Pressable onPress={handleCart} style={{ backgroundColor: 'green', padding: 5 }}>
                            <Text style={{ color: 'white' }}>Add to Cart</Text>
                        </Pressable>
                    ) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Pressable onPress={() => handleQuantity('+')} style={styles.quantityButton}>
                                <Text style={{ color: 'white' }}>+</Text>
                            </Pressable>
                            <TextInput keyboardType="numeric" style={{ textAlign: 'center', fontSize: 16, padding: 10 }}>{quantity}</TextInput>
                            <Pressable onPress={() => handleQuantity('-')} style={styles.quantityButton}>
                                <Text style={{ color: 'white' }}>-</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // cards: {
    //     // flex: 1,
    //     width: 'auto',
    //     height: 'auto',
    //     flexDirection: 'row',
    //     backgroundColor: 'white',
    //     borderRadius: 10,
    //     marginTop: 10,
    // },
    // image: {
    //     width: 140,
    //     height: 140,
    //     borderRadius: 10,
    //     margin: 5
    // },
    cards: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 10,
        margin: 5,
    },
    quantityButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        backgroundColor: 'green',
        padding: 2,
        borderRadius: 5,
    },
    dropdown: {
        width: 100
    }
});