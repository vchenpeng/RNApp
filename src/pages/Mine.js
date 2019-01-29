import React, { Component } from 'react';
import { Text, Image, View, ScrollView, RefreshControl, Dimensions, Clipboard, NativeModules, StyleSheet, FlatList, StatusBar, AlertIOS, DatePickerIOS, TouchableOpacity } from 'react-native';
import { Header, Button, ListItem, Avatar, CheckBox } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { WebView } from "react-native-webview";
import { Constants, Images, Colors } from "../resource";
import DropDownHolder from '../utils/DropDownHolder';

let cookie = '';
export default class Mine extends Component {
    webview: WebView

    //接收上一个页面传过来的title显示出来
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '我的',
        headerTitleStyle: {
            fontSize: 18,
            fontWeight: '400',
            alignSelf: 'center',
            color: '#fff'
        },
        headerMode: "screen",
        headerStyle: { backgroundColor: '#376fff' },
        headerRight: (<View>
            <TouchableOpacity onPress={() => navigation.navigate('Web')} >
                <Text style={{ paddingRight: 14, color: '#fff', fontSize: 18 }}>图文</Text>
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
                    "ep": 20,
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
    componentDidMount() {
        NativeModules.MainBridge.setIdleTimerDisabled(true);
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
                renderLoading={() => (<View
                    style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}

                >
                    {/* <Image source={Images.ic_webloading} /> */}
                </View>)}
                injectedJavaScript={`
                    var pid = 91286199;
                    function ajax() {
                        $.ajax({
                            type: "GET",
                            url: "https://imapi.beidian.com/server/gateway?method=voc.price.hunter.mission.change&uid=91286199&pid=" + pid,
                            data: null,
                            xhrFields: {
                                withCredentials: true
                            },
                            success: (data) => {
                                if(data.success){
                                    pid = data.body.productInfo.pid;
                                    //alert(data.body.productInfo.title,"提示");
                                    window.postMessage(JSON.stringify(data.body.productInfo));
                                }
                            },
                            error: () => {
    
                            }
                        });
                    }
                    function submitBD(id,url){
                        $.ajax({
                            type: "POST",
                            url: "https://imapi.beidian.com/server/gateway?method=voc.pricetask.submitMission",
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            data: JSON.stringify({
                                "uid": 91286199,
                                "outerUrl": url,
                                "id": id
                            }),
                            xhrFields: {
                                withCredentials: true
                            },
                            success: (data) => {
                                //alert(JSON.stringify(data));
                            },
                            error: (error) => {
                                //alert(JSON.stringify(error));
                            }
                        });
                    }
                    setInterval(()=>{
                        ajax();
                    },2800);
                    
                    setTimeout(()=>{
                        document.addEventListener("message", function(event){
                            var data = JSON.parse(event.data);
                            submitBD(data.id,data.url);
                        }, false);
                    },3000);
                `}
                userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
                onMessage={async (event) => {
                    var data = JSON.parse(event.nativeEvent.data);
                    let products = this.state.products;
                    products.push(data);
                    this.setState({
                        products: products
                    });
                    var wphInfo = await that.searchWPH(data.title);
                    DropDownHolder.alert(data.title, '', 'info');
                    var wphInfoData = wphInfo[0]["result"]["data"];
                    if (wphInfoData) {
                        let url = "https://m.vip.com"
                            + wphInfoData["products"][0]["product_url"]
                            + "?msns=iphone-6.36-link&st=p-url&cid=6225bca09bcdf0cc9da18b7a0f9072261118a72d&chl_param=share%3A6d5cvgvrP8&abtid=13&uid=";

                        Clipboard.setString(url);
                        let postStr = JSON.stringify({
                            id: data.id,
                            uid: 91286199,
                            url: url
                        });
                        // AlertIOS.alert(postStr);
                        this.webview.postMessage(postStr);
                    }
                }}
            />
        </View>)
    }
}