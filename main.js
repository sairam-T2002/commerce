import React, { useState, useRef, Suspense } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ScrollView, Animated } from 'react-native';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { nav } from './Redux/Slices/ActiveScreen';
import Home from './Screens/1Home';
import Search from './Screens/2Search';
import Cart from './Screens/3Cart';
import Profile from './Screens/4Profile';

export default function Main() {
    const [text, setText] = useState('');
    const [menu, setMenu] = useState(false);
    const screen = useSelector((state) => state.ActiveScreen.ActiveScreen);
    const dispatch = useDispatch();
    const menuAnimation = useRef(new Animated.Value(0)).current;

    const handleNavigation = (navigation) => {
        if (navigation !== screen) {
            dispatch(nav(navigation));
        }
    };

    const handleMenuPress = () => {
        // console.log("menu pressed");
        setMenu(men => !men);
        Animated.timing(
            menuAnimation,
            {
                toValue: menu ? 0 : 1, // Slide menu in or out based on its current state
                duration: 100, // Animation duration in milliseconds
                useNativeDriver: true, // Use native driver for better performance
            }
        ).start();
    };
    const overlayClick = () => {
        setMenu(false);
        Animated.timing(
            menuAnimation,
            {
                toValue: menu ? 0 : 1,
                duration: 100,
                useNativeDriver: true,
            }
        ).start();
    }

    const handleGesture = event => {
        const { translationX, translationY } = event.nativeEvent;
        if (Math.abs(translationX) > Math.abs(translationY)) {
            // Horizontal swipe
            // if (translationX > 0) {
            //     // Right swipe
            //     const nextScreen = getNextScreen("right");
            //     dispatch(nav(nextScreen));
            // } else {
            //     // Left swipe
            //     const nextScreen = getNextScreen("left");
            //     dispatch(nav(nextScreen));
            // }
        }
    };

    const getNextScreen = direction => {
        switch (screen) {
            case 'Home':
                return direction === "right" ? 'Search' : 'Profile';
            case 'Search':
                return direction === "right" ? 'Cart' : 'Home';
            case 'Cart':
                return direction === "right" ? 'Profile' : 'Search';
            case 'Profile':
                return direction === "right" ? 'Home' : 'Cart';
            default:
                return 'Home';
        }
    };

    const handleStateChange = event => {
        if (event.nativeEvent.state === State.END) {
            const { translationX, translationY } = event.nativeEvent;
            if (Math.abs(translationX) > Math.abs(translationY)) {
                // Horizontal swipe
                if (translationX < 0) {
                    // Right swipe
                    const nextScreen = getNextScreen("right");
                    dispatch(nav(nextScreen));
                } else {
                    // Left swipe
                    const nextScreen = getNextScreen("left");
                    dispatch(nav(nextScreen));
                }
            }
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
            <View style={styles.topView}>
                {screen === "Search" ? (
                    <View style={styles.searchContainer}>
                        <Icon name="search" size={20} color={"#4f4f4f"} />
                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            value={text}
                            onChangeText={setText}
                        />
                    </View>
                ) : (
                    <>
                        <Pressable onPress={handleMenuPress} style={{ padding: 5, margin: 5 }}>
                            <AntDesign name="menuunfold" size={30} color="#4f4f4f" />
                        </Pressable>
                        <View style={{ flex: 1 }}></View>
                        <Pressable style={{ padding: 5, margin: 5 }}>
                            <Icon name="bell" size={30} color={"#4f4f4f"} />
                        </Pressable>
                    </>
                )}
            </View>
            <View style={styles.middleView}>
                <GestureHandlerRootView style={styles.container}>
                    <PanGestureHandler
                        onGestureEvent={handleGesture}
                        onHandlerStateChange={handleStateChange}>
                        <ScrollView>
                            {renderScreen()}
                        </ScrollView>
                    </PanGestureHandler>
                </GestureHandlerRootView >
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
            <Animated.View style={[styles.menu, { transform: [{ translateX: menuAnimation.interpolate({ inputRange: [0, 1], outputRange: [-200, 0] }) }] }]}>
                <View style={styles.menuIcon}>
                    <Text>Menu</Text>
                    <Pressable onPress={handleMenuPress} style={{ padding: 5, margin: 5 }}>
                        <AntDesign name="menufold" size={30} color="#4f4f4f" />
                    </Pressable>
                </View>
            </Animated.View>
            {menu && <Pressable onPress={overlayClick} style={styles.overlay}></Pressable>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
    topView: {
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
        alignItems: 'center',
        paddingHorizontal: 10
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        width: '100%'
    },
    menu: {
        position: 'absolute',
        height: '100%',
        flexDirection: 'column',
        width: 200,
        backgroundColor: '#ffffff',
        elevation: 10,
        zIndex: 2,
    },
    menuIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'lightgray'
    },
});
