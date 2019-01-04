import React, { Component, PureComponent } from 'react';
import {
    Text, Alert, Image, FlatList, View, StyleSheet, StatusBar, SafeAreaView,
    Dimensions, NativeModules, TouchableOpacity, ScrollView, RefreshControl
} from 'react-native';
import { Header, List, ListItem, Button, PricingCard, SearchBar, Avatar } from 'react-native-elements';
import NavigationService from '../utils/navigationService';
import DropDownHolder from '../utils/DropDownHolder';
import localStorage from '../utils/storage';
import Swiper from 'react-native-swiper';
import { Colors } from '../resource';

export default class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cacheSize: 0,
            refreshing: false
        };
        this.clearCache.bind(this);
        this.getCacheSize.bind(this);
    }
    async componentDidMount() {
        DropDownHolder.alert('标题二', '我是内容我是内容我是内容我是内容我是内容', 'info');
        this.getCacheSize();
        this.fetchMarketList();
        //localStorage.save("chenpeng", { a: 12, b: 70 });
        //let value = await localStorage.load("chenpeng");
        //Alert.alert(JSON.stringify(value));
    }
    getCacheSize() {
        let mainBridge = NativeModules.MainBridge;
        mainBridge.getCacheSize((error, events) => {
            if (error) {
                console.warn(error);
            } else {
                this.setState({
                    cacheSize: (events / (1024 * 1024)).toFixed(2)
                });
            }
        });
    }
    clearCache() {
        let mainBridge = NativeModules.MainBridge;
        mainBridge.cleanCache((error, events) => {
            if (error) {
                console.error(error);
            } else {
                this.setState({
                    cacheSize: (events / (1024 * 1024)).toFixed(2)
                });
            }
        });
    }
    fetchMarketList() {
        const url = 'http://www.coin918.cc/ajax/allcoin_a/id/0?kw=';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let url = responseJson.url;
                let list = [];
                for (const key in url) {
                    if (url.hasOwnProperty(key)) {
                        const element = url[key];
                        let item = {
                            key: key,
                            name: element[0],
                            price: element[1],
                            change: element[7],
                            vol: element[6],
                            icon_url: 'http://www.coin918.cc/Upload/coin/' + element[9]
                        };
                        if (key == 'gath_usd') {
                            list.unshift(item);
                        } else {
                            list.push(item);
                        }
                    }
                }
                this.setState({
                    list: list,
                    refreshing: false
                });
            })
            .catch((error) => {
                this.setState({ refreshing: false })
            })
    }
    renderRow({ item }) {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => {
                NavigationService.navigate('MarketDetail', { title: item.name });
            }} >
                <ListItem
                    style={[styles.item]}
                    containerStyle={{
                        backgroundColor: '#fff', padding: 0, margin: 0, borderBottomColor: '#eee',
                        paddingTop: 10, paddingBottom: 10, paddingLeft: 10
                    }}
                    key={item.key}
                    avatar={<Avatar
                        width={40}
                        height={40}
                        avatarStyle={{ borderRadius: 0, backgroundColor: '#fff', margin: 20 }}
                        source={item.icon_url && { uri: item.icon_url }}
                        title={item.name}
                    />}
                    titleStyle={{ fontSize: 14 }}
                    subtitleStyle={{ fontSize: 12 }}
                    titleContainerStyle={{
                        height: 20,
                        width: 200,
                        marginLeft: 10,
                        justifyContent: "center"
                    }}
                    subtitleContainerStyle={{ justifyContent: "center", marginLeft: 10, height: 20 }}
                    title={item.name}
                    subtitle={'$' + item.price.toFixed(4)}
                    rightTitle={item.change > 0 ? '+' + item.change + '%' : item.change + '%'}
                    rightTitleStyle={[{
                        backgroundColor: '#d43f3a', paddingTop: 5, paddingBottom: 5, width: 50, color: '#fff', fontSize: 12, textAlign: "center",
                    }, { backgroundColor: item.change > 0 ? '#d43f3a' : '#7ED321' }]}
                    checkmark={false}
                    chevron={false}
                    rightAvatar={false}
                    rightIcon={<View />}
                    buttonGroup={null}
                />
            </TouchableOpacity>
        )
    }
    closeRow(rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }
    render() {
        let { height, width } = Dimensions.get('window');
        let _scrollView = ScrollView;
        return (<ScrollView style={{ flex: 1, backgroundColor: '#eee' }}
            ref={(scrollView) => _scrollView = scrollView}
            refreshControl={
                <RefreshControl refreshing={this.state.refreshing}
                    onRefresh={() => {
                        NativeModules.MainBridge.playSystemAudio(1100);
                        this.setState({ refreshing: true })
                        this.fetchMarketList();
                    }}
                ></RefreshControl>}>
            <StatusBar barStyle="light-content" />
            <View style={{ height: 135 }}>

                <Swiper style={styles.wrapper}
                    autoplay={true}
                    containerStyle={{ backgroundColor: Colors.theme_color }}
                    dotStyle={{ bottom: -15, width: 10, height: 2, backgroundColor: "#fff", borderRadius: 0 }}
                    activeDotStyle={{ bottom: -15, width: 10, height: 2, backgroundColor: Colors.theme_color, borderRadius: 0 }}
                    showsButtons={false}>
                    <View style={[styles.slide1]}>
                        <Image style={{ flex: 1, resizeMode: "stretch", width: width }} source={{ uri: 'http://www.coin918.cc/Upload/ad/5bda59a05c841.jpg' }}></Image>
                    </View>
                    <View style={styles.slide2}>
                        <Image style={{ flex: 1, resizeMode: "stretch", width: width }} source={{ uri: 'http://www.coin918.cc/Upload/ad/5bd6c521587c4.png' }}></Image>
                    </View>
                    <View style={styles.slide2}>
                        <Image style={{ flex: 1, resizeMode: "stretch", width: width }} source={{ uri: 'http://www.coin918.cc/Upload/ad/5bd6c521587c4.png' }}></Image>
                    </View>
                </Swiper>
            </View>
            <SearchBar
                lightTheme
                onChangeText={() => {

                }}

                onFocus={() => {
                    //_scrollView.scrollTo({ x: 0, y: 135, animated: true }); 
                }}
                onClearText={() => { }}
                returnKeyType='search'
                icon={{ type: 'font-awesome', name: 'search' }}
                placeholder='请输入关键字' />
            {/* <PricingCard
                color='#4f9deb'
                title='缓存大小'
                price={this.state.cacheSize + 'M'}
                info={['']}
                button={{ title: '清理缓存', icon: 'flight-takeoff' }}
                onButtonPress={() => {
                    this.clearCache();
                }}
            /> */}
            <FlatList
                style={{ width: width }}
                removeClippedSubviews={false}
                data={this.state.list}
                renderItem={this.renderRow}
                keyExtractor={(item, index) => index.toString()}
            />
        </ScrollView >)
    }
};

const styles = StyleSheet.create({
    wrapper: {

    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})