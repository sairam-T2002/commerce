// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Pressable, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { nav } from './Redux/Slices/ActiveScreen';
import Home from './Screens/1Home';
import Search from './Screens/2Search';
import Cart from './Screens/3Cart';
import Profile from './Screens/4Profile';

export default function Main() {
    const [text, setText] = useState('');
    const screen = useSelector((state) => state.ActiveScreen.ActiveScreen);
    const dispatch = useDispatch();

    const handleNavigation = (navigation) => {
        if (navigation !== screen) {
            dispatch(nav(navigation));
        }
    };

    const renderScreen = () => {
        switch (screen) {
            case 'Home':
                return <Home />;
            case 'Search':
                return <Search />;
            case 'Cart':
                return <Cart />;
            case 'Profile':
                return <Profile />;
            default:
                return <Home />;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor={screen === 'Home' ? 'lightgray' : 'lightgray'}
                barStyle="light-content"
            />
            <View style={styles.topView}>
                {screen === "Search" ? <>
                    <View style={styles.searchContainer}>
                        <Icon name="search" size={20} color={"#4f4f4f"} />
                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            value={text}
                            onChangeText={setText}
                        />
                    </View>
                </> : <>
                    <Pressable style={{ padding: 5, margin: 5 }}>
                        <Icon name="menu" size={30} color={"#4f4f4f"} />
                    </Pressable>
                    <View style={{ flex: 1 }}></View>
                    <Pressable style={{ padding: 5, margin: 5 }}>
                        <Icon name="bell" size={30} color={"#4f4f4f"} />
                    </Pressable>
                </>}
            </View>
            <View style={styles.middleView}>
                <ScrollView>
                    {renderScreen()}
                </ScrollView>
            </View>
            <View style={styles.bottomView}>
                <Pressable style={styles.nav} onPress={() => handleNavigation("Home")}>
                    <Icon name="home" size={30} color={screen === "Home" ? "#c39178" : "#4f4f4f"} />
                </Pressable>
                <Pressable style={styles.nav} onPress={() => handleNavigation("Search")}>
                    <Icon name="search" size={30} color={screen === "Search" ? "#c39178" : "#4f4f4f"} />
                </Pressable>
                <Pressable style={styles.nav} onPress={() => handleNavigation("Cart")}>
                    <Icon name="shopping-cart" size={30} color={screen === "Cart" ? "#c39178" : "#4f4f4f"} />
                </Pressable>
                <Pressable style={styles.nav} onPress={() => handleNavigation("Profile")}>
                    <Icon name="user" size={30} color={screen === "Profile" ? "#c39178" : "#4f4f4f"} />
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topView: {
        flex: 0,
        flexDirection: 'row',
        height: 50, // Adjust the height as needed
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleView: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomView: {
        flex: 0,
        flexDirection: 'row',
        height: 50, // Adjust the height as needed
        backgroundColor: 'lightgray',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nav: {
        padding: 5,
        margin: 5
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        marginHorizontal: 15,
        overflow: 'hidden',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        width: '100%'
    },
});
