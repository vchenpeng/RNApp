import React, { Component } from 'react'
import {
  Text,
  Image,
  View,
  SafeAreaView,
  Easing,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  Dimensions,
  Clipboard,
  NativeModules,
  StyleSheet,
  StatusBar,
  Alert,
  Animated,
  AsyncStorage
} from 'react-native'
import Modal from '../components/ModalBox'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { Header, Button, ListItem, Avatar } from 'react-native-elements'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import { WebView } from 'react-native-webview'
import NavigationService from '../utils/navigationService'
import { Constants, Images, Colors } from '../resource'
import DropDownHolder from '../utils/DropDownHolder'
import tool from '../utils/tool'
import InjectedJavaScript from '../utils/InjectedJavaScript'
import abr from '../utils/abr'
import RNShakeEvent from 'react-native-shake-event'
import { ActionSheetCustom as ActionSheet } from '../components/ActionSheet/index'

let self
let nextPlatformIndex = 0 // 天猫

export default class BeiDianNew extends Component {
  //接收上一个页面传过来的title显示出来
  static navigationOptions = ({ navigation }) => {
    let { params } = navigation.state
    let rotateZ = (params.animatedValue || new Animated.Value(0)).interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '720deg']
    })
    return {
      headerTitle: (
        <View style={styles.headerTitleContainer}>
          <Text style={styles.titleText}>{params && params.title ? params.title : '贝店情报局'}</Text>
          <Text style={styles.subtitleText}>
            情报局:{(params && params.products ? params.products.length : 0).toString()},检验科:
            {(params ? params.jykAcceptCount + params.jykRejectCount : 0).toString()},余额:￥
            {(params && params.accountOverview ? params.accountOverview.balance : 0).toFixed(2)}
          </Text>
        </View>
      ),
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: '400',
        alignSelf: 'center',
        color: '#fff'
      },
      headerMode: 'card',
      headerStyle: {
        backgroundColor: Colors.theme_color,
        borderBottomWidth: 0
      },
      headerRight: (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.state.params.changePlatform.call(self)
            }}
          >
            <Animated.View style={{ width: 20, height: 20, marginRight: 10, transform: [{ rotateZ: rotateZ }] }}>
              <AntDesignIcon name="loading1" size={20} color="white" style={{}} />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.state.params.showOptions()
            }}
          >
            <AntDesignIcon name="iconfontdesktop" size={24} color="white" style={{ width: 24, height: 24, marginRight: 15 }} />
            {/* <View
              style={{
                position: 'absolute',
                right: 12,
                top: -4,
                paddingTop: 1,
                paddingBottom: 1,
                paddingLeft: 3,
                paddingRight: 3,
                backgroundColor: 'red',
                borderRadius: 3
              }}
            >
              <Text style={{ fontSize: 10, color: '#fff' }}>{(params && params.products ? params.products.length : 0).toString()}</Text>
            </View> */}
          </TouchableOpacity>
        </View>
      )
    }
  }
  webview
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      isShowLogin: false,
      id: null,
      pid: 91286199,
      products: [],
      historys: [],
      lowest: 0.25,
      audioCode: 1009, // 提交成功提示音
      isSilence: true, // 是否静音
      actionSheetStyles: {},
      jykAcceptCount: 0,
      jykRejectCount: 0,
      jykTasks: [],
      jykTaskStatus: 1,
      authInfo: {
        jsSessionID: null,
        uid: null
      },
      accountOverview: null
    }
    this.animatedValue = new Animated.Value(0)
    this.rotateAnimated = Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false
    })
    this.activePool = []
    self = this
  }
  startAnimated() {
    this.activePool.shift()
    this.animatedValue.setValue(0)
    this.rotateAnimated.start(() => {
      if (this.activePool.length > 0) {
        this.startAnimated()
      }
    })
  }
  // 激活动画
  activeAnimate(...args) {
    let params = args || [1]
    if (this.activePool.length == 0) {
      this.activePool.push(...params)
      this.startAnimated()
    } else {
      this.activePool.push(...params)
    }
  }
  setLoginModalStatus(flag) {
    self.setState({ isShowLogin: flag })
  }
  openLogin() {
    this.setState({ isShowLogin: !this.state.isShowLogin })
  }
  checkIn(str, arr) {
    let result = false
    for (let i = 0; i < arr.length; i++) {
      if (str.toUpperCase().indexOf(arr[i].toUpperCase()) > -1) {
        result = true
        break
      } else {
        continue
      }
    }
    return result
  }
  changePlatform() {
    let code = [13, 12, 6, 2, 1][nextPlatformIndex]
    let codeName = this.switchPlatformName(code)
    let obj = {
      code: 'NW1003',
      data: code,
      msg: `手动切换至${codeName}平台.`
    }
    this.webview.postMessage(JSON.stringify(obj))
    self.playSysAudio(1001)
    nextPlatformIndex += 1
    nextPlatformIndex = nextPlatformIndex > 4 ? 0 : nextPlatformIndex
  }
  getAccountOverview() {
    const token = this.state.authInfo.jsSessionID
    const uid = this.state.authInfo.uid
    const url = `https://imapi.beidian.com/server/gateway?method=voc.ia.account.overview&uid=${uid}`
    return fetch(url, {
      method: 'GET',
      headers: {
        cookie: `JSESSIONID=${token};  _logged_=${uid};`
      },
      credentials: 'include'
    })
      .then(r => r.json())
      .then(response => {
        if (response.success) {
          this.props.navigation.setParams({ accountOverview: response.body })
          this.setState({
            accountOverview: response.body
          })
        }
      })
      .catch(error => {
        return null
      })
  }
  searchWPH(product) {
    const url = `https://m.vip.com/server.html?rpc&method=SearchRpc.getSearchList&f=www`
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        method: 'SearchRpc.getSearchList',
        params: {
          page: 'searchlist.html',
          channel_id: '',
          keyword: product.title,
          np: 1,
          ep: 80,
          brand_ids: '',
          brand_store_sn: '',
          props: '',
          sort: 0,
          category_id_1_show: '',
          category_id_1_5_show: '',
          category_id_2_show: '',
          category_id_3_show: '',
          query: ''
        },
        id: 1548416963527,
        jsonrpc: '2.0'
      }),
      headers: {
        authorization: 'OAuth api_sign=9499c033242a2dd1a0e38e03a136acd86d17d194'
      },
      credentials: 'include'
    })
      .then(r => r.json())
      .then(wphInfo => {
        let returnUrl = null
        try {
          let wphInfoData = wphInfo[0]['result']['data']
          if (wphInfoData) {
            let products = wphInfoData['products']
            if (products && products.length > 0) {
              let pools = []
              for (let i = 0; i < products.length; i++) {
                let item = products[i]
                let brands = product.brandName.split('/')
                let percent = this.strSimilarity2Percent(product.title, item['product_name'])
                if (this.checkIn(item['brand_name'], brands)) {
                  let productUrl = item['product_url']
                  let tmpWord = this.randomWord(false, 40, 40)
                  let chlParam = encodeURIComponent('share:' + this.randomWord(false, 10, 10))
                  let rUrl = `https://m.vip.com${productUrl}?msns=iphone-6.36-link&st=p-url&cid=${tmpWord}&chl_param=${chlParam}&abtid=13&uid=&percent=${percent}`

                  let itemProduct = {
                    index: i,
                    percent: percent,
                    returnUrl: rUrl
                  }
                  pools.push(itemProduct)
                }
              }
              let sortPools = pools.sort((x, y) => {
                return y.percent - x.percent
              })
              if (sortPools.length > 0) {
                returnUrl = sortPools[0].returnUrl
              } else {
                returnUrl = null
              }
            }
          }
        } catch (e) {
          returnUrl = null
        }
        return returnUrl
      })
      .catch(error => {
        return null
      })
  }
  searchJD(product) {
    const url = `https://so.m.jd.com/ware/search._m2wq_list?keyword=${
      product.title
    }&datatype=1&page=1&pagesize=80&ext_attr=no&brand_col=no&price_col=no&color_col=no&size_col=no&ext_attr_sort=no&merge_sku=yes&multi_suppliers=yes&qp_disable=no&t1=1548735239631&callback=self.handleJD`
    return fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        let jdInfo = eval(response._bodyInit)

        let returnUrl = null
        try {
          if (jdInfo.retcode == 0) {
            let paragraph = jdInfo['data']['searchm']['Paragraph']
            if (paragraph && paragraph.length > 0) {
              let brands = product.brandName.split('/')
              let keywords = ['自营', '旗舰店']
              let pools = []
              for (let i = 0; i < paragraph.length; i++) {
                let item = paragraph[i]
                let percent = this.strSimilarity2Percent(product.title, item.warename)

                if (
                  this.checkIn(item['shop_name'], keywords) &&
                  this.checkIn(item['shop_name'], brands)
                  // Math.abs(product.price - item.dredisprice) < 30
                ) {
                  let tmpWord = this.randomWord(false, 58, 58)
                  let rUrl = `https://item.m.jd.com/product/${
                    item['wareid']
                  }.html?utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=CopyURL&ad_od=share&ShareTm=UR/2rpYRZHzD0mzmwsDuvGGPkIUrDcVrAxQdUUhlOLIkXbxrj1ZJgr5i53aW6ltlDIKjFz1Y74ACszYuDntDe5vNDWsdw%2BHFGFYU00pXwsfNKpsYE/${tmpWord}`

                  let itemProduct = {
                    index: i,
                    percent: percent,
                    returnUrl: rUrl
                  }
                  pools.push(itemProduct)
                }
              }
              let sortPools = pools.sort((x, y) => {
                return y.percent - x.percent
              })
              if (sortPools.length > 0) {
                returnUrl = sortPools[0].returnUrl
              } else {
                returnUrl = null
              }
            }
          }
        } catch (e) {
          returnUrl = null
        }
        return returnUrl
      })
      .catch(error => {
        return null
      })
  }
  handleJD(jdInfo) {
    return jdInfo
  }
  searchTM(product) {
    // 12专营店
    let tmShopType = 1
    let keywords = []
    switch (product.platform) {
      case 1:
        tmShopType = 1 //旗舰店
        keywords = ['天猫超市', '旗舰店', '直营']
        break
      case 13:
        tmShopType = 2 //专卖店
        keywords = ['专卖店']
        break
      case 12:
        tmShopType = 3 //专营店
        keywords = ['专营店', '专营']
        break
    }

    const url = `https://list.tmall.com/m/search_items.htm?page_size=80&page_no=1&q=${
      product.title
    }&type=p&vmarket=&spm=875.7931836%2FB.a2227oh.d100&from=mallfp..pc_1_searchbutton&shop_type=${tmShopType}`
    return fetch(url, {
      method: 'GET',
      headers: {
        referer: 'https://list.tmall.com/search_product.htm?q=444&type=p&vmarket=&spm=875.7931836%2FB.a2227oh.d100&from=mallfp..pc_1_searchbutton'
      },
      credentials: 'include'
    })
      .then(response => {
        let returnUrl = null
        try {
          let dataStr = response._bodyInit
            .replace(/\\n/g, '')
            .replace(/\\"/g, '"')
            .replace(/\)"/g, '')
          let tmInfo = JSON.parse(dataStr)
          let item = tmInfo['item']
          if (item && item.length > 0) {
            let pools = []
            for (let i = 0; i < item.length; i++) {
              let percent = this.strSimilarity2Percent(product.title, item[i]['title'])
              if (tmShopType == 2 || tmShopType == 3) {
                let brands = product.brandName.split('/')
                // if (item[i]["shop_name"] == product.taskShopName && this.checkIn(item[i]["shop_name"], keywords) && this.checkIn(item[i]["shop_name"], brands)
                //     && Math.abs(product.price - item[i].price) < 30) {
                if (item[i]['shop_name'] == product.taskShopName && percent > this.state.lowest) {
                  let rUrl = `https:${item[i].url}&percent=${percent}`
                  let itemProduct = {
                    index: i,
                    percent: percent,
                    returnUrl: rUrl
                  }
                  pools.push(itemProduct)
                } else {
                  continue
                }
              } else {
                let brands = product.brandName.split('/')
                if (this.checkIn(item[i]['shop_name'], keywords) && this.checkIn(item[i]['shop_name'], brands)) {
                  let rUrl = `https:${item[i].url}`
                  let itemProduct = {
                    index: i,
                    percent: percent,
                    returnUrl: rUrl
                  }
                  pools.push(itemProduct)
                } else {
                  continue
                }
              }
            }
            let sortPools = pools.sort((x, y) => {
              return y.percent - x.percent
            })
            if (sortPools.length > 0) {
              returnUrl = sortPools[0].returnUrl
            } else {
              returnUrl = null
            }
          }
        } catch (e) {
          returnUrl = null
        }
        return returnUrl
      })
      .catch(error => {
        return null
      })
  }
  randomWord(randomFlag, min, max) {
    let str = '',
      range = min,
      arr = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]

    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min
    }
    for (let i = 0; i < range; i++) {
      pos = Math.round(Math.random() * (arr.length - 1))
      str += arr[pos]
    }
    return str
  }
  switchPlatformName(code) {
    let platformName = '未知'
    switch (code) {
      case 1:
        platformName = '天猫'
        break
      case 2:
        platformName = '京东'
        break
      case 6:
        platformName = '唯品会'
        break
      case 12:
        platformName = '天猫专营店'
        break
      case 13:
        platformName = '天猫专卖店'
        break
      default:
        break
    }
    return platformName
  }
  strSimilarity2Number(s, t) {
    var n = s.length,
      m = t.length,
      d = []
    var i, j, s_i, t_j, cost
    if (n == 0) return m
    if (m == 0) return n
    for (i = 0; i <= n; i++) {
      d[i] = []
      d[i][0] = i
    }
    for (j = 0; j <= m; j++) {
      d[0][j] = j
    }
    for (i = 1; i <= n; i++) {
      s_i = s.charAt(i - 1)
      for (j = 1; j <= m; j++) {
        t_j = t.charAt(j - 1)
        if (s_i == t_j) {
          cost = 0
        } else {
          cost = 1
        }
        d[i][j] = this.minimum(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      }
    }
    return d[n][m]
  }
  //两个字符串的相似程度，并返回相似度百分比
  strSimilarity2Percent(s, t) {
    var l = s.length > t.length ? s.length : t.length
    var d = this.strSimilarity2Number(s, t)
    return 1 - d / l
  }
  minimum(a, b, c) {
    return a < b ? (a < c ? a : c) : b < c ? b : c
  }
  calcAbr(method, body) {
    return abr({
      url: `https://api.beidian.com/mroute.html?method=${method}`,
      type: 'POST',
      query: { method: method },
      body: body
    })
  }
  async login(tel, code) {
    const method = 'beidian.auth.quick.web'
    let abr = this.calcAbr(method, {
      tel: tel,
      code: code,
      shop_id: ''
    })
    const url = `https://api.beidian.com/mroute.html?method=${method}&_abr_=${abr}`
    let token = await fetch(url, {
      method: 'POST',
      body: `tel=${tel}&code=${code}&shop_id=`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    })
      .then(async response => {
        let body = await response.json()
        if (body.success) {
          const uid = body.data || 0
          Clipboard.setString(JSON.stringify(response.headers))
          let cookieText = `${response.headers['map']['set-cookie']}`
          let cookies = cookieText.split(',').filter(function(c) {
            return c.indexOf('JSESSIONID') >= 0
          })
          let cookie = cookies[0]
          let token = cookie.split(';')[0].split('=')[1]
          await AsyncStorage.setItem('JSESSIONID', token)
          await AsyncStorage.setItem('UID', `${uid}`)
          this.setState({
            authInfo: {
              jsSessionID: token,
              uid: `${uid}`
            }
          })
          DropDownHolder.alert('登录成功', '', 'info')
          this.postWebMessage('NW1007', [{ key: 'JSESSIONID', value: token }, { key: '_logged_', value: `${uid}` }])
          return token
        } else {
          Alert.alert('登录失败', body.message)
          return ''
        }
      })
      .catch(error => {
        Alert.alert('登录出错', error)
        return ''
      })
    return token
  }
  trim(str) {
    return str.replace(/\s+/g, '')
  }
  // 获取BD商品
  getBdProduct(task) {
    let url = `https://im.beidian.com/service/intelligence/product?iid=${task.iid}`
    return fetch(url, {
      method: 'GET',
      body: null,
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      credentials: 'include'
    })
      .then(r => r.json())
      .then(products => {
        let topBdProduct = products[0]
        // 可能存在以下数据情况：
        // [{"message":"该商品暂不可购买或已下架..","success":false,"hint":{"title":"很遗憾，你来晚啦！","subtitle":"商品已经下架啦~"}}]
        if (topBdProduct.id > 0) {
          //task.checkTaskId
          let percent = this.strSimilarity2Percent(this.trim(topBdProduct.title.toUpperCase()), this.trim(task.productTitle.toUpperCase()))
          task.percent = percent
          // 声音提示
          this.playSysAudio(1114)

          let taskBrandName = this.trim(task.brandName)
          let bdBrandName = ''
          let list = topBdProduct.detail.filter(x => x.type == 'features' && Array.isArray(x.features))
          if (list.length > 0) {
            let features = list[0]['features']
            let props = features.filter(y => y.prop_name == '品牌')
            if (props.length > 0 && !!props[0]['prop_value']) {
              bdBrandName = this.trim(props[0]['prop_value'])
            }
          }

          let bdBrandPools = bdBrandName.split('/')
          let taskBrandPools = taskBrandName.split('/')
          // 比较品牌相似度begin
          let brandPercent = 0 // 品牌相似度
          let result = []
          bdBrandPools.forEach(a => {
            let arr = taskBrandPools.map(b => {
              // 只有二者都存在品牌时比较，否则品牌相似度为0
              if (a && b) {
                return this.strSimilarity2Percent(a.toUpperCase(), b.toUpperCase())
              } else {
                return 0
              }
            })
            result = result.concat(arr)
          })
          brandPercent = Math.max(...result)

          // 如果任务商品名中存在贝店商品品牌名，默认品牌相似度为0.5
          if (brandPercent == 0) {
            const tmpArr = bdBrandPools.filter(t => {
              return !!t && task.productTitle.toUpperCase().indexOf(t.toUpperCase()) > -1
            })
            brandPercent = tmpArr.length > 0 ? 0.3 : brandPercent
          }
          // 比较品牌相似度end

          // 暂时品牌相似度大于0.3,商品相似度大于0.04;
          //（0.04 / 5 / 65, 0.03 / 12 / 46, 0.035/11/66, 0.045/8/69）
          // task.handle = brandPercent > 0.2 && percent >= 0 ? 'accept' : 'reject'
          task.handle = brandPercent > 0.19 && percent >= 0.03 ? 'accept' : 'reject'
          task.percent = percent
          task.brandPercent = brandPercent
          task.bdBrandName = bdBrandName

          let jykTasks = this.state.jykTasks
          jykTasks.push({
            task: task,
            bdProduct: topBdProduct,
            submitTime: new Date().getTime()
          })
          // jyk任务分开统计
          if (task.handle == 'accept') {
            let jykAcceptCount = this.state.jykAcceptCount
            jykAcceptCount++
            this.setState({
              jykAcceptCount: jykAcceptCount,
              jykTasks: jykTasks
            })
          } else {
            let jykRejectCount = this.state.jykRejectCount
            jykRejectCount++
            this.setState({
              jykRejectCount: jykRejectCount,
              jykTasks: jykTasks
            })
          }
          // 提交检验科任务
          this.webview.postMessage(
            JSON.stringify({
              code: 'NW1009',
              data: task,
              msg: '提交情报检验科任务'
            })
          )

          // 手动提交情报
          /*if (brandPercent > 0.2 && percent > 0.1) {
          task.handle = 'accept';
          this.postWebMessage('NW1009', task);
          let jykAcceptCount = this.state.jykAcceptCount;
          jykAcceptCount++;
          this.setState({
            jykAcceptCount: jykAcceptCount
          });
        } else {
          Alert.alert(
            `商品比较`,
            `
${brandPercent.toFixed(3)} · ${percent.toFixed(3)}

[${bdBrandName}]${topBdProduct.title}

[${taskBrandName}]${task.productTitle}`,
            [
              {
                text: '不同商品',
                onPress: () => {
                  task.handle = 'reject';
                  this.postWebMessage('NW1009', task);
                  let jykAcceptCount = this.state.jykAcceptCount;
                  jykAcceptCount++;
                  this.setState({
                    jykAcceptCount: jykAcceptCount
                  });
                }
              },
              {
                text: '相同商品',
                onPress: () => {
                  task.handle = 'accept';
                  this.postWebMessage('NW1009', task);
                  let jykAcceptCount = this.state.jykAcceptCount;
                  jykAcceptCount++;
                  this.setState({
                    jykAcceptCount: jykAcceptCount
                  });
                }
              }
            ],
            { cancelable: false }
          );
        }*/
        } else {
          // 没有搜到对应贝店商品
        }
      })
      .catch(error => {
        this.postWebMessage('NW1010', null)
      })
  }
  // 退出当前贝店登录
  async logoutBD() {
    await AsyncStorage.removeItem('JSESSIONID')
    await AsyncStorage.removeItem('UID')
    this.postWebMessage('NW1011', null)
  }
  postWebMessage(code, data) {
    this.webview.postMessage(
      JSON.stringify({
        code: code,
        data: data
      })
    )
  }
  // 设置提交成功提示音
  setAudioCode(code) {
    this.setState({ audioCode: code })
  }
  toggleSilenceMode() {
    let flag = !this.state.isSilence
    let title = `贝店情报局` + (flag ? '' : ' ♪')
    this.setState({ isSilence: flag })
    this.props.navigation.setParams({ title: title })
  }
  // 播放系统声音
  playSysAudio(code) {
    if (!this.state.isSilence) {
      NativeModules.MainBridge.playSystemAudio(code)
    } else {
      console.log('当前处于静音模式中')
    }
  }
  showOptions() {
    self.ActionSheet.show()
  }
  onShake() {
    RNShakeEvent.addEventListener('shake', () => {})
  }
  componentWillMount() {}
  async componentDidMount() {
    NativeModules.MainBridge.setIdleTimerDisabled(true)
    // NativeModules.MainBridge.setBrightness(0.05);
    this.onShake()
    this.props.navigation.setParams({ animatedValue: this.animatedValue })
    this.props.navigation.setParams({ webview: this.webview })
    this.props.navigation.setParams({ openLogin: this.openLogin })
    this.props.navigation.setParams({ showOptions: this.showOptions })
    this.props.navigation.setParams({ changePlatform: this.changePlatform })
    this.props.navigation.setParams({ jykAcceptCount: this.state.jykAcceptCount })
    this.props.navigation.setParams({ jykRejectCount: this.state.jykRejectCount })
    this.props.navigation.setParams({ accountOverview: this.state.accountOverview })
    this.startAnimated()
    // TODO初始化web参数
    Promise.all([AsyncStorage.getItem('JSESSIONID'), AsyncStorage.getItem('UID')]).then(values => {
      let token = values[0] || ''
      let uid = values[1] || '0'
      this.setState(
        {
          authInfo: {
            jsSessionID: token,
            uid: uid
          }
        },
        () => {
          this.getAccountOverview()
        }
      )
    })
  }
  componentWillUnmount() {
    NativeModules.MainBridge.setIdleTimerDisabled(false)
    RNShakeEvent.removeEventListener('shake')
  }
  checkSessionID() {
    Promise.all([AsyncStorage.getItem('JSESSIONID'), AsyncStorage.getItem('UID')]).then(values => {
      let token = values[0] || ''
      let uid = values[1] || '0'
      this.webview.postMessage(
        JSON.stringify({
          code: 'NW1007',
          data: [{ key: 'JSESSIONID', value: token }, { key: '_logged_', value: uid }]
        })
      )
    })
  }
  toggleJykTaskStatus() {
    let jykTaskStatus = +!this.state.jykTaskStatus
    this.setState({
      jykTaskStatus: jykTaskStatus
    })
    let data = [{ key: 'jykTaskStatus', value: jykTaskStatus }]
    this.postWebMessage('NW1012', data)
  }
  getUrlParam(url, name) {
    var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i')
    if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, ' '))
    return ''
  }
  renderRow({ item }, rowId, secId, rowMap) {
    let percent = this.getUrlParam(item.outerUrl, 'percent')
    let itemStatusName = ''
    if (percent) {
      itemStatusName = (+percent * 100).toFixed(2) + `%`
    } else {
      itemStatusName = item.status == 1 ? '分析中' : item.status == 2 ? '成功' : '失败'
    }
    return (
      <TouchableHighlight
        activeOpacity={0.85}
        underlayColor="#000000"
        onPress={() => {
          NavigationService.navigate('Web', {
            url: item.outerUrl,
            title: item.title
          })
        }}
      >
        <View style={{ backgroundColor: '#fff' }}>
          <ListItem
            style={[
              styles.item,
              {
                flexDirection: 'column'
              }
            ]}
            containerStyle={{
              backgroundColor: '#fff',
              padding: 0,
              margin: 0,
              borderBottomWidth: 0,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 10
            }}
            key={item.key}
            avatar={
              <Avatar
                width={40}
                height={40}
                avatarStyle={{
                  borderRadius: 0,
                  backgroundColor: '#fff',
                  margin: 20
                }}
                source={item.productImg && { uri: item.productImg }}
                title={item.name}
              />
            }
            titleStyle={{ fontSize: 14 }}
            subtitleStyle={{ fontSize: 12 }}
            titleContainerStyle={{
              height: 20,
              marginRight: 10,
              marginLeft: 10,
              justifyContent: 'center'
            }}
            subtitleContainerStyle={{
              justifyContent: 'center',
              width: 230,
              marginLeft: 10,
              height: 20
            }}
            title={item.title}
            subtitle={this.switchPlatformName(item.platform) + `·¥${item.price}·™` + tool.formatDateTmp(+(item.gmtModified + '000'))}
            rightTitle={itemStatusName}
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
              {
                backgroundColor: item.status == 1 ? '#eee' : item.status == 2 ? '#7ED321' : '#d43f3a'
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
  renderJykRow({ item }, rowId, secId, rowMap) {
    return (
      <View
        style={{
          backgroundColor: item.task.handle == 'reject' ? `#FF4500` : item.task.percent < 0.1 ? `#FFD700` : `#FFFFFF`,
          borderBottomColor: '#ccc',
          borderBottomWidth: 1
        }}
      >
        <View>
          <Text>
            商品相似度:{item.task.percent.toFixed(4)},{item.task.handle}
          </Text>
        </View>
        <View>
          <Text>
            品牌相似度:[{item.task.brandName}],[{item.task.bdBrandName}],{item.task.brandPercent.toFixed(4)}
          </Text>
        </View>
        <View>
          <Text>{item.task.productTitle}</Text>
        </View>
        <View>
          <Text>{item.bdProduct.title}</Text>
        </View>
      </View>
    )
  }
  render() {
    const { height, width } = Dimensions.get('window')

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f4f6' }}>
        <View style={{ flex: 1, backgroundColor: '#f2f4f6' }}>
          <StatusBar barStyle="light-content" />
          <ScrollableTabView
            style={{ marginTop: 0 }}
            initialPage={0}
            renderTabBar={() => (
              <ScrollableTabBar
                style={{ borderBottomWidth: 0, height: 40, paddingVertical: 0 }}
                textStyle={{ height: 40, paddingTop: 8, fontSize: 14 }}
                activeTextColor={Colors.theme_color}
                underlineWidth={20}
                inactiveTextColor="#999"
              />
            )}
            tabBarBackgroundColor="#eee"
            tabBarUnderlineStyle={{
              backgroundColor: Colors.theme_color,
              height: 2
            }}
            locked={true}
            underlineWidth={10}
            onChangeTab={obj => {
              console.log(`切换tabindex:${obj.i}`)
            }}
          >
            <View tabLabel={'价格情报局'} style={{ flex: 1 }} key={'价格情报局'}>
              <SwipeListView
                useFlatList={true}
                data={this.state.historys}
                swipeRowStyle={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#eee'
                }}
                renderItem={(rowData, rowMap) => this.renderRow(rowData, rowMap)}
                onRowOpen={(rowId, secId, rowMap) => {
                  this.openRowId = rowId
                }}
                onRowClose={(rowId, secId, rowMap) => {
                  this.openRowId = null
                }}
                directionalDistanceChangeThreshold={1}
                closeOnRowPress={true}
                renderHiddenItem={(data, rowMap) => (
                  <View style={styles.rowBack}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={[styles.backRightBtn, { backgroundColor: '#696969' }]}
                      onPress={() => {
                        let { item } = data
                        Clipboard.setString(JSON.stringify(item))
                        rowMap[data.item.id.toString()].closeRow()
                      }}
                    >
                      <Text style={styles.backTextWhite}>黑名单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={[styles.backRightBtn, styles.backRightBtnLeft]}
                      onPress={async () => {
                        let { item } = data
                        Clipboard.setString(item.title)
                        // let blackList = await AsyncStorage.getItem('BlackList')
                        rowMap[data.item.id.toString()].closeRow()
                      }}
                    >
                      <Text style={styles.backTextWhite}>复制标题</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={[styles.backRightBtn, styles.backRightBtnRight]}
                      onPress={() => {
                        let { item } = data
                        Clipboard.setString(item.outerUrl)
                        rowMap[data.item.id.toString()].closeRow()
                      }}
                    >
                      <Text style={styles.backTextWhite}>复制链接</Text>
                    </TouchableOpacity>
                  </View>
                )}
                leftOpenValue={90}
                rightOpenValue={-180}
                disableRightSwipe={false}
                disableLeftSwipe={false}
                friction={10}
                tension={0}
                recalculateHiddenLayout={false}
                previewDuration={0}
                previewOpenValue={0.01}
                keyExtractor={(rowData, index) => {
                  return rowData.id.toString()
                }}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.playSysAudio(1100)
                  this.setState({ refreshing: true })
                  let obj = {
                    code: 'NW1002',
                    data: null,
                    msg: '请求历史记录'
                  }
                  self.webview.postMessage(JSON.stringify(obj))
                  this.getAccountOverview()
                }}
              />
            </View>
            <View tabLabel={`情报检验科`} style={{ flex: 1 }} key={`情报检验科`}>
              <SwipeListView
                useFlatList={true}
                data={this.state.jykTasks}
                swipeRowStyle={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#eee'
                }}
                renderItem={(rowData, rowMap) => this.renderJykRow(rowData, rowMap)}
                directionalDistanceChangeThreshold={1}
                closeOnRowPress={true}
                leftOpenValue={75}
                rightOpenValue={-180}
                disableRightSwipe={true}
                disableLeftSwipe={false}
                friction={10}
                tension={0}
                recalculateHiddenLayout={false}
                previewDuration={0}
                previewOpenValue={0.01}
                keyExtractor={(rowData, index) => {
                  return index.toString()
                }}
              />
            </View>
          </ScrollableTabView>
          <Modal
            isOpen={this.state.isShowLogin}
            keyboardTopOffset={0}
            startOpen={false}
            backdrop={false}
            coverScreen={false}
            swipeToClose={false}
            useNativeDriver={false}
            position={'top'}
            animationDuration={500}
            easing={Easing.elastic(0)}
          >
            <WebView
              ref={w => (this.webview = w)}
              style={{ flex: 1 }}
              source={{
                uri: 'https://m.beidian.com/login/fast_login.html',
                headers: { 'Cache-Control': 'no-cache' }
              }}
              startInLoadingState={-22}
              hideKeyboardAccessoryView={true}
              allowsBackForwardNavigationGestures={true}
              allowsLinkPreview={false}
              decelerationRate="normal"
              dataDetectorTypes="none"
              scrollEnabled={false}
              bounces={false}
              useWebkit={true}
              cacheEnabled={false}
              geolocationEnabled={false}
              onLoadEnd={() => {
                // 检测SessionID,如果存在直接设置
                Promise.all([AsyncStorage.getItem('JSESSIONID'), AsyncStorage.getItem('UID')]).then(values => {
                  let token = values[0] || ''
                  let uid = values[1] || '0'
                  let cookies = [
                    { key: 'JSESSIONID', value: token },
                    { key: '_logged_', value: uid },
                    { key: 'jykTaskStatus', value: `${this.state.jykTaskStatus}` }
                  ]
                  let obj = { code: 'NW1001', data: cookies, msg: '加载完毕' }
                  this.webview.postMessage(JSON.stringify(obj))
                })
              }}
              renderLoading={() => (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff'
                  }}
                >
                  <Image source={Images.ic_webloading} />
                </View>
              )}
              injectedJavaScript={InjectedJavaScript}
              userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
              onMessage={async event => {
                let result = JSON.parse(event.nativeEvent.data)
                switch (result.code) {
                  case 'WN1000':
                    // this.state.isShowLogin ? DropDownHolder.alert(result.msg, '', 'error') : this.setLoginModalStatus(true);
                    this.state.isShowLogin ? () => {} : this.setLoginModalStatus(true)
                    break
                  case 'WN1001':
                    let platformName = this.switchPlatformName(result.data.platform)
                    DropDownHolder.alert(`[${platformName}]${result.msg}`, '', 'info')
                    break
                  case 'WN1002':
                    this.setState({
                      historys: result.data,
                      refreshing: false
                    })
                    break
                  case 'WN1004':
                    DropDownHolder.alert(result.msg, '', 'warn')
                    break
                  case 'WN1005':
                    {
                      let productInfo = result.data
                      this.setLoginModalStatus(false)
                      let returnObj = {
                        id: productInfo.id,
                        uid: productInfo.uid,
                        url: null
                      }
                      let tName = productInfo.taskShopName || this.switchPlatformName(productInfo.platform)
                      switch (productInfo.platform) {
                        case 1:
                        case 12:
                        case 13:
                          returnObj.url = await this.searchTM(productInfo)
                          break
                        case 2:
                          returnObj.url = await this.searchJD(productInfo)
                          break
                        case 6:
                          returnObj.url = await this.searchWPH(productInfo)
                          break
                      }
                      // 弹框提示对应商品
                      // DropDownHolder.alert('', `[${tName}]${productInfo.title}`, 'info')
                      if (returnObj.url !== null) {
                        let products = this.state.products
                        products.push(returnObj)
                        this.setState({ products: products })
                        this.props.navigation.setParams({ products: products })
                        this.webview.postMessage(JSON.stringify(returnObj))
                        this.playSysAudio(this.state.audioCode)
                        this.activeAnimate(1, 1, 1, 1, 1, 1, 1)
                      } else {
                        this.postWebMessage('NW1013', {})
                        this.activeAnimate(1)
                      }
                    }
                    break
                  case 'WN1006':
                    this.playSysAudio(1100)
                    break
                  case 'WN1007':
                    let loginInfo = result.data
                    this.login(loginInfo.tel, loginInfo.code)
                    break
                  case 'WN1008':
                    let taskInfo = result.data
                    taskInfo.percent = 1
                    taskInfo.brandPercent = 1
                    taskInfo.handle = 'accept'
                    // 过滤一次
                    // this.getBdProduct(taskInfo);
                    let jykTasks = this.state.jykTasks
                    jykTasks.push({
                      task: taskInfo,
                      bdProduct: {
                        title: taskInfo.productTitle
                      },
                      submitTime: new Date().getTime()
                    })
                    let jykAcceptCount = this.state.jykAcceptCount
                    jykAcceptCount++
                    this.setState({
                      jykAcceptCount: jykAcceptCount,
                      jykTasks: jykTasks
                    })
                    this.props.navigation.setParams({ jykAcceptCount: jykAcceptCount })
                    this.playSysAudio(1114)
                    // 提交检验科任务
                    this.webview.postMessage(
                      JSON.stringify({
                        code: 'NW1009',
                        data: taskInfo,
                        msg: '提交情报检验科任务'
                      })
                    )
                    break
                  case 'WN1010':
                    // 运行监测
                    this.activeAnimate(1)
                    break
                  default:
                    break
                }
              }}
            />
          </Modal>
        </View>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={'设置'}
          message={'开启静音模式后，所有提示不再提醒'}
          options={[`${!this.state.isSilence ? '静音' : '提醒'}模式`, '任务平台', `${this.state.jykTaskStatus == 1 ? '关闭' : '开启'}检验科`, '登录']}
          cancelButtonIndex={3}
          destructiveButtonIndex={3}
          tintColor={'#000'}
          onPress={index => {
            if (index == 0) {
              this.toggleSilenceMode()
            } else if (index == 1) {
              this.changePlatform()
            } else if (index == 2) {
              this.toggleJykTaskStatus()
            } else if (index == 3) {
              this.logoutBD()
            }
          }}
          styles={this.state.actionSheetStyles}
        />
      </SafeAreaView>
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
    width: 90
  },
  backRightBtnLeft: {
    backgroundColor: '#FAA732',
    right: 90
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
    paddingVertical: 10,
    width: Dimensions.get('window').width / 4
  },
  // aa
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '300'
  },
  subtitleText: {
    color: '#fff',
    fontSize: 10,
    marginTop: 3,
    fontWeight: '300'
  }
})
