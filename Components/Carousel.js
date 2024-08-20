import { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, Pressable } from 'react-native';

const Carousel = ({ data, isImage, pagination = true }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const screenWidth = Dimensions.get('window').width;
    const intervalRef = useRef(null);

    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            const nextIndex = (activeIndex + 1) % data.length;
            setActiveIndex(nextIndex);
        }, 5000);
    };

    const resetTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        startTimer();
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(intervalRef.current);
    }, [activeIndex]);

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / screenWidth);
        setActiveIndex(currentIndex);
        resetTimer();
    };

    return (
        <Pressable onPress={resetTimer} style={styles.container}>
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
                        {isImage ? (
                            <View style={styles.imageWrapper}>
                                <Image source={{ uri: item }} style={styles.image} />
                            </View>
                        ) : (
                            React.cloneElement(item, { resetTimer })
                        )}
                    </View>
                ))}
            </ScrollView>
            {pagination && (
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
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
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
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
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