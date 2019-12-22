import React, { Component } from 'react'
import { Text, Image, SafeAreaView, View, StyleSheet, Clipboard, Alert, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'
import { Header, List, ListItem, Avatar, CheckBox } from 'react-native-elements'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import NavigationService from '../utils/navigationService'
import { Constants, Images, Colors } from '../resource'
import InjectedWeb from '../utils/injectedWeb'

export default class Web extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params ? params.title : null,
      headerRight: (
        <View>
          <TouchableOpacity
            onPress={() => {
              let url = params.url
              Clipboard.setString(url)
              Alert.alert('地址', url)
            }}
          >
            <EntypoIcon name="dots-three-horizontal" size={24} color="white" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        </View>
      ),
      gesturesEnabled: true
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
  }
  webview
  componentDidMount() {
    let url = this.props.navigation.state.params.url
    this.setState({ url: url })
  }
  onNavigationStateChange(navState) {
    let title = Math.abs(navState.title.indexOf('http')) ? navState.title : ''
    this.props.navigation.setParams({ title: title })
  }

  render() {
    const { navigation } = this.props
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <WebView
          ref={w => (this.webview = w)}
          source={{ uri: this.state.url }}
          startInLoadingState={true}
          hideKeyboardAccessoryView={true}
          allowsBackForwardNavigationGestures={false}
          allowsLinkPreview={true}
          decelerationRate="normal"
          dataDetectorTypes="none"
          injectedJavaScript={InjectedWeb}
          renderLoading={() => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
              <Image source={Images.ic_webloading} />
            </View>
          )}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          onLoadEnd={() => {
            let obj = { code: 'NW001', data: [], msg: '加载完毕' }
            this.webview.postMessage(JSON.stringify(obj))
          }}
        />
      </SafeAreaView>
    )
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
})
