/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, StatusBar, Clipboard, AppState, Alert, TouchableOpacity, Text, NativeAppEventEmitter, NativeModules } from 'react-native';
import RootStackNavigator from './src/index';
import NavigationService from './src/utils/navigationService';
import DropdownAlert from 'react-native-dropdownalert';
import DropDownHolder from './src/utils/DropDownHolder';
import SplashScreen from 'react-native-splash-screen';
import Getui from 'react-native-getui';
import CodePush from 'react-native-code-push';
import Orientation from 'react-native-orientation';
import KeyboardManager, { PreviousNextView } from 'react-native-keyboard-manager';
// import BackgroundFetch from 'react-native-background-fetch';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '',
      version: '',
      status: ''
    };
  }
  //如果有更新的提示
  syncImmediate() {
    CodePush.sync({
      //安装模式
      //ON_NEXT_RESUME 下次恢复到前台时
      //ON_NEXT_RESTART 下一次重启时
      //IMMEDIATE 马上更新
      installMode: CodePush.InstallMode.IMMEDIATE
      //对话框
      // updateDialog: {
      //   //是否显示更新描述
      //   appendReleaseDescription: true,
      //   //更新描述的前缀。 默认为"Description"
      //   descriptionPrefix: "",
      //   //强制更新按钮文字，默认为continue
      //   mandatoryContinueButtonLabel: "立即更新",
      //   //强制更新时的信息. 默认为"An update is available that must be installed."
      //   mandatoryUpdateMessage: "",
      //   //非强制更新时，按钮文字,默认为"ignore"
      //   optionalIgnoreButtonLabel: '忽略',
      //   //非强制更新时，确认按钮文字. 默认为"Install"
      //   optionalInstallButtonLabel: '更新',
      //   //非强制更新时，检查到更新的消息文本
      //   optionalUpdateMessage: '',
      //   //Alert窗口的标题
      //   title: '更新提示'
      // }
    });
  }
  componentWillMount() {
    Orientation.lockToPortrait();
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
    AppState.addEventListener('change', newState => {
      newState === 'active' && this.syncImmediate();
      this.getClientID(this.state.clientId);
    });

    KeyboardManager.setKeyboardDistanceFromTextField(0);
    KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false);
    // this.initBackgroundFetch();
  }
  initBackgroundFetch() {
    // Configure it.
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
        // Android options
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false // Default
      },
      () => {
        console.log('[js] Received background-fetch event');
        // Required: Signal completion of your task to native code
        // If you fail to do this, the OS can terminate your app
        // or assign battery-blame for consuming too much background-time
        BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
      },
      error => {
        console.log('[js] RNBackgroundFetch failed to start');
      }
    );

    // Optional: Query the authorization status.
    BackgroundFetch.status(status => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log('BackgroundFetch restricted');
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log('BackgroundFetch denied');
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('BackgroundFetch is enabled');
          break;
      }
    });
  }
  getClientID(cid) {
    try {
      fetch(`http://md.zuorishu.com/getui/${cid}`, {
        method: 'GET'
      });
    } catch (e) {}
  }
  updateComponentInfo() {
    Getui.clientId(param => {
      Clipboard.setString(`${param}`);
      this.setState({ clientId: param });
      this.getClientID(param);
    });

    Getui.version(param => {
      this.setState({ version: param });
    });

    Getui.status(param => {
      let status = '';
      switch (param) {
        case '0':
          status = '正在启动';
          break;
        case '1':
          status = '启动';
          break;
        case '2':
          status = '停止';
          break;
      }
      this.setState({ status: status });
    });
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
          ref={ref => {
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
            justifyContent: 'center',
            height: 36,
            paddingLeft: 8,
            paddingRight: 0
          }}
          zIndex={999}
        />
      </View>
    );
  }
}
NativeAppEventEmitter.addListener('receiveRemoteNotification', notification => {
  //Android的消息类型为payload 透传消息 或者 cmd消息
  switch (notification.type) {
    case 'cid':
      Alert.alert('初始化获取到', JSON.stringify(notification));
      break;
    case 'payload':
      // Alert.alert('payload 消息通知', JSON.stringify(notification))
      break;
    case 'cmd':
      Alert.alert('cmd 消息通知', 'cmd action = ' + notification.cmd);
      break;
    case 'notificationArrived':
      Alert.alert('notificationArrived 通知到达', JSON.stringify(notification));
      break;
    case 'notificationClicked':
      Alert.alert('notificationArrived 通知点击', JSON.stringify(notification));
      break;
    default:
  }
});
NativeAppEventEmitter.addListener('clickRemoteNotification', notification => {
  //Alert.alert('点击通知', JSON.stringify(notification))
});
