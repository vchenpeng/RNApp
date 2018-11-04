/**
 * Created by marno on 2017/4/6
 * Function:所有图片入口
 * Desc:将图片统一管理，避免因改变路径后导致图片引用维护困难
 */
const images = {
    /**
     * Common
     */
    ic_avatar: require('./qrcode/avatar.jpg'),
    ic_back: require('./qrcode/back.png'),


    /**
     * OFO
     */
    ic_light_off: require('./qrcode/scanLigtOff.png'),
    ic_light_on: require('./qrcode/scanLightOn.png'),
    ic_manual_input: require('./qrcode/manualInput.png'),
    ic_scan_bar: require('./qrcode/scanBar.png'),

    /**
     * Twitter
     */
    ic_camera: require('./qrcode/camera.png'),
    ic_close: require('./qrcode/remove.png'),

    /**
     * QQBrowser
     */
    ic_qrcode_light: require('./qrcode/qrcodeLigthOn.png'),
    ic_qq_back: require('./qrcode/qqback.png'),

    /**
     * DingTalk
     */
    ic_ding_scan_card: require('./qrcode/scanCard.png'),
    ic_ding_scan_qr: require('./qrcode/scanQR.png'),
    ic_ding_close: require('./qrcode/dingClose.png'),
    ic_ding_more: require('./qrcode/dingMore.png'),
    ic_ding_viewfinder: require('./qrcode/viewfinder.png'),

    /**
     * WeChat
     */
    ic_wechat_scan_word: require('./qrcode/scanWord.png'),
    ic_wechat_scan_hl: require('./qrcode/scanHl.png'),
    ic_wechat_scan_street: require('./qrcode/scanStreet.png'),
    ic_wechat_scan_book: require('./qrcode/scanBook.png'),
    ic_wechat_back: require('./qrcode/wechatBack.png'),
    ic_wechat_more: require('./qrcode/wechatMore.png'),


};

export default images;