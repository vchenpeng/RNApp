import React, { Component } from "react";
import {
    View, Text, AlertIOS, TouchableOpacity
} from "react-native";
import TouchID from 'react-native-touch-id';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
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
// import SyanImagePicker from 'react-native-syan-image-picker';
import BeiDian from './pages/BeiDian';

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
                        <AntDesignIcon name='scan1' size={24} color='white' style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                </View>),
                headerRight: (<View>
                    <TouchableOpacity onPress={() => {
                        /*const optionalConfigObject = {
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
                        });*/
                        navigation.navigate('BeiDian');
                    }} >
                        <AntDesignIcon name='redenvelopes' size={24} color='white' style={{ marginRight: 15 }} />
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
                        <AntDesignIcon name='dotchart' size={24} color='white' style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>)
            }
            break;
        case "Explore":
            navigationOptions = {
                headerTitle: "发现",
                headerRight: (<View>
                    <TouchableOpacity onPress={() => {
                        const options = {
                            imageCount: 6,          // 最大选择图片数目，默认6
                            isCamera: true,         // 是否允许用户在内部拍照，默认true
                            isCrop: true,          // 是否允许裁剪，默认false
                            // CropW: ~~(width * 0.6), // 裁剪宽度，默认屏幕宽度60%
                            // CropH: ~~(width * 0.6), // 裁剪高度，默认屏幕宽度60%
                            isGif: true,           // 是否允许选择GIF，默认false，暂无回调GIF数据

                            showCropCircle: true,  // 是否显示圆形裁剪区域，默认false
                            showCropFrame: true,    // 是否显示裁剪区域，默认true
                            showCropGrid: false     // 是否隐藏裁剪区域网格，默认false
                        };
                        // SyanImagePicker.showImagePicker(options, (err, selectedPhotos) => {
                        //     if (err) {
                        //         return;
                        //     }
                        // });
                    }} >
                        <AntDesignIcon name='search1' size={24} color='white' style={{ marginRight: 15 }} />
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
                        <AntDesignIcon name='mail' size={24} color='white' style={{ marginRight: 15 }} />
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
    },
    BeiDian: {
        screen: BeiDian
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