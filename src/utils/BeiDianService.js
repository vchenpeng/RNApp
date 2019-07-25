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
  AsyncStorage,
  Animated
} from 'react-native'
import config from './config'
import abr from './abr'

export default class BeiDianService {
  /**
   * 计算abr
   */
  calcAbr(method, body) {
    return abr({
      url: `https://api.beidian.com/mroute.html?method=${method}`,
      type: 'POST',
      query: { method: method },
      body: body
    })
  }
  /**
   * 登录
   */
  login(tel, code) {
    const method = 'beidian.auth.quick.web'
    const abr = this.calcAbr(method, {
      tel: tel,
      code: code,
      shop_id: ''
    })
    const url = `https://api.beidian.com/mroute.html?method=${method}&_abr_=${abr}`
    return fetch(url, {
      method: 'POST',
      body: `tel=${tel}&code=${code}&shop_id=`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    })
  }
}
