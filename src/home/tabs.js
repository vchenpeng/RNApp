import { createBottomTabNavigator } from "react-navigation";
import { AppRegistry, View, StatusBar, Image, AlertIOS } from "react-native";
import React from "react";

import Home from "./index";
import Market from "./market";
import Explore from "./explore";
import Mine from "./mine";

export default createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({ focused, tintColor }) => (
                <Image
                    source={focused ? require('../resource/images/home.png') : require('../resource/images/home.png')}
                    style={{ width: 30, height: 30, tintColor: tintColor }}
                />
            )
        }
    },
    Market: {
        screen: Market,
        navigationOptions: {
            tabBarLabel: '行情',
            tabBarIcon: ({ focused, tintColor }) => (
                <Image
                    source={focused ? require('../resource/images/hq.png') : require('../resource/images/hq.png')}
                    style={{ width: 30, height: 30, tintColor: tintColor }}
                />
            )
        }
    },
    Explore: {
        screen: Explore,
        navigationOptions: {
            tabBarLabel: '发现',
            tabBarIcon: ({ focused, tintColor }) => (
                <Image
                    source={focused ? require('../resource/images/fx.png') : require('../resource/images/fx.png')}
                    style={{ width: 30, height: 30, tintColor: tintColor }}
                />
            )
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ focused, tintColor }) => (
                <Image
                    source={focused ? require('../resource/images/wd.png') : require('../resource/images/wd.png')}
                    style={{ width: 30, height: 30, tintColor: tintColor }}
                />
            ),
            tabBarOnPress: (({ navigation, defaultHandler }) => {
                defaultHandler();
            })
        }
    }
}, {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: false,
        lazyLoad: true,
        backBehavior: 'none',
        tabBarOptions: {
            activeTintColor: '#FAA732',
            inactiveTintColor: '#999',
            showIcon: true,
            indicatorStyle: {
                height: 0
            },
            style: {
                backgroundColor: '#fff',
                height: 58,
                paddingBottom: 5
            },
            labelStyle: {
                fontSize: 12
            },
        },
    });

const route = (navigation) => {
    if (!navigation.isFocused()) {
        navigation.navigate(navigation.state.routeName, {
            title: navigation.state.routeName
        })
    }
}