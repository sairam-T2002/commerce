import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { nav } from './Redux/Slices/ActiveScreen';
import { actNav } from './Redux/Slices/CatlogNav';
import Home from './Screens/1Home';
import Search from './Screens/2Search';
import Cart from './Screens/3Cart';
import Profile from './Screens/4Profile';
import { catlog } from './data';

export default function Main() {
    const fullCatlog = [{ name: 'All' }, ...catlog];
    const scrollViewRef = useRef(null);
    const [menu, setMenu] = useState(false);
    const screen = useSelector((state) => state.ActiveScreen.ActiveScreen);
    const actCat = useSelector((state) => state.ActCatlog.actNav);
    const dispatch = useDispatch();
    const menuAnimation = useRef(new Animated.Value(0)).current;

    const handleNavigation = (navigation) => {
        if (navigation !== screen) {
            dispatch(nav(navigation));
            dispatch(actNav("All"));
        }
    };

    const handleMenuPress = () => {
        setMenu(men => !men);
        Animated.timing(
            menuAnimation,
            {
                toValue: menu ? 0 : 1,
                duration: 100,
                useNativeDriver: true,
            }
        ).start();
    };
    const scrollViewtoUst = (name) => {
        const index = fullCatlog.findIndex(item => item.name === name);
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: index * 90, animated: true });
        }
    }
    useEffect(() => {
        scrollViewtoUst(actCat);
    }, [actCat])
    const handleCatNavPress = (name) => {
        if (name !== actCat) {
            dispatch(actNav(name));
        }
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
    };

    const renderScreen = () => {
        switch (screen) {
            case 'Home':
                return <Home scrollRef={scrollViewRef} fullCatlog={fullCatlog} />;
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
                    <ScrollView ref={scrollViewRef} showsHorizontalScrollIndicator={false} horizontal={true} style={styles.catlogNavigator}>
                        {fullCatlog.map((item, index) => (<Pressable key={index} onPress={() => handleCatNavPress(item.name)} style={actCat === item.name ? { ...styles.catNav, backgroundColor: 'white' } : styles.catNav}><Text>{item.name}</Text></Pressable>))}
                    </ScrollView>
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
        height: 50,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleView: {
        flex: 1,
        backgroundColor: '#fcf1d2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomView: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: 'lightgray',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nav: {
        padding: 5,
        margin: 5
    },
    catlogNavigator: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    catNav: {
        marginHorizontal: 10,
        padding: 5,
        paddingHorizontal: 15,
        height: 30,
        width: 70,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
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