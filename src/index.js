import React, { Component } from "react";
import {
    View, AlertIOS, TouchableOpacity
} from "react-native";
import TouchID from 'react-native-touch-id';
import Icon from "react-native-vector-icons/AntDesign";
import { createStackNavigator, CardStackStyleInterpolator } from 'react-navigation';
import NavigationService from './utils/navigationService';
import { Colors } from './resource';
import QRCode from "./pages/QrCode";
import Tabs from "./pages/Tabs";
import Web from "./pages/Web";
import Login from "./pages/Login";
import MarketDetail from "./pages/MarketDetail";
import Test from "./pages/Test";

Tabs.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    switch (routeName) {
        case "Home":
            navigationOptions = {
                headerTitle: "首页",
                header: null,
                headerLeft: (<View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('QRCode');
                    }} >
                        <Icon name='scan1' size={24} color='white' style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                </View>),
                headerRight: (<View>
                    <TouchableOpacity onPress={() => {
                        const optionalConfigObject = {
                            title: "Authentication Required", // Android
                            color: "#e00606", // Android
                            sensorDescription: "Touch sensor", // Android
                            cancelText: "Cancel", // Android
                            fallbackLabel: "", // iOS (if empty, then label is hidden)
                            unifiedErrors: false // use unified error messages (default false)
                        };
                        TouchID.authenticate('别怕，就是验证下是否是机主^_^', optionalConfigObject)
                            .then(success => {
                                AlertIOS.alert('验证成功');
                            })
                            .catch(error => {
                                AlertIOS.alert('验证失败');
                            });
                    }} >
                        <Icon name='appstore-o' size={24} color='white' style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>)
            };
            break;
        case "Market":
            navigationOptions = {
                headerTitle: "行情",
                headerRight: (<View>
                    <TouchableOpacity onPress={() => {
                        NavigationService.navigate("Test", { url: "https://720yun.com/t/f6ejeseysn2?scene_id=16754202" });
                    }} >
                        <Icon name='dotchart' size={24} color='white' style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>)
            }
            break;
        case "Explore":
            navigationOptions = {
                headerTitle: "发现",
                headerRight: (<View>
                    <TouchableOpacity onPress={() => {

                    }} >
                        <Icon name='search1' size={24} color='white' style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>)
            };
            break;
        case "Mine":
            navigationOptions = {
                headerTitle: "我的",
                headerRight: (<View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Login');
                    }} >
                        <Icon name='mail' size={24} color='white' style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>)
            };
            break;
    }
    return navigationOptions;
};

var RootStackNavigator = createStackNavigator({
    Main: {
        screen: Tabs
    },
    QRCode: {
        screen: QRCode,
        navigationOptions: ({ navigation }) => {
            return {
                tabBarVisible: false,
                header: null
            }
        }
    },
    Web: {
        screen: Web
    },
    MarketDetail: {
        screen: MarketDetail
    },
    Test: {
        screen: Test
    },
    Login: {
        screen: Login
    }
}, {
        navigationOptions: {
            headerTitle: null,
            headerTitleStyle: {
                fontSize: 18,
                fontWeight: '400',
                alignSelf: 'center',
                color: '#fff'
            },

            transitionConfig: () => ({
                screenInterpolator: CardStackStyleInterpolator.forFade,
            }),
            headerTintColor: '#fff',
            headerMode: "card",
            gesturesEnabled: true,
            headerStyle: { backgroundColor: Colors.theme_color, borderBottomWidth: 0 },
            headerBackTitle: '返回',
            headerTruncatedBackTitle: '返回'
        }
    });

export default RootStackNavigator