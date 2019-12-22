import React, { Component } from 'react'
import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  NativeModules
} from 'react-native'
import { Header, List, ListItem, Avatar, CheckBox } from 'react-native-elements'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import NavigationService from '../utils/navigationService'
import tool from '../utils/tool'

export default class Punch extends Component {
  //接收上一个页面传过来的title显示出来
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '',
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: '400',
      alignSelf: 'center',
      color: '#fff'
    },
    headerMode: 'screen',
    headerRight: (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.handlePunch()
          }}
        >
          <EntypoIcon name="controller-record" size={24} color="white" style={{ marginRight: 15 }} />
        </TouchableOpacity>
      </View>
    )
  })
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      token: ''
    }
  }
  auth() {
    const url = 'http://oa.sandload.cn:8080/jc6/oauth/token'
    let params = `grant_type=password&username=FM00449&password=877235336C47AC9F6FBD2A5AFB7FEC5C438D3E7F&client_id=m1&client_secret=s1`
    fetch(url, {
      method: 'POST',
      headers: {
        Host: 'oa.sandload.cn:8080',
        'Content-Type': 'application/x-www-form-urlencoded',
        Origin: 'file://',
        Connection: 'keep-alive',
        Accept: 'application/json',
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148,tag=jhwebview,appid=c4b85efd-5ad0-4161-8249-cacd037ed15c,versionCode=5.0.0,versionwebview=5.0.0,from=IOS,deviceid=40D9CF9A-0BDD-409E-8C84-6C46B03EDBDE,haveAliPaySDK=1,haveWeixinPaySDK=1,havePaypalSDK=1,haveCCPSelectPeopleForH5=1,haveYjpaySDK=1,haveMiniProgram=1 (4446756864) (4471294464) (4447204352) (4571982848) (4571847168) (4571847168) (4463237120) (4479812608) (4572061696) (4572011520) (4572274176) (4572077568)',
        Authorization: 'Bearer 8cd7fc25-a772-4a6f-934a-e854f254541e',
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate'
      },
      body: params
    })
      .then(response => response.json())
      .then(response => {
        if (!!response.access_token) {
          this.setState({
            token: response.access_token
          })
          this.fetchPunchList()
        }
      })
      .catch(error => console.error(error))
  }
  fetchPunchList() {
    const url = 'http://oa.sandload.cn:8080/jc6/api/Attendance/OwnSiteNoteList'
    let params = {
      count: '5',
      getType: 'more',
      siteNoteTime: tool.formatDateTime(+new Date()),
      startDateTime: '',
      endDateTime: '',
      wqqd: 'false',
      kqqd: 'true',
      key: '',
      baseUrl: 'http://oa.sandload.cn:8080/jc6/'
    }
    fetch(url, {
      method: 'POST',
      headers: {
        Host: 'oa.sandload.cn:8080',
        'Content-Type': 'application/json',
        Origin: 'file://',
        Connection: 'keep-alive',
        Accept: 'application/json',
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148,tag=jhwebview,appid=c4b85efd-5ad0-4161-8249-cacd037ed15c,versionCode=5.0.0,versionwebview=5.0.0,from=IOS,deviceid=40D9CF9A-0BDD-409E-8C84-6C46B03EDBDE,haveAliPaySDK=1,haveWeixinPaySDK=1,havePaypalSDK=1,haveCCPSelectPeopleForH5=1,haveYjpaySDK=1,haveMiniProgram=1 (4446756864) (4471294464) (4447204352) (4571982848) (4571847168) (4571847168) (4463237120) (4479812608) (4572061696) (4572011520) (4572274176) (4572077568)',
        Authorization: `Bearer ${this.state.token}`,
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate'
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(response => {
        let list = []
        if (response.mes == 'ok') {
          list = response.ownNoteInfos
        }
        this.setState({
          list: list
        })
        this.setState({ refreshing: false })
      })
      .catch(error => console.error(error))
  }
  handlePunch() {
    const url = 'http://oa.sandload.cn:8080/jc6/api/Attendance/WriteSiteNote'
    let params = {
      sysCurTime: tool.formatDateTime(+new Date()),
      mark: '',
      siteAddress: '上海市嘉定区南华路靠近苏民学校',
      siteGPS: '[121.305109331,31.293174654]',
      siteNoteId: '',
      files: [],
      taskTypeId: '2000',
      timeId: '4028838e680c532201683bad26240be8',
      workShiftBeginDate: tool.formatDate(+new Date()),
      paibanId: '4028e5eb6b28108e016b69608c0231b5'
    }
    fetch(url, {
      method: 'POST',
      headers: {
        Host: 'oa.sandload.cn:8080',
        'Content-Type': 'application/json',
        Origin: 'file://',
        Connection: 'keep-alive',
        Accept: 'application/json',
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148,tag=jhwebview,appid=c4b85efd-5ad0-4161-8249-cacd037ed15c,versionCode=5.0.0,versionwebview=5.0.0,from=IOS,deviceid=40D9CF9A-0BDD-409E-8C84-6C46B03EDBDE,haveAliPaySDK=1,haveWeixinPaySDK=1,havePaypalSDK=1,haveCCPSelectPeopleForH5=1,haveYjpaySDK=1,haveMiniProgram=1 (4446756864) (4471294464) (4447204352) (4571982848) (4571847168) (4571847168) (4463237120) (4479812608) (4572061696) (4572011520) (4572274176) (4572077568)',
        Authorization: `Bearer ${this.state.token}`,
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate'
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(response => {
        Alert.alert('', JSON.stringify(response))
      })
      .catch(error => console.error(error))
  }
  login() {}
  componentDidMount() {
    this.auth()
  }
  renderRow({ item }) {
    return (
      <TouchableHighlight
        activeOpacity={0.85}
        underlayColor="#000"
        onPress={() => {
          // NavigationService.navigate('MarketDetail', { title: item.title, key: item.key });
        }}
      >
        <View style={{ backgroundColor: '#fff' }}>
          <ListItem
            style={[styles.item, { flexDirection: 'column' }]}
            containerStyle={{
              backgroundColor: '#ffffff',
              padding: 0,
              margin: 0,
              borderBottomWidth: 0,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 10
            }}
            key={item.noteId}
            avatar={
              <Avatar
                width={40}
                height={40}
                avatarStyle={{ borderRadius: 0, backgroundColor: '#fff', margin: 20 }}
                source={require('../resource/qrcode/avatar.jpg')}
              />
            }
            titleStyle={{ fontSize: 14 }}
            subtitleStyle={{ fontSize: 12 }}
            titleContainerStyle={{
              height: 20,
              marginLeft: 10,
              marginRight: 10,
              justifyContent: 'center'
            }}
            subtitleContainerStyle={{ justifyContent: 'center', marginLeft: 10, height: 20 }}
            title={item.notedate + ' ' + item.noteTime}
            subtitle={item.noteAddress}
            rightTitle={item.weekday}
            rightTitleStyle={[
              {
                backgroundColor: '#d43f3a',
                paddingTop: 5,
                paddingBottom: 5,
                width: 50,
                color: '#fff',
                fontSize: 12,
                textAlign: 'center'
              }
            ]}
            checkmark={false}
            chevron={false}
            rightAvatar={false}
            rightIcon={<View />}
            buttonGroup={null}
            rightTitleContainerStyle={{ width: 60, flex: 0 }}
          />
        </View>
      </TouchableHighlight>
    )
  }
  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <SwipeListView
          style={{ backgroundColor: '#eee' }}
          useFlatList={true}
          data={this.state.list}
          renderItem={(rowData, rowMap) => this.renderRow(rowData, rowMap)}
          swipeRowStyle={{ borderBottomWidth: 1, borderBottomColor: '#eee' }}
          directionalDistanceChangeThreshold={1}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <Text></Text>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={_ => this.closeRow(rowMap, data.item.key)}
              >
                <Text style={styles.backTextWhite}>关闭</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={_ => this.closeRow(rowMap, data.item.key)}
              >
                <Text style={styles.backTextWhite}>删除</Text>
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-150}
          disableRightSwipe={true}
          friction={10}
          tension={0}
          recalculateHiddenLayout={false}
          previewDuration={0}
          previewOpenValue={0.01}
          keyExtractor={(rowData, index) => {
            return rowData.noteId
          }}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            NativeModules.MainBridge.playSystemAudio(1100)
            this.setState({ refreshing: true })
            this.fetchPunchList()
          }}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: '#FAA732',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: '#d43f3a',
    right: 0
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: Dimensions.get('window').width / 4
  }
})
