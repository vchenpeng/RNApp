import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Alert, SafeAreaView } from 'react-native';
import { QRScannerView } from 'ac-qrcode';
import { ImageButton, TitleBar } from "../components/";
import Styles from './styles/wechat';
import { Constants, Images, Colors } from "../resource/";

export default class QRCode extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,
        title: '扫一扫',
        Header: null
    })
    constructor(props) {
        super(props);
        this.state = {
            isScanning: false
        };
        this.renderTitleBar.bind(this);
        this.renderMenu.bind(this);
        this.barcodeReceived.bind(this);
    }
    componentDidMount() {
        this.setState({
            isScanning: true
        });
    }
    renderTitleBar() {
        return (
            <TitleBar
                titleColor={Colors.white_fff}
                bgColor="#000"
                title={Constants.string_title_wechat_scanner}
                leftTitle="扫码"
                leftIcon={Images.ic_wechat_back}
                leftIconPress={() => this.props.navigation.goBack()}
            />)
    }
    renderMenu() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={Styles.view_bottom_menu_item}>
                    <ImageButton
                        style={Styles.image_bottom_menu}
                        source={Images.ic_wechat_scan_hl}
                    />
                    <Text
                        style={Styles.text_bottom_menu_item}
                    >扫码</Text>
                </View>

                <View style={Styles.view_bottom_menu_item}>
                    <ImageButton
                        style={Styles.image_bottom_menu}
                        source={Images.ic_wechat_scan_book}
                        onPress={() => { }}
                    />
                    <Text
                        style={Styles.text_bottom_menu_item}
                    >封面</Text>
                </View>


                <View style={Styles.view_bottom_menu_item}>
                    <ImageButton
                        style={Styles.image_bottom_menu}
                        source={Images.ic_wechat_scan_street}
                    />
                    <Text
                        style={Styles.text_bottom_menu_item}
                    >街景</Text>
                </View>


                <View style={Styles.view_bottom_menu_item}>
                    <ImageButton
                        style={Styles.image_bottom_menu}
                        source={Images.ic_wechat_scan_word}
                    />
                    <Text
                        style={Styles.text_bottom_menu_item}
                    >翻译</Text>
                </View>

            </View>
        )
    }
    barcodeReceived(e) {
        if (this.state.isScanning) {
            this.setState({ isScanning: false });
            Alert.alert(
                '扫码内容',
                JSON.stringify(e),
                [
                    {
                        text: '好', onPress: () => {
                            this.setState({ isScanning: true });
                        }
                    }
                ],
                { cancelable: false }
            )
            switch (e.type) {
                case "org.ios.QRCode":
                    break;
                default:
                    break;
            }
        } else {
        }
    }

    render() {
        return (
            <QRScannerView
                bottomMenuStyle={{ height: 100, backgroundColor: Colors.black_393A3F, opacity: 1 }}
                hintText="将二维码/条码放入框内，即可自动扫描"
                hintTextPosition={180}
                hintTextStyle={{ color: '#fff', fontSize: 12, backgroundColor: 'transparent' }}
                maskColor={Colors.black_0000004D}
                borderWidth={0}
                iscorneroffset={false}
                cornerOffsetSize={0}
                scanBarAnimateTime={3000}
                cornerBorderWidth={2}
                onScanResultReceived={this.barcodeReceived.bind(this)}
                renderTopBarView={() => this.renderTitleBar()}
                renderBottomMenuView={() => this.renderMenu()}
            />
        )
    }
}