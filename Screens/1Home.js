import { StyleSheet, Text, View, Button, Image, Pressable, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from '../Components/Carousel';
import Icon from 'react-native-vector-icons/Feather';
import Cards from '../Components/Card';
import { Imgdata, Featureddata, catlog } from '../data';
import { nav } from '../Redux/Slices/ActiveScreen';
import { actNav } from '../Redux/Slices/CatlogNav';

export default function Home() {
    const actCat = useSelector((state) => state.ActCatlog.actNav);
    const dispatch = useDispatch();

    const handleCatNavPress = (name) => {
        dispatch(nav("Search"));
        dispatch(actNav(name));
    };

    return (
        <View style={styles.container}>
            <View style={styles.section1}>
                <Carousel isImage={true} data={Imgdata} />
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
                <Carousel pagination={false} isImage={false} data={Featureddata.map(item => <Cards key={item.name} item={item} />)} />
                {/* <Cards item={Featureddata[0]} /> */}
            </View>
        </View >
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
        padding: 10
    },
    section2: {
        flexDirection: 'column'
    },
    section3: {
        flexDirection: 'column',
        height: 200,
        width: '100%',
        padding: 10
    },
    item: {
        backgroundColor: 'lightblue',
        borderRadius: 5,
        height: 200,
        padding: 20,
        marginLeft: 25,
        marginRight: 25,
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
});
