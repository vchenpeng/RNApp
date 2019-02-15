import React, { Component } from 'react';
import { Text, Image, View, SafeAreaView, FlatList, TouchableOpacity, TouchableHighlight, ScrollView, RefreshControl, Dimensions, Clipboard, NativeModules, StyleSheet, StatusBar, Alert } from 'react-native';
import Modal from '../components/ModalBox';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { Header, Button, ListItem, Avatar } from 'react-native-elements';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { WebView } from "react-native-webview";
import NavigationService from '../utils/navigationService';
import { Constants, Images, Colors } from "../resource";
import DropDownHolder from '../utils/DropDownHolder';
import tool from '../utils/tool';
import { ImageButton, TopBar } from "../components";
import InjectedJavaScript from '../utils/InjectedJavaScript'

let self;
let platformCode = 1;   // 天猫
export default class BeiDian extends Component {
    //接收上一个页面传过来的title显示出来
    static navigationOptions = ({ navigation }) => {
        let { params } = navigation.state;
        return {
            headerTitle: "贝店情报局",
            headerTitleStyle: {
                fontSize: 18,
                fontWeight: '400',
                alignSelf: 'center',
                color: '#fff'
            },
            headerMode: "card",
            headerStyle: { backgroundColor: Colors.theme_color, borderBottomWidth: 0 },
            headerRight: (<View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    onPress={() => {
                        platformCode = platformCode == 1 ? 6 : 1;
                        let obj = {
                            code: "NW1003",
                            data: platformCode,
                            msg: "切换价格情报平台"
                        };
                        navigation.state.params.webview.postMessage(JSON.stringify(obj));
                        NativeModules.MainBridge.playSystemAudio(1001);
                    }} >
                    <AntDesignIcon name='retweet' size={24} color='white' style={{ marginRight: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.state.params.openLogin();
                }} >
                    <AntDesignIcon name='iconfontdesktop' size={24} color='white' style={{ marginRight: 15 }} />
                    <View style={{ position: "absolute", right: 12, top: -4, paddingTop: 1, paddingBottom: 1, paddingLeft: 3, paddingRight: 3, backgroundColor: "red", borderRadius: 3 }}>
                        <Text style={{ fontSize: 10, color: "#fff" }}>{((params && params.products) ? params.products.length : 0).toString()}</Text>
                    </View>
                </TouchableOpacity>
            </View>),
        }
    }
    webview: WebView
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            refreshing: false,
            isShowLogin: false,
            id: null,
            pid: 91286199,
            products: [],
            historys: []
        };
    }
    setLoginModalStatus(flag) {
        self.setState({
            isShowLogin: flag
        });
    }
    openLogin() {
        self.setState({
            isShowLogin: !self.state.isShowLogin
        });
    }
    searchWPH(title) {
        let that = this;
        const url = `https://m.vip.com/server.html?rpc&method=SearchRpc.getSearchList&f=www`;
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "method": "SearchRpc.getSearchList",
                "params": {
                    "page": "searchlist.html",
                    "channel_id": "",
                    "keyword": title,
                    "np": 1,
                    "ep": 5,
                    "brand_ids": "",
                    "brand_store_sn": "",
                    "props": "",
                    "sort": 0,
                    "category_id_1_show": "",
                    "category_id_1_5_show": "",
                    "category_id_2_show": "",
                    "category_id_3_show": "",
                    "query": ""
                },
                "id": 1548416963527,
                "jsonrpc": "2.0"
            }),
            headers: {
                "authorization": "OAuth api_sign=9499c033242a2dd1a0e38e03a136acd86d17d194",
            },
            credentials: 'include'
        })
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }
    searchJD(title) {
        let that = this;
        const url = `https://so.m.jd.com/ware/search._m2wq_list?keyword=${title}&datatype=1&page=1&pagesize=10&ext_attr=no&brand_col=no&price_col=no&color_col=no&size_col=no&ext_attr_sort=no&merge_sku=yes&multi_suppliers=yes&area_ids=1,72,2819&filt_type=col_type,L0M0;&qp_disable=no&fdesc=%E5%8C%97%E4%BA%AC&t1=1548735239631`;
        return fetch(url, {
            method: 'GET',
            headers: {

            },
            credentials: 'include'
        })
            .then((response) => {
                try {

                    let result = JSON.stringify(response._bodyInit);
                    let dataStr = result.replace(/\\n/g, "").replace(/\\"/g, '"').replace(/\)"/g, "").substr(10, result.length - 3);
                    let data = JSON.parse(dataStr);
                    return data;
                } catch (e) {
                    return null;
                }
            })
            .catch((error) => console.error(error));
    }
    searchTM(title) {
        let that = this;
        const url = `https://list.tmall.com/m/search_items.htm?page_size=20&page_no=1&q=${title}&type=p&vmarket=&spm=875.7931836%2FB.a2227oh.d100&from=mallfp..pc_1_searchbutton`;
        return fetch(url, {
            method: 'GET',
            headers: {
                referer: 'https://list.tmall.com/search_product.htm?q=444&type=p&vmarket=&spm=875.7931836%2FB.a2227oh.d100&from=mallfp..pc_1_searchbutton'
            },
            credentials: 'include'
        })
            .then(response => {
                try {
                    let dataStr = response._bodyInit.replace(/\\n/g, "").replace(/\\"/g, '"').replace(/\)"/g, "");
                    let data = JSON.parse(dataStr);
                    return data;
                } catch (e) {
                    return null;
                }
            })
            .catch((error) => console.error(error));
    }
    randomWord(randomFlag, min, max) {
        let str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // 随机产生
        if (randomFlag) {
            range = Math.round(Math.random() * (max - min)) + min;
        }
        for (let i = 0; i < range; i++) {
            pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    }
    switchPlatformName(code) {
        let platformName = "未知";
        switch (code) {
            case 1:
                platformName = "天猫";
                break;
            case 2:
                platformName = "京东";
                break;
            case 6:
                platformName = "唯品会";
                break;
            default:
                break;
        }
        return platformName;
    }
    componentDidMount() {
        NativeModules.MainBridge.setIdleTimerDisabled(true);
        this.props.navigation.setParams({ webview: this.webview });
        this.props.navigation.setParams({ openLogin: this.openLogin });
    }
    renderRow({ item }) {
        return (
            <TouchableHighlight
                activeOpacity={0.85}
                underlayColor='#000'
                onPress={() => {
                    NavigationService.navigate("Web", { url: item.outerUrl, title: item.title });
                }} >
                <View style={{ backgroundColor: '#fff' }}>
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
                            source={item.productImg && { uri: item.productImg }}
                            title={item.name}
                        />}
                        titleStyle={{ fontSize: 14 }}
                        subtitleStyle={{ fontSize: 12 }}
                        titleContainerStyle={{
                            height: 20,
                            width: 230,
                            marginLeft: 10,
                            justifyContent: "center"
                        }}
                        subtitleContainerStyle={{ justifyContent: "center", width: 230, marginLeft: 10, height: 20 }}
                        title={item.title}
                        subtitle={this.switchPlatformName(item.platform) + "·更新于 " + tool.formatDateTmp(+(item.gmtModified + '000'))}
                        rightTitle={item.status == 1 ? '分析中' : (item.status == 2 ? '成功' : '失败')}
                        rightTitleStyle={[{
                            backgroundColor: '#d43f3a', paddingTop: 5, paddingBottom: 5, width: 50, color: '#fff', fontSize: 12, textAlign: "center",
                        }, { backgroundColor: item.status == 1 ? '#eee' : (item.status == 2 ? '#7ED321' : '#d43f3a') }]}
                        checkmark={false}
                        chevron={false}
                        rightAvatar={false}
                        rightIcon={<View />}
                        buttonGroup={null}
                    />
                </View>
            </TouchableHighlight>
        )
    }
    render() {
        let that = this;
        let { height, width } = Dimensions.get('window');
        const { navigate } = this.props.navigation;
        return (<SafeAreaView style={{ flex: 1, backgroundColor: "#f2f4f6" }}>
            <View style={{ flex: 1, backgroundColor: "#f2f4f6" }}>
                <StatusBar barStyle="light-content" />

                <ScrollableTabView
                    style={{ marginTop: 0 }}
                    initialPage={0}
                    renderTabBar={() => (<ScrollableTabBar
                        style={{ borderBottomWidth: 0, height: 40, paddingVertical: 0 }}
                        textStyle={{ height: 40, paddingTop: 8, fontSize: 14 }}
                        activeTextColor={Colors.theme_color}
                        underlineWidth={20}
                        inactiveTextColor="#999" />)
                    }
                    tabBarBackgroundColor="#eee"
                    tabBarUnderlineStyle={{
                        backgroundColor: Colors.theme_color, height: 2
                    }}
                    underlineWidth={10}
                    onChangeTab={(obj) => {
                        console.log('index:' + obj.i);
                    }}
                >
                    <View tabLabel={"价格情报局"} style={{}} key={"价格情报局"}>
                        <SwipeListView
                            style={{}}
                            useFlatList={true}
                            data={this.state.historys}
                            renderItem={(rowData, rowMap) => this.renderRow(rowData, rowMap)}
                            directionalDistanceChangeThreshold={1}
                            renderHiddenItem={(data, rowMap) => (
                                <View style={styles.rowBack}>
                                    <Text></Text>
                                    <TouchableOpacity activeOpacity={1} style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                    >
                                        <Text style={styles.backTextWhite}>关闭</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} style={[styles.backRightBtn, styles.backRightBtnRight]}
                                    >
                                        <Text style={styles.backTextWhite}>删除</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            leftOpenValue={75}
                            rightOpenValue={-150}
                            disableRightSwipe={true}
                            disableLeftSwipe={true}
                            friction={10}
                            tension={0}
                            recalculateHiddenLayout={false}
                            previewDuration={0}
                            previewOpenValue={.01}
                            keyExtractor={(rowData, index) => {
                                return rowData.id.toString();
                            }}
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                NativeModules.MainBridge.playSystemAudio(1100);
                                this.setState({ refreshing: true });
                                let obj = {
                                    code: "NW1002",
                                    data: null,
                                    msg: "请求历史记录"
                                };
                                self.webview.postMessage(JSON.stringify(obj));
                            }}
                        />
                    </View>
                    <View tabLabel={"情报检验科"} style={{}} key={"情报检验科"}>
                        <SwipeListView
                            style={{}}
                            useFlatList={true}
                            data={this.state.historys}
                            renderItem={(rowData, rowMap) => this.renderRow(rowData, rowMap)}
                            directionalDistanceChangeThreshold={1}
                            renderHiddenItem={(data, rowMap) => (
                                <View style={styles.rowBack}>
                                    <Text></Text>
                                    <TouchableOpacity activeOpacity={1} style={[styles.backRightBtn, styles.backRightBtnLeft]}
                                    >
                                        <Text style={styles.backTextWhite}>关闭</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} style={[styles.backRightBtn, styles.backRightBtnRight]}
                                    >
                                        <Text style={styles.backTextWhite}>删除</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            leftOpenValue={75}
                            rightOpenValue={-150}
                            disableRightSwipe={true}
                            disableLeftSwipe={true}
                            friction={10}
                            tension={0}
                            recalculateHiddenLayout={false}
                            previewDuration={0}
                            previewOpenValue={.01}
                            keyExtractor={(rowData, index) => {
                                return rowData.id.toString();
                            }}
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                NativeModules.MainBridge.playSystemAudio(1100);
                                this.setState({ refreshing: true });
                                let obj = {
                                    code: "NW1002",
                                    data: null,
                                    msg: "请求历史记录"
                                };
                                self.webview.postMessage(JSON.stringify(obj));
                            }}
                        />
                    </View>
                </ScrollableTabView >
                <Modal
                    isOpen={that.state.isShowLogin}
                    keyboardTopOffset={0}
                    startOpen={false}
                    backdrop={false}
                    coverScreen={false}
                    swipeToClose={false}
                    useNativeDriver={false}
                    position={"top"}
                >
                    <WebView
                        ref={w => this.webview = w}
                        style={{ flex: 1 }}
                        source={{ uri: "https://m.beidian.com/login/fast_login.html" }}
                        startInLoadingState={-22}
                        hideKeyboardAccessoryView={true}
                        allowsBackForwardNavigationGestures={true}
                        allowsLinkPreview={false}
                        decelerationRate="normal"
                        dataDetectorTypes="none"
                        scrollEnabled={false}
                        bounces={true}
                        useWebkit={true}
                        onLoadEnd={() => {
                            let obj = {
                                code: "NW1001",
                                data: null,
                                msg: "加载完毕"
                            };
                            this.webview.postMessage(JSON.stringify(obj));
                        }}
                        renderLoading={() => (<View
                            style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}
                        >
                            <Image source={Images.ic_webloading} />
                        </View>)}
                        injectedJavaScript={InjectedJavaScript}
                        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
                        onMessage={async (event) => {
                            let data = JSON.parse(event.nativeEvent.data);
                            if (data.code == "WN1000") {
                                if (that.state.isShowLogin) {
                                    DropDownHolder.alert(data.msg, '', 'error');
                                } else {
                                    that.setLoginModalStatus(true);
                                }
                            } else if (data.code == "WN1001") {
                                DropDownHolder.alert(data.msg, '', 'warn');
                            } else if (data.code == "WN1002") {
                                that.setState({
                                    historys: data.data
                                });
                                that.setState({ refreshing: false });
                            }
                            else {
                                that.setLoginModalStatus(false);
                                let obj = {
                                    id: data.id,
                                    uid: data.uid,
                                    url: ''
                                };
                                DropDownHolder.alert('', `${data.title}`, 'info');
                                switch (data.platform) {
                                    case 2:
                                        let jdInfo = await that.searchJD(data.title);
                                        if (jdInfo.retcode == 0) {
                                            let paragraph = jdInfo["data"]["searchm"]["Paragraph"];
                                            if (paragraph && paragraph.length > 0) {
                                                for (let i = 0; i < paragraph.length; i++) {
                                                    if (paragraph[i]["shop_name"].indexOf("自营") > -1 || paragraph[i]["shop_name"].indexOf("旗舰店") > -1) {
                                                        let tmpWord = that.randomWord(false, 58, 58);
                                                        let url = `https://item.m.jd.com/product/${paragraph[i]["wareid"]}.html?utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=CopyURL&ad_od=share&ShareTm=UR/2rpYRZHzD0mzmwsDuvGGPkIUrDcVrAxQdUUhlOLIkXbxrj1ZJgr5i53aW6ltlDIKjFz1Y74ACszYuDntDe5vNDWsdw%2BHFGFYU00pXwsfNKpsYE/${tmpWord}`;
                                                        obj.url = url;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                    case 6:
                                        let wphInfo = await that.searchWPH(data.title);
                                        let wphInfoData = wphInfo[0]["result"]["data"];
                                        if (wphInfoData) {
                                            let products = wphInfoData["products"];
                                            if (products && products.length > 0) {
                                                let product_url = products[0]["product_url"];
                                                let tmpWord = that.randomWord(false, 40, 40);
                                                let chlParam = encodeURIComponent("share:" + that.randomWord(false, 10, 10));
                                                let url = `https://m.vip.com${product_url}?msns=iphone-6.36-link&st=p-url&cid=${tmpWord}&chl_param=${chlParam}&abtid=13&uid=`;
                                                obj.url = url;
                                            }
                                        }
                                        break;
                                    case 1:
                                        let tmInfo = await that.searchTM(data.title);
                                        let item = tmInfo["item"];
                                        if (item && item.length > 0) {
                                            for (let i = 0; i < item.length; i++) {
                                                if (item[i]["shop_name"].indexOf("天猫超市") > -1
                                                    || item[i]["shop_name"].indexOf("旗舰店") > -1
                                                    || item[i]["shop_name"].indexOf("直营") > -1
                                                ) {
                                                    let first = item[i];
                                                    let url = `https:${first.url}`;
                                                    obj.url = url;
                                                    break;
                                                }
                                            }
                                        }
                                        break;
                                }

                                if (obj.url != '') {
                                    let p = this.state.products;
                                    p.push(obj);
                                    this.setState({
                                        products: p
                                    });
                                    this.props.navigation.setParams({ products: p });
                                    this.webview.postMessage(JSON.stringify(obj));
                                    NativeModules.MainBridge.playSystemAudio(1009);
                                    Clipboard.setString(obj.url);
                                }
                            }
                        }}
                    />
                </Modal>
            </View>
        </SafeAreaView>)
    }
}

const styles = StyleSheet.create({

});