import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable, Modal, TextInput, Alert, ActivityIndicator, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../Redux/Slices/CartSlice';
import { UserDataHelper } from '../LocalStorage';
import { MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { colorScheme } from '../data';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

export default function Profile() {
    // const count = useSelector((state) => state.CartCount.count);
    // const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [modal, setModal] = useState(false);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        async function methodT() {
            const temp = await UserDataHelper.getUserData("user_info_cred") || null;
            console.log(temp, "from profile");
            setUser(temp);
            setLoader(false);
        }
        methodT();
    }, []);

    const handleLogin = () => {
        setModal(true);
    }

    const handleLogout = async () => {
        await UserDataHelper.deleteUserData("user_info_cred");
        setUser(null);
        setUsername('');
        setPassword('');
    }

    const validateInputs = () => {
        if (!username.trim()) {
            Alert.alert('Username Error', 'Username cannot be empty.');
            usernameRef.current?.focus();
            return false;
        }
        if (username.length < 3) {
            Alert.alert('Username Error', 'Username must be at least 3 characters long.');
            usernameRef.current?.focus();
            return false;
        }
        if (!password.trim()) {
            Alert.alert('Password Error', 'Password cannot be empty.');
            passwordRef.current?.focus();
            return false;
        }
        if (password.length < 6) {
            Alert.alert('Password Error', 'Password must be at least 6 characters long.');
            passwordRef.current?.focus();
            return false;
        }
        return true;
    };

    const LoginPressed = async () => {
        console.log("Login pressed");
        if (validateInputs()) {
            setUser({ username, password });
            await UserDataHelper.storeUserData("user_info_cred", { username, password });
            setModal(false);
        }
    }

    const SignupPressed = () => {
        console.log("Register as a new customer");
    }

    return (
        <View style={{ flex: 1 }}>
            {loader ? (
                <ActivityIndicator size="large" color="gray" />
            ) : (
                user === null || user === undefined ? (
                    <View style={styles.Login}>
                        <Pressable style={styles.LoginBtn} onPress={handleLogin}>
                            <Text style={{ color: 'white' }}>Login</Text>
                        </Pressable>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <View style={styles.profileBackground}>
                            <View style={styles.profile}>
                                <Image source={require('../assets/user.png')} style={styles.user} />
                            </View>
                            <View style={styles.userInfo}>
                                <Text style={{ fontWeight: 'bold' }}>{user.username}</Text>
                                <Text>9361771979</Text>
                            </View>
                        </View>
                        <View style={[styles.profileOption, { marginTop: 20 }]}>
                            <MaterialIcons name="menu-book" size={30} color={colorScheme.navigationIcons} />
                            <Text>  Orders</Text>
                        </View>
                        <View style={styles.profileOption}>
                            <MaterialIcons name="headset-mic" size={30} color={colorScheme.navigationIcons} />
                            <Text>  Help center</Text>
                        </View>
                        <View style={styles.profileOption}>
                            <MaterialIcons name="wallet" size={30} color={colorScheme.navigationIcons} />
                            <Text>  Wallet</Text>
                        </View>
                        <View style={styles.profileOption}>
                            <MaterialIcons name="location-on" size={30} color={colorScheme.navigationIcons} />
                            <Text>  Addresses</Text>
                        </View>
                        <View style={styles.footerActions}>
                            <Text>FAQs</Text>
                            <Text>About Us</Text>
                            <Text>Privacy Policy</Text>
                            <Text>Terms & Conditions</Text>
                            <Pressable onPress={handleLogout}>
                                <Text>Logout</Text>
                            </Pressable>
                        </View>
                    </View>
                )
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(false);
                }}
            >
                <View style={styles.centeredView}>
                    <Text>Username<Text style={{ color: 'red' }}>*</Text></Text>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        ref={usernameRef}
                        autoFocus={true}
                        style={[styles.inptcon, usernameRef.current?.isFocused() && { borderColor: '#7cdcfe' }]}
                    />
                    <Text>Password<Text style={{ color: 'red' }}>*</Text></Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        ref={passwordRef}
                        secureTextEntry={true}
                        style={[styles.inptcon, passwordRef.current?.isFocused() && { borderColor: '#7cdcfe' }]}
                    />
                    <View style={styles.modalBtns}>
                        <Pressable style={styles.LoginBtnModal} onPress={LoginPressed}>
                            <Text>Login</Text>
                        </Pressable>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Don't have a account? </Text>
                            <Pressable onPress={SignupPressed}>
                                <Text style={styles.signup}>Signup</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: ScreenWidth,
        alignItems: 'center',
        padding: 10
    },
    Login: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    LoginBtn: {
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 10,

    },
    centeredView: {
        flex: 1,
        width: ScreenWidth,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 5
    },
    inptcon: {
        padding: 2,
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 5
    },
    modalBtns: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'row'
    },
    LoginBtnModal: {
        padding: 2,
        backgroundColor: '#d7d7be',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 30,
        marginHorizontal: 5
    },
    profileBackground: {
        backgroundColor: '#cccccc',
        width: ScreenWidth - 15,
        height: 100
    },
    user: {
        height: 80,
        width: 80,
    },
    profile: {
        backgroundColor: 'white',
        position: 'absolute',
        marginTop: 30,
        marginLeft: 30
    },
    profileOption: {
        width: ScreenWidth - 10,
        height: 50,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: 3,
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 30,
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerActions: {
        backgroundColor: 'white',
        marginTop: 5,
        width: ScreenWidth - 20,
        flex: 1,
        padding: 10,
        justifyContent: 'space-between'
    },
    userInfo: {
        position: 'absolute',
        marginTop: 60,
        marginLeft: 120,
    },
    signup: {
        textDecorationLine: 'underline',
        color: '#0078d4'
    }
});
