import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable, TextInput, Alert } from 'react-native';
import { UserDataHelper } from '../LocalStorage';
import { fetchApiPOST } from '../ApiManager';
import { useNavigation } from '@react-navigation/native';

const ScreenWidth = Dimensions.get('window').width;

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigation = useNavigation(); // Get navigation object

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
        if (validateInputs()) {
            const response = await fetchApiPOST('api/Auth/Login', { username, password }, true);
            if (response.status === 401) {
                console.log(response, 'unauthorized');
                return;
            }
            if (response.ok) {
                const data = await response.json();
                console.log(data, 'login response');
                const userData = { username, accessToken: data.AccessToken, refreshToken: data.RefreshToken };
                await UserDataHelper.storeUserData("user_info_cred", userData);
                navigation.navigate('App'); // Navigate to the main app screen
            }
        }
    };

    const SignupPressed = () => {
        console.log("Register as a new customer");
    };

    return (
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
    );
}

const styles = StyleSheet.create({
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
    signup: {
        textDecorationLine: 'underline',
        color: '#0078d4'
    }
});
