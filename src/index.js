import React, { Component } from "react";
import {
    View, Text, AlertIOS, TouchableOpacity
} from "react-native";
import TouchID from 'react-native-touch-id';
import Icon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { createStackNavigator, CardStackStyleInterpolator, createSwitchNavigator } from 'react-navigation';
import NavigationService from './utils/navigationService';
import { Colors } from './resource';
import QRCode from "./pages/QrCode";
import Tabs from "./pages/Tabs";
import Web from "./pages/Web";
import MarketDetail from "./pages/MarketDetail";
import Test from "./pages/Test";
import SignIn from "./pages/SignInScreen";
import AuthLoading from "./pages/AuthLoadingScreen";

Tabs.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    switch (routeName) {
        case "Home":
            navigationOptions = {
                headerTitle: "首页",
                // header: null,
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
                        navigation.navigate('Auth');
                    }} >
                        <Icon name='mail' size={24} color='white' style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>)
            };
            break;
    }
    return navigationOptions;
};
const AuthStack = createStackNavigator({ SignIn: SignIn }, {
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
        headerBackTitle: '返回7',
        headerTruncatedBackTitle: '返回'
    }
});
const RootStackNavigator = createStackNavigator({
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
const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: RootStackNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);
export default SwitchNavigator