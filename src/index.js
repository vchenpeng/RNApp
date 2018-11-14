import React, { Component } from "react";
import {
    View, AlertIOS, TouchableOpacity
} from "react-native";

import { createStackNavigator, CardStackStyleInterpolator, createSwitchNavigator } from 'react-navigation';
import i18n from './utils/i18n';
import { Colors } from './resource';
import QRCode from "./pages/QrCode";
import Tabs from "./pages/Tabs";
import Web from "./pages/Web";
import MarketDetail from "./pages/MarketDetail";
import Test from "./pages/Test";
import SignIn from "./pages/SignInScreen";
import Settings from './pages/Settings';
import BLE from './pages/BLE';

let RootStackNavigator = createStackNavigator({
    Main: {
        screen: Tabs,
        navigationOptions: ({ navigation }) => {
            return {
                tabBarVisible: false,
                header: null
            }
        }
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
    SignIn: {
        screen: SignIn
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
    Settings: {
        screen: Settings
    },
    BLE: {
        screen: BLE
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
            headerBackTitle: i18n.t('back'),
            headerTruncatedBackTitle: i18n.t('back'),
        }
    });

export default RootStackNavigator;