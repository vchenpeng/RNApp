import { createBottomTabNavigator } from "react-navigation";
import { AppRegistry, View, StatusBar, Image, AlertIOS } from "react-native";
import React from "react";
import Home from "./Index";
import Market from "./Market";
import Explore from "./Explore";
import Mine from "./Mine";
import { Colors } from "../resource";
import AntDesignIcon from "react-native-vector-icons/AntDesign"

export default createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({ focused, tintColor }) => (
                // <Image
                //     source={focused ? require('../resource/images/home.png') : require('../resource/images/home.png')}
                //     style={{ width: 30, height: 30, tintColor: tintColor }}
                // />
                <AntDesignIcon name='home' size={24} color={tintColor} />
            )
        }
    },
    Market: {
        screen: Market,
        navigationOptions: {
            tabBarLabel: '行情',
            tabBarIcon: ({ focused, tintColor }) => (
                <AntDesignIcon name='flag' size={24} color={tintColor} />
            )
        }
    },
    Explore: {
        screen: Explore,
        navigationOptions: {
            tabBarLabel: '发现',
            tabBarIcon: ({ focused, tintColor }) => (
                <AntDesignIcon name='find' size={24} color={tintColor} />
            )
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ focused, tintColor }) => (
                <AntDesignIcon name='user' size={24} color={tintColor} />
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
            activeTintColor: Colors.theme_color,
            inactiveTintColor: '#999',
            showIcon: true,
            indicatorStyle: {
                height: 0
            },
            style: {
                backgroundColor: '#fff',
                height: 52,
                paddingTop: 7,
                borderTopWidth: 0.5,
                borderTopColor: "#eee"
            },
            iconStyle: {
                width: 24, height: 24
            },
            labelStyle: {
                fontSize: 10,
                marginTop: 0,
                marginBottom: 5,
                textAlign: "center"
            }
        },
    });

const route = (navigation) => {
    if (!navigation.isFocused()) {
        navigation.navigate(navigation.state.routeName, {
            title: navigation.state.routeName
        })
    }
}