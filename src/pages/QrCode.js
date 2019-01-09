
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Alert, SafeAreaView, NativeModules } from 'react-native';
import { QRScannerView } from '../components/QRScanner';
import NavigationService from '../utils/navigationService';
import { ImageButton, TitleBar } from "../components";
import Styles from '../resource/styles/wechat';
import { Constants, Images, Colors } from "../resource";
import Orientation from 'react-native-orientation';
import Torch from 'react-native-torch';

export default class QRCode extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,
        title: '扫一扫',
        Header: null
    })
    constructor(props) {
        super(props);
        this.state = {
            isTorchOn: false,
            isScanning: false
        };
        // this.renderTitleBar.bind(this);
        // this.renderMenu.bind(this);
        this.barcodeReceived.bind(this);
    }
    componentWillMount() {
        Orientation.lockToPortrait();
        NativeModules.MainBridge.setIdleTimerDisabled(true);
    }
    componentDidMount() {
        this.setState({
            isScanning: true
        });
    }
    componentWillUnmount() {
        // Orientation.unlockAllOrientations();
        // Orientation.lockToPortrait();
        NativeModules.MainBridge.setIdleTimerDisabled(false);
    }
    barcodeReceived(e) {
        if (this.state.isScanning) {
            //this.setState({ isScanning: false });
            // Alert.alert(
            //     '扫码内容',
            //     JSON.stringify(e),
            //     [
            //         {
            //             text: '好', onPress: () => {
            //                 this.setState({ isScanning: true });
            //             }
            //         }
            //     ],
            //     { cancelable: false }
            // );
            NativeModules.MainBridge.playSystemAudio(1004);
            NavigationService.replace("Web", { url: e.data });
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
            < QRScannerView
                bottomMenuStyle={{ backgroundColor: '#000', opacity: 0.85 }}
                scanBarImage={Images.ic_scan_bar}
                cornerColor="#fff"
                cornerOffsetSize={0}
                borderWidth={0}
                hintText={'请扫描二维码或条形码'}
                hintTextStyle={{ color: "#fff", fontSize: 14 }}
                hintTextPosition={110}
                maskColor={Colors.black_0000004D}
                onScanResultReceived={this.barcodeReceived.bind(this)}
                bottomMenuHeight={115}
                renderTopBarView={() => {
                    return (
                        <TitleBar
                            title={Constants.string_title_scanner_qrcode}
                            leftIcon={Images.ic_back}
                            leftTitle="返回"
                            titleColor="#fff"
                            rightTitle="帮助"
                            leftIconPress={() => this.props.navigation.goBack()}
                        />
                    )
                }}

                renderBottomMenuView={() => this._renderMenu()}
            />
        )
    }

    _renderMenu() {
        return (
            <View style={Styles.view_menu_container}>
                <View style={Styles.view_menu_item_container}>
                    <ImageButton
                        style={Styles.image_bottom_menu}
                        source={Images.ic_manual_input}
                    />
                    <Text
                        style={Styles.text_menu_title}
                    >手动输入</Text>
                </View>

                <View style={Styles.view_menu_item_container}>
                    <ImageButton
                        style={[Styles.image_bottom_menu, {}]}
                        source={this.state.isTorchOn ? Images.ic_light_on : Images.ic_light_off}
                        onPress={() => {
                            let torch = !this.state.isTorchOn;
                            this.setState({ isTorchOn: torch });
                            Torch.switchState(torch);
                        }}
                    />
                    <Text
                        style={Styles.text_menu_title}
                    >手电筒</Text>
                </View>
            </View>
        )
    }
}