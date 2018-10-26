/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  View, StatusBar, Image, Alert, TouchableOpacity, Text, NativeAppEventEmitter, NativeModules
} from "react-native";
import RootStackNavigator from "./src/index"
import NavigationService from './src/navigationService';
import DropdownAlert from 'react-native-dropdownalert';
import DropDownHolder from './src/DropDownHolder';
import SplashScreen from 'react-native-splash-screen';
import Getui from 'react-native-getui'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '',
      version: '',
      status: ''
    };

  }
  componentWillMount() {
    //this.updateComponentInfo();
  }

  componentDidMount() {
    SplashScreen.hide();
    this.updateComponentInfo();

    let getuiBridge = NativeModules.GetuiBridge;
    var array = new Array()
    array[0] = "this"
    array[1] = "is"
    array[2] = "array"
    getuiBridge.sendText(2, '传过来的字符', array);
    getuiBridge.setBadge(9);
  }
  updateComponentInfo() {
    Getui.clientId((param) => {
      this.setState({ 'clientId': param });
      //DropDownHolder.alert('个推clientId', param);
    })

    Getui.version((param) => {
      this.setState({ 'version': param })
    })

    Getui.status((param) => {
      let status = ''
      switch (param) {
        case '0':
          status = '正在启动'
          break;
        case '1':
          status = '启动'
          break;
        case '2':
          status = '停止'
          break;
      }
      this.setState({ 'status': status });
    })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <RootStackNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        <DropdownAlert
          ref={(ref) => {
            DropDownHolder.setDropDown(ref);
          }}
          activeStatusBarStyle="light-content"
          startDelta={-100}
          endDelta={0}
          closeInterval={2000}
          replaceEnabled={true}
          titleNumOfLines={1}
          messageNumOfLines={0}
          translucent={true}
          updateStatusBar={false}
          sensitivity={20}
          renderImage={(a, b) => {
            return null;
          }}
          defaultTextContainer={{
            flex: 1,
            justifyContent: "center",
            height: 36,
            paddingLeft: 8,
            paddingRight: 0
          }}
        />
      </View>
    );
  }
};
NativeAppEventEmitter.addListener(
  'receiveRemoteNotification',
  (notification) => {
    //Android的消息类型为payload 透传消息 或者 cmd消息
    switch (notification.type) {
      case "cid":
        Alert.alert('初始化获取到cid', JSON.stringify(notification))
        break;
      case 'payload':
        Alert.alert('payload 消息通知', JSON.stringify(notification))
        break
      case 'cmd':
        Alert.alert('cmd 消息通知', 'cmd action = ' + notification.cmd)
        break
      case 'notificationArrived':
        Alert.alert('notificationArrived 通知到达', JSON.stringify(notification))
        break
      case 'notificationClicked':
        Alert.alert('notificationArrived 通知点击', JSON.stringify(notification))
        break
      default:
    }
  }
);
NativeAppEventEmitter.addListener('clickRemoteNotification', (notification) => {
  //Alert.alert('点击通知', JSON.stringify(notification))
});