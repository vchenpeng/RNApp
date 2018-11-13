import { createBottomTabNavigator } from "react-navigation";
import { AppRegistry, View, Text, Image, AlertIOS, TouchableOpacity, Alert } from "react-native";
import TouchID from 'react-native-touch-id';
import Icon from "react-native-vector-icons/AntDesign";
import React from "react";
import i18n from "../utils/i18n"
import NavigationService from '../utils/navigationService';
import Home from "./Index";
import Market from "./Market";
import Explore from "./Explore";
import Mine from "./Mine";
import { Colors } from "../resource";

const Tabs = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: i18n.t('home'),
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
            tabBarLabel: i18n.t('market'),
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
            tabBarLabel: i18n.t('explore'),
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
            tabBarLabel: i18n.t('mine'),
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
            activeTintColor: Colors.theme_color,
            inactiveTintColor: '#999',
            showIcon: true,
            indicatorStyle: {
                height: 0
            },
            style: {
                backgroundColor: '#fff',
                height: 54,
                paddingBottom: 5,
                borderTopWidth: 0
            },
            iconStyle: {
                width: 27, height: 27
            },
            labelStyle: {
                fontSize: 10,
                textAlign: "center"
            }
        },
    });

Tabs.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    // Alert.alert(i18n.t('home'));
    switch (routeName) {
        case "Home":
            navigationOptions = {
                headerTitle: i18n.t('home'),
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
                headerTitle: i18n.t('market'),
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
                headerTitle: i18n.t('explore'),
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
                headerTitle: i18n.t('mine'),
                headerRight: (<View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('SignIn');
                    }} >
                        <Icon name='mail' size={24} color='white' style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>)
            };
            break;
    }
    return navigationOptions;
};
const route = (navigation) => {
    if (!navigation.isFocused()) {
        navigation.navigate(navigation.state.routeName, {
            title: navigation.state.routeName
        });
    }
}
export default Tabs;