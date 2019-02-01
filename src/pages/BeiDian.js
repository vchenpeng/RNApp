import React, { Component } from 'react';
import { Text, Image, View, ScrollView, RefreshControl, Dimensions, Clipboard, NativeModules, StyleSheet, FlatList, StatusBar, Alert, DatePickerIOS, TouchableOpacity } from 'react-native';
import { Header, Button, ListItem, Avatar, CheckBox } from 'react-native-elements';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { WebView } from "react-native-webview";
import { Constants, Images, Colors } from "../resource";
import DropDownHolder from '../utils/DropDownHolder';

let cookie = '';
export default class Mine extends Component {
    webview: WebView

    //接收上一个页面传过来的title显示出来
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '贝店',
        headerTitleStyle: {
            fontSize: 18,
            fontWeight: '400',
            alignSelf: 'center',
            color: '#fff'
        },
        headerMode: "card",
        headerStyle: { backgroundColor: Colors.theme_color, borderBottomWidth: 0 },
        headerRight: (<View>
            <TouchableOpacity onPress={() => {
                navigation.state.params.webview.reload();
            }} >
                <AntDesignIcon name='reload1' size={24} color='white' style={{ marginRight: 15 }} />
            </TouchableOpacity>
        </View>),
        headerLeft: null
    })
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            user: null,
            chosenDate: new Date(),
            language: '.net',
            refreshing: false,

            cookie: null,
            id: null,
            pid: 91286199,
            products: []
        };
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
                    // DropDownHolder.alert('', JSON.stringify(data), 'error');
                    // AlertIOS.alert("", data.retcode);
                    return data;
                } catch (e) {
                }
            })
            .catch((error) => console.error(error));
    }
    randomWord(randomFlag, min, max) {
        var str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // 随机产生
        if (randomFlag) {
            range = Math.round(Math.random() * (max - min)) + min;
        }
        for (var i = 0; i < range; i++) {
            pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    }
    componentDidMount() {
        NativeModules.MainBridge.setIdleTimerDisabled(true);
        this.props.navigation.setParams({ webview: this.webview });
    }
    renderRow({ item }) {
        return (
            <TouchableOpacity onPress={() => console.log()} >
                <CheckBox
                    title='Click Here 啦🌶'
                    checked={false}
                />
                <ListItem
                    avatar={<Avatar
                        rounded
                        source={item.icon_url && { uri: item.icon_url }}
                        title={item.cn_name}
                    />}
                    title={item.cn_name}
                    subtitle={item.currency_symbol + '' + item.price}
                />
            </TouchableOpacity>
        )
    }
    render() {
        let that = this;
        let { height, width } = Dimensions.get('window');
        const { navigate } = this.props.navigation;
        let _scrollView = ScrollView;

        return (<View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar barStyle="light-content" />
            <WebView
                ref={w => this.webview = w}
                source={{ uri: "https://m.beidian.com/login/fast_login.html" }}
                startInLoadingState={true}
                hideKeyboardAccessoryView={true}
                allowsBackForwardNavigationGestures={true}
                allowsLinkPreview={true}
                decelerationRate="normal"
                dataDetectorTypes="none"
                scrollEnabled={false}
                useWebkit={true}
                renderLoading={() => (<View
                    style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}

                >
                    {/* <Image source={Images.ic_webloading} /> */}
                </View>)}
                injectedJavaScript={`
                    var pid = 91286199;
                    let uid = 91286199;
                    function getCookie(name){
                        var strcookie = document.cookie;//获取cookie字符串
                        var arrcookie = strcookie.split("; ");//分割
                        //遍历匹配
                        for ( var i = 0; i < arrcookie.length; i++) {
                            var arr = arrcookie[i].split("=");
                            if (arr[0] == name){
                                return arr[1];
                            }
                        }
                        return "";
                    }
                    function insertCSS(text){
                        var rule = text;
                        var css = document.createElement('style');
                        css.type = 'text/css';
                        if(css.styleSheet) css.styleSheet.cssText = rule;
                        else css.appendChild(document.createTextNode(rule));
                        document.getElementsByTagName("head")[0].appendChild(css);
                    }
                    function ajax() {
                        $.ajax({
                            type: "GET",
                            url: "https://imapi.beidian.com/server/gateway?method=voc.price.hunter.mission.change&uid=" + uid + "&pid=" + pid,
                            data: null,
                            headers: {
                                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C50 Hybrid/1.0.1 Beidian/3.25.01 (iPhone)",
                                "Referer": "https://m.beidian.com/promote/price_info.html"
                            },
                            xhrFields: {
                                withCredentials: true
                            },
                            success: (data) => {
                                if(data.success){
                                    pid = data.body.productInfo.pid;
                                    let productInfo = data.body.productInfo;
                                    window.postMessage(JSON.stringify(productInfo));
                                }else{
                                    //let tmp = JSON.parse(data);
                                    //alert(tmp.msg);
                                }
                            },
                            error: (error) => {
                                //alert(JSON.stringify(error));
                            }
                        });
                    }
                    function submitBD(params){
                        $.ajax({
                            type: "POST",
                            url: "https://imapi.beidian.com/server/gateway?method=voc.pricetask.submitMission",
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            data: JSON.stringify({
                                "uid": uid,
                                "outerUrl": params.url,
                                "id": params.id
                            }),
                            headers: {
                                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16C50 Hybrid/1.0.1 Beidian/3.25.01 (iPhone)",
                                "Referer": "https://m.beidian.com/promote/price_info.html"
                            },
                            xhrFields: {
                                withCredentials: true
                            },
                            success: (data) => {
                                if(data.success){
                                    //alert(JSON.stringify(data));
                                }else{

                                }
                            },
                            error: (error) => {
                                //alert(JSON.stringify(error));
                            }
                        });
                    }

                    setInterval(()=>{
                        uid = +getCookie('_logged_');
                        ajax();
                    },3000);
                    insertCSS('html{-webkit-user-select:none;}');
                    setTimeout(()=>{
                        document.addEventListener("message", function(event){
                            let data = JSON.parse(event.data);
                            submitBD(data);
                        }, false);
                    },3000);
                `}
                userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"

                onMessage={async (event) => {
                    let data = JSON.parse(event.nativeEvent.data);
                    let obj = {
                        id: data.id,
                        uid: data.uid,
                        url: ''
                    };
                    DropDownHolder.alert('', data.title, 'info');
                    switch (data.platform) {
                        case 2:
                            let jdInfo = await that.searchJD(data.title);
                            if (jdInfo.retcode == 0) {
                                let paragraph = jdInfo["data"]["searchm"]["Paragraph"];
                                if (paragraph && paragraph.length > 0) {
                                    let url = `https://item.m.jd.com/product/${paragraph[0]["wareid"]}.html?utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=CopyURL&ad_od=share&ShareTm=UR/2rpYRZHzD0mzmwsDuvGGPkIUrDcVrAxQdUUhlOLIkXbxrj1ZJgr5i53aW6ltlDIKjFz1Y74ACszYuDntDe5vNDWsdw%2BHFGFYU00pXwsfNKpsYE/p9tJcC9MKs93pymWEt1EcstNabDUIjr7Gjg54qn7sDwheRy5/MRPKp2OY=`;
                                    obj.url = url;
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
                        case 8:
                            break;
                    }

                    if (obj.url != '') {
                        this.webview.postMessage(JSON.stringify(obj));
                        NativeModules.MainBridge.playSystemAudio(1009);
                        Clipboard.setString(obj.url);
                    }
                }}
            />
            <View style={[styles.container, {}]}>
                <TouchableOpacity
                    onPress={() => {

                    }}>
                    <AntDesignIcon name='mail' size={30} color='white' style={{ marginLeft: 10, marginTop: 10 }} />
                </TouchableOpacity>
            </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 25,
        bottom: 25,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "orange"
    }
});