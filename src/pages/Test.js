import React, { Component } from 'react';
import { Text, Image, SafeAreaView, View, StyleSheet, Clipboard, Alert, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Header, List, ListItem, Avatar, CheckBox } from 'react-native-elements';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import NavigationService from '../utils/navigationService';
import { Constants, Images, Colors } from '../resource';

export default class Test extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.title : null,
      header: null,
      gesturesEnabled: true
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };
  }
  componentDidMount() {
    let url = this.props.navigation.state.params.url;
    this.setState({ url: url });
  }
  onNavigationStateChange(navState) {
    let title = Math.abs(navState.title.indexOf('http')) ? navState.title : '';
    this.props.navigation.setParams({ title: title });
  }

  render() {
    const { navigation } = this.props;
    return (
      <WebView
        source={{ uri: this.state.url }}
        startInLoadingState={true}
        hideKeyboardAccessoryView={true}
        allowsBackForwardNavigationGestures={false}
        allowsLinkPreview={true}
        decelerationRate="normal"
        dataDetectorTypes="none"
        renderLoading={() => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <Image source={Images.ic_webloading} />
          </View>
        )}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      />
    );
  }
}
const styles = StyleSheet.create({
  item: {
    padding: 40,
    borderColor: 'red'
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  }
});
