import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Dimensions, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-native-banner-carousel';
import Icon from 'react-native-vector-icons/Feather';
import Cards from '../Components/Card';
import { Imgdata, Featureddata, catlog } from '../data';
import { nav } from '../Redux/Slices/ActiveScreen';
import { actNav } from '../Redux/Slices/CatlogNav';
import { setLoading } from '../Redux/Slices/ActiveScreen';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

export default function Home() {
    const [isAutoplay, setIsAutoplay] = useState(true);
    const actCat = useSelector((state) => state.ActCatlog.actNav);
    const dispatch = useDispatch();

    const handleCatNavPress = (name) => {
        dispatch(setLoading(true));
        dispatch(nav("Search"));
        dispatch(actNav(name));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 5);
    };

    const resetTimer = () => {
        setIsAutoplay(false);
        setTimeout(() => {
            setIsAutoplay(true);
        }, 100);
    };

    const handleImagePress = () => {
        resetTimer();
    };

    const renderImage = (image, index) => {
        return (
            <Pressable key={index} onPress={handleImagePress} style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: image }} />
            </Pressable>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section1}>
                <Carousel
                    autoplay={isAutoplay}
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                    useNativeDriver={true}
                    dotColor="gray"
                    inactiveDotColor="black"
                >
                    {Imgdata.map((image, index) => renderImage(image, index))}
                </Carousel>
            </View>
            <View style={styles.section2}>
                <View style={styles.headerContainer}>
                    <Icon name="grid" size={20} color={"#b8095a"} />
                    <Text style={styles.header}>Catalog</Text>
                </View>
                <View style={styles.catlogcontainer}>
                    {catlog.map((item, index) => (
                        <Pressable onPress={() => handleCatNavPress(item.name)} key={index} style={styles.catlogItem}>
                            <View style={styles.circle}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                                <Text>{item.name}</Text>
                                <View style={{ backgroundColor: '#d75311', borderRadius: 20, height: 20, width: 25, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon name="arrow-right" size={15} color={"#ffffff"} />
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </View>
            <View style={styles.section3}>
                <View style={styles.headerContainer}>
                    <Icon name="star" size={20} color={"#b8095a"} />
                    <Text style={styles.header}>Featured</Text>
                </View>
                <View style={styles.cards}>
                    <Carousel
                        autoplay={isAutoplay}
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={BannerWidth - 20} // Adjusted for padding
                        useNativeDriver={true}
                        showsPageIndicator={false}
                    >
                        {Featureddata.map((item, index) => (
                            <Cards key={index} item={item} resetTimer={resetTimer} />
                        ))}
                    </Carousel>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcf1d2'
    },
    section1: {
        height: 250,
        width: '100%',
        marginBottom: 10,
        marginTop: 10
    },
    section2: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    section3: {
        flexDirection: 'column',
        height: 200,
        width: '100%',
    },
    header: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    headerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    catlogcontainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    catlogItem: {
        width: '48%',
        height: 80,
        backgroundColor: 'lightgray',
        padding: 10,
        marginVertical: 5,
        marginTop: 55,
        borderRadius: 5,
        position: 'relative',
        borderWidth: 2,
        borderColor: '#e2b56b'
    },
    circle: {
        position: 'absolute',
        top: -55,
        marginHorizontal: '17.5%',
        width: 110,
        height: 110,
        backgroundColor: 'cyan',
        borderRadius: 55,
        borderWidth: 2,
        borderColor: '#e2b56b'
    },
    imageContainer: {
        width: BannerWidth,
        height: BannerHeight,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    cards: {
        paddingHorizontal: 10,
        alignItems: 'center',
    }
});
