import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Animated, ActivityIndicator, BackHandler, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { nav, setLoading, navBack } from './Redux/Slices/ActiveScreen';
import { payMethodTriggerAnimation } from './Redux/Slices/Animations';
import { actNav } from './Redux/Slices/CatlogNav';
import Home from './Screens/1Home';
import Search from './Screens/2Search';
import Cart from './Screens/3Cart';
import Profile from './Screens/4Profile';
import { catlog, colorScheme } from './data';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

export default function Main() {
    const fullCatlog = [{ name: 'All' }, ...catlog];
    const scrollViewRef = useRef(null);
    const [menu, setMenu] = useState(false);
    const [notification, setNotification] = useState(false);
    const screen = useSelector((state) => state.ActiveScreen.ActiveScreen);
    const isLoading = useSelector((state) => state.ActiveScreen.isLoading);
    const navigator = useSelector((state) => state.ActiveScreen.navigator);
    const actCat = useSelector((state) => state.ActCatlog.actNav);
    const cart = useSelector((state) => state.Cart.items);
    const payMethodBool = useSelector((state) => state.Animations.payMethod);
    const dispatch = useDispatch();
    const menuAnimation = useRef(new Animated.Value(0)).current;
    const notificationAnimation = useRef(new Animated.Value(0)).current;
    const payMethodAnimation = useRef(new Animated.Value(0)).current;

    const { homeScale, searchScale, cartScale, profileScale } = useRef({ homeScale: new Animated.Value(1), searchScale: new Animated.Value(1), cartScale: new Animated.Value(1), profileScale: new Animated.Value(1) }).current;

    const handleNavigation = (navigation) => {
        if (navigation !== screen) {
            dispatch(setLoading(true));
            dispatch(nav(navigation));
            dispatch(actNav("All"));
            setTimeout(() => {
                dispatch(setLoading(false));
            }, 5);
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
    const handleNotificationPress = () => {
        setNotification(not => !not);
        Animated.timing(
            notificationAnimation,
            {
                toValue: notification ? 0 : 1,
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
    };

    useEffect(() => {
        scrollViewtoUst(actCat);
    }, [actCat]);

    useEffect(() => {
        const backAction = () => {
            if (navigator.length > 1) {
                dispatch(navBack());
                return true;
            }
            return false;
        };

        // dispatch(setPayMethodAnimation(payMethodAnimation));

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [navigator]);

    useEffect(() => {
        console.log('payment animation');
        Animated.timing(
            payMethodAnimation,
            {
                toValue: payMethodBool ? 0 : 1,
                duration: 100,
                useNativeDriver: true,
            }
        ).start();

    }, [payMethodBool])

    const handleCatNavPress = (name) => {
        if (name !== actCat) {
            dispatch(actNav(name));
        }
    };

    const overlayClick = () => {
        if (menu) {
            setMenu(false);
            Animated.timing(
                menuAnimation,
                {
                    toValue: menu ? 0 : 1,
                    duration: 100,
                    useNativeDriver: true,
                }
            ).start();
        } else if (notification) {
            setNotification(false);
            Animated.timing(
                notificationAnimation,
                {
                    toValue: notification ? 0 : 1,
                    duration: 100,
                    useNativeDriver: true,
                }
            ).start();
        } else if (payMethodBool) {
            dispatch(payMethodTriggerAnimation(false));
            Animated.timing(
                payMethodAnimation,
                {
                    toValue: payMethodBool ? 0 : 1,
                    duration: 100,
                    useNativeDriver: true,
                }
            ).start();
        }

    };

    const handleCheckOut = () => {
        handleNavigation("Cart");
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

    const handleNavigationPress = async (screen, scaleValue) => {

        await new Promise(resolve => {
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 0.75,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true,
                })
            ]).start(resolve);
        });

        // Animation has completed, now navigate
        handleNavigation(screen);
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topView}>
                {screen === "Search" ? (
                    <ScrollView ref={scrollViewRef} showsHorizontalScrollIndicator={false} horizontal={true} style={styles.catlogNavigator}>
                        {fullCatlog.map((item, index) => (
                            <Pressable key={index} onPress={() => handleCatNavPress(item.name)} style={actCat === item.name ? { ...styles.catNav, backgroundColor: colorScheme.activeCat } : styles.catNav}>
                                <Text>{item.name}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                ) : (
                    <>
                        <Pressable onPress={handleMenuPress} style={{ padding: 5, margin: 5 }}>
                            <AntDesign name="menuunfold" size={30} color={colorScheme.navigationIcons} />
                        </Pressable>
                        <View style={{ flex: 1 }}></View>
                        <Pressable onPress={handleNotificationPress} style={{ padding: 5, margin: 5 }}>
                            <Icon name="bell" size={30} color={colorScheme.navigationIcons} />
                        </Pressable>
                    </>
                )}
            </View>
            <View style={styles.middleView}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="gray" />
                ) : (
                    <View>
                        {renderScreen()}
                    </View>
                )}
            </View>
            <View style={styles.bottomView}>
                <Pressable style={styles.nav} onPress={() => handleNavigationPress("Home", homeScale)}><Animated.View style={{ transform: [{ scale: homeScale }] }}>
                    <Icon name="home" size={30} color={screen === "Home" ? colorScheme.navigationActive : colorScheme.navigationIcons} />
                </Animated.View>
                </Pressable>
                <Pressable style={styles.nav} onPress={() => handleNavigationPress("Search", searchScale)}>
                    <Animated.View style={{ transform: [{ scale: searchScale }] }}>
                        <Icon name="search" size={30} color={screen === "Search" ? colorScheme.navigationActive : colorScheme.navigationIcons} />
                    </Animated.View>
                </Pressable>
                <Pressable style={styles.nav} onPress={() => handleNavigationPress("Cart", cartScale)}>
                    <Animated.View style={{ position: 'relative', transform: [{ scale: cartScale }] }}>
                        <Icon name="shopping-cart" size={30} color={screen === "Cart" ? colorScheme.navigationActive : colorScheme.navigationIcons} />
                        {screen !== "Cart" && cart.length > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cart.length}</Text>
                            </View>
                        )}
                    </Animated.View>
                </Pressable>
                <Pressable style={styles.nav} onPress={() => handleNavigationPress("Profile", profileScale)}>
                    <Animated.View style={{ transform: [{ scale: profileScale }] }}>
                        <Icon name="user" size={30} color={screen === "Profile" ? colorScheme.navigationActive : colorScheme.navigationIcons} />
                    </Animated.View>
                </Pressable>
            </View>
            <Animated.View style={[styles.menu, { transform: [{ translateX: menuAnimation.interpolate({ inputRange: [0, 1], outputRange: [-80 * ScreenWidth / 100, 0] }) }] }]}>
                <View style={styles.menuIcon}>
                    <Text>Menu</Text>
                    <Pressable onPress={handleMenuPress} style={{ padding: 5, margin: 5 }}>
                        <AntDesign name="menufold" size={30} color={colorScheme.navigationIcons} />
                    </Pressable>
                </View>
            </Animated.View>
            <Animated.View style={[styles.notification, { transform: [{ translateX: notificationAnimation.interpolate({ inputRange: [0, 1], outputRange: [80 * ScreenWidth / 100, 0] }) }] }]}>
                <View style={styles.notificationIcon}>
                    <Pressable onPress={handleNotificationPress} style={{ padding: 5, margin: 5 }}>
                        <Icon name="bell" size={30} color={colorScheme.navigationIcons} />
                    </Pressable>
                    <Text>Notification</Text>
                </View>
            </Animated.View>
            <Animated.View style={[styles.payMethod, { transform: [{ translateY: payMethodAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, 80 * ScreenHeight / 100] }) }] }]}>
                <Text>Payment methods</Text>
            </Animated.View>
            {screen === "Search" && cart.length > 0 && (
                <View style={styles.checkoutOuter}>
                    <Pressable android_ripple={{ color: '#c1ccc1' }} onPress={handleCheckOut} style={styles.checkout}>
                        <Text style={styles.checkoutText}>Check out</Text>
                    </Pressable>
                </View>
            )}
            {(notification || menu || payMethodBool) && <Pressable onPress={overlayClick} style={styles.overlay}></Pressable>}
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
        backgroundColor: colorScheme.statusbar,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleView: {
        flex: 1,
        backgroundColor: colorScheme.appbackgroud,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomView: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: colorScheme.navigationbar,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nav: {
        padding: 5,
        margin: 5
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
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
        width: 80 * ScreenWidth / 100,
        backgroundColor: '#ffffff',
        elevation: 10,
        zIndex: 2,
    },
    menuIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colorScheme.statusbar
    },
    notification: {
        position: 'absolute',
        height: '100%',
        flexDirection: 'column',
        width: 80 * ScreenWidth / 100,
        backgroundColor: '#ffffff',
        right: 0,
        elevation: 10,
        zIndex: 2,
    },
    notificationIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colorScheme.statusbar
    },
    checkout: {
        width: 340,
        padding: 10,
        backgroundColor: '#000',
        borderRadius: 150,
    },
    checkoutText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    checkoutOuter: {
        width: '100%',
        position: 'absolute',
        bottom: 53,
        alignItems: 'center'
    },
    payMethod: {
        position: 'absolute',
        width: ScreenWidth,
        height: ScreenHeight * 80 / 100,
        flexDirection: 'column',
        elevation: 10,
        zIndex: 2,
        backgroundColor: 'white',
        bottom: 0
    }
});
