import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  RefreshControl,
  Dimensions,
  Clipboard,
  NativeModules,
  StyleSheet,
  FlatList,
  StatusBar,
  AlertIOS,
  DatePickerIOS,
  TouchableOpacity
} from 'react-native';
import { Header, Button, ListItem, Avatar, CheckBox } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import { Constants, Images, Colors } from '../resource';
import DropDownHolder from '../utils/DropDownHolder';

export default class Mine extends Component {
  //接收上一个页面传过来的title显示出来
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '我的',
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: '400',
      alignSelf: 'center',
      color: '#fff'
    },
    headerMode: 'screen',
    headerStyle: { backgroundColor: '#376fff' },
    headerRight: (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Web')}>
          <Text style={{ paddingRight: 14, color: '#fff', fontSize: 18 }}>图文</Text>
        </TouchableOpacity>
      </View>
    ),
    headerLeft: null
  });
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    let { height, width } = Dimensions.get('window');
    const { navigate } = this.props.navigation;
    let _scrollView = ScrollView;

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar barStyle="light-content" />
        <View />
      </View>
    );
  }
}
