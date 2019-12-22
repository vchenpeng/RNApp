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
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import NavigationService from '../utils/navigationService'

import DropDownHolder from '../utils/DropDownHolder'
import abr from '../utils/abr'

export default class Mine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageIndex: 1,
      list: [],
      refreshing: false
    }
  }

  fetchMarketList() {
    const pageIndex = this.state.pageIndex
    const url = `https://yunduanxin.net/China-Phone-Number/Page/${pageIndex}`
    fetch(url)
      .then(response => response.text())
      .then(response => {
        let originList = this.state.list
        let list = response.match(/(\+86 )\d+/g)
        list = list.map((x, i) => {
          return {
            index: i,
            title: x.substr(4),
            avatar: 'https://yunduanxin.net/img/flags/normal/cn.png',
            subtitle: '在线'
          }
        })
        if (pageIndex > 1) {
          list = originList.concat(list)
        }
        this.setState({
          list: list
        })
        this.setState({ refreshing: false })
      })
      .catch(error => {
        this.setState({ refreshing: false })
        console.error(error)
      })
  }
  componentDidMount() {
    this.fetchMarketList()
  }

  renderRow({ item }) {
    return (
      <TouchableHighlight
        activeOpacity={0.85}
        underlayColor="#000"
        onPress={() => {
          // let url = `https://yunduanxin.net/info/86${item.title}/`;
          NavigationService.navigate('SmsDetail', { phone: item.title })
          // NavigationService.navigate('SmsDetail', { title: item.title, key: item.key });
        }}
      >
        <View style={{ backgroundColor: '#fff' }}>
          <ListItem
            style={[styles.item, { flexDirection: 'column' }]}
            containerStyle={{
              backgroundColor: '#fff',
              padding: 0,
              margin: 0,
              borderBottomWidth: 0,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 10
            }}
            key={item.index}
            avatar={
              <Avatar width={60} height={40} avatarStyle={{ borderRadius: 0, backgroundColor: '#fff', margin: 20 }} source={{ uri: item.avatar }} />
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
            title={item.title}
            subtitle={item.subtitle}
            // rightTitle={0}
            rightTitleStyle={[
              {
                backgroundColor: '#d43f3a',
                paddingTop: 5,
                paddingBottom: 5,
                width: 50,
                color: '#fff',
                fontSize: 12,
                textAlign: 'center'
              },
              { backgroundColor: '#d43f3a' }
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
  calcAbr(query, body) {
    let queryStr = this.concatQuery(query)
    return abr({
      url: `https://api.beidian.com/mroute.html?${queryStr}`,
      type: 'POST',
      query: query,
      body: body
    })
  }
  concatQuery(queryObj) {
    let queryArr = []
    for (const key in queryObj) {
      if (queryObj.hasOwnProperty(key)) {
        const element = queryObj[key]
        queryArr.push(`${key}=${element}`)
      }
    }
    return queryArr.join('&')
  }
  async getSmsCode(item) {
    let tel = item.title
    const query = {
      method: 'beidian.user.code.send',
      _airborne_channel: 'beidian'
    }
    const body = {
      tel: tel,
      key: 'quick_access'
    }
    const queryStr = this.concatQuery(query)
    const bodyStr = this.concatQuery(body)
    const abrStr = this.calcAbr(query, body)
    const url = `https://api.beidian.com/mroute.html?${queryStr}&_abr_=${abrStr}`
    fetch(url, {
      method: 'POST',
      body: bodyStr,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    })
      .then(r => r.json())
      .then(async response => {
        if (response.success) {
          DropDownHolder.alert(response.message, '', 'info')
        } else {
          DropDownHolder.alert(response.message, '', 'info')
        }
      })
      .catch(error => {
        DropDownHolder.alert('发送出错', '', 'info')
      })
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
                onPress={_ => this.closeRow(rowMap, data.item.title)}
              >
                <Text style={styles.backTextWhite}>关闭</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={_ => {
                  this.getSmsCode(data.item)
                  this.closeRow(rowMap, data.item.title)
                }}
              >
                <Text style={styles.backTextWhite}>发送</Text>
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
            return rowData.title.toString()
          }}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            NativeModules.MainBridge.playSystemAudio(1100)
            this.setState({ refreshing: true })
            this.setState({
              pageIndex: 1
            })
            this.fetchMarketList()
          }}
          onEndReached={() => {
            this.setState({
              pageIndex: this.state.pageIndex + 1
            })
            this.fetchMarketList()
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
