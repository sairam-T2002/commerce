import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable, Modal, TextInput, Alert, ActivityIndicator, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { UserDataHelper } from '../LocalStorage';
import { colorScheme } from '../data';
import Login from '../Components/Login';

const ScreenWidth = Dimensions.get('window').width;

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            const temp = await UserDataHelper.getUserData("user_info_cred") || null;
            setUser(temp);
            setLoader(false);
        }
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await UserDataHelper.deleteUserData("user_info_cred");
        setUser(null);
    }

    const handleLogin = () => {
        setModalVisible(true);
    }

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setModalVisible(false);
    }

    return (
        <View style={{ flex: 1 }}>
            {loader ? (
                <ActivityIndicator size="large" color="gray" />
            ) : (
                user === null ? (
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
            <Login
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onLoginSuccess={handleLoginSuccess}
            />
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
    }
});