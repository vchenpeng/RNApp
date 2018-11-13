/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  View, StatusBar, Image, AppState, Alert, TouchableOpacity, Text, NativeAppEventEmitter, NativeModules
} from "react-native";
import RootStackNavigator from "./src/index";
import NavigationService from './src/utils/navigationService';
import DropdownAlert from 'react-native-dropdownalert';
import DropDownHolder from './src/utils/DropDownHolder';
import SplashScreen from 'react-native-splash-screen';
import Getui from 'react-native-getui';
import codePush from 'react-native-code-push';
import RNLanguages from 'react-native-languages';
import i18n from './src/utils/i18n'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '',
      version: '',
      status: '',
      language: i18n.locale
    };

  }
  componentWillMount() {
    //this.updateComponentInfo();
    RNLanguages.addEventListener('change', ({ language }) => {
      Alert.alert(language + '*');
    });
  }

  componentDidMount() {
    SplashScreen.hide();
    this.updateComponentInfo();
    /*
    let mainBridge = NativeModules.MainBridge;
    var array = new Array()
    array[0] = "this"
    array[1] = "is"
    array[2] = "array"
    mainBridge.sendText(2, '传过来的字符', array);
    mainBridge.setBadge(0);
    */
    AppState.addEventListener("change", (newState) => {
      newState === "active" && codePush.sync();
    });

    RNLanguages.language = 'zh-Hans';
    // setInterval(() => {
    //   let tmp = i18n.currentLocale();
    //   let language = tmp == 'en' ? 'zh_CN' : 'en';
    //   this.setState({
    //     language: language
    //   });
    // }, 10000);
  }
  updateComponentInfo() {
    Getui.clientId((param) => {
      this.setState({ 'clientId': param });
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
    i18n.locale = this.state.language;
    return (
      <View style={{ flex: 1 }}>
        <RootStackNavigator
          language={this.state.language}
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
          renderImage={(a, b) => null}
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
NativeAppEventEmitter.addListener('receiveRemoteNotification', (notification) => {
  //Android的消息类型为payload 透传消息 或者 cmd消息
  switch (notification.type) {
    case "cid":
      Alert.alert('初始化获取到', JSON.stringify(notification))
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