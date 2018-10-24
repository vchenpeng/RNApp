/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  AppRegistry, View, StatusBar, Image, AlertIOS, TouchableOpacity, Text
} from "react-native";
import RootStackNavigator from "./src/index"
import NavigationService from './src/navigationService';
import DropdownAlert from 'react-native-dropdownalert';
import DropDownHolder from './src/DropDownHolder';
import SplashScreen from 'react-native-splash-screen'

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
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
}