import { NativeModules } from 'react-native';
export default {
  formatDateTmp(dt) {
    var date = new Date(dt);
    Y = date.getFullYear();
    M = date.getMonth() + 1 < 10 ? date.getMonth() + 1 : date.getMonth() + 1;
    D = date.getDate();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();

    // h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    return `${M}-${D} ${h}:${m}:${s}`;
  },
  getSafeAreaInsets() {
    return new Promise(resolve => {
      try {
        let mainBridge = NativeModules.MainBridge;
        mainBridge.getSafeAreaInsets((error, events) => {
          resolve(events);
        });
      } catch (e) {
        resolve({
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        });
      }
    });
  }
};
