import {
    Text, Alert, Image, FlatList, View, StyleSheet
} from 'react-native';
import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';
import localStorage from './storage';

console.warn('languages', RNLanguages.languages);
// 多语言
i18n.defaultLocale = 'en';
i18n.locale = i18n.defaultLocale;
i18n.fallbacks = true;
i18n.translations = {
    "zh_CN": {
        back: '返回',
        home: '首页',
        market: '行情',
        explore: '发现',
        mine: '我的',
        login: '登录',
        settings: '设置'
    },
    "en": {
        back: 'Back',
        home: 'Home',
        market: 'Market',
        explore: 'Explore',
        mine: 'Me',
        login: 'Login',
        settings: 'Settings'
    }
};

export default i18n;