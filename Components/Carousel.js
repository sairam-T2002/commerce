import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, Image } from 'react-native';

const Carousel = ({ data, isImage }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % data.length;
            setActiveIndex(nextIndex);
        }, 5000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / screenWidth);
        setActiveIndex(currentIndex);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentOffset={{ x: activeIndex * screenWidth, y: 0 }}
            >
                {data.map((item, index) => (
                    <View key={index} style={[styles.item, { width: screenWidth }]}>
                        {isImage ? <View style={styles.imageWrapper}>
                            <Image source={{ uri: item }} style={styles.image} />
                        </View> : item}
                    </View>
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {data.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === activeIndex && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageWrapper: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'gray',
        margin: 5,
    },
    activeDot: {
        backgroundColor: 'black',
    },
});

export default Carousel;
