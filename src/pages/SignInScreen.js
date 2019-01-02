import React, { Component } from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Alert,
    Text,
    Image,
    View,
    TextInput,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownHolder from '../utils/DropDownHolder';
import TouchID from 'react-native-touch-id';

export default class Login extends Component {
    static navigationOptions = ((props) => {
        const { navigation } = props;
        return {
            headerTitle: '登录',
            // header: null,
            headerRight: (<View>
                <TouchableOpacity onPress={() => {
                    TouchID.isSupported()    //判断设备是否支持TouchID验证
                        .then(success => {
                            const optionalConfigObject = {
                                title: "Authentication Required", // Android
                                color: "#e00606", // Android
                                sensorDescription: "Touch sensor", // Android
                                cancelText: "Cancel", // Android
                                fallbackLabel: "", // iOS (if empty, then label is hidden)
                                unifiedErrors: false // use unified error messages (default false)
                            };
                            TouchID.authenticate('别怕，就是验证下是否是机主^_^', optionalConfigObject)
                                .then(async success => {
                                    await AsyncStorage.setItem('TOKEN', 'abc');
                                    navigation.navigate('App');
                                })
                                .catch(error => {
                                    AlertIOS.alert('验证失败');
                                });
                        })
                        .catch(error => {
                            //设备不支持TouchID验证后进行的操作
                        });
                }} >
                    <Icon name='fingerprint' size={24} color='white' style={{ marginRight: 10 }} />
                </TouchableOpacity>
            </View>)
        }
    });
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: ''
        }
        this.signInAsync.bind(this);
    }
    signInAsync = async () => {
        await AsyncStorage.setItem('TOKEN', this.state.password);
        this.props.navigation.navigate('App');
    }
    render() {
        return (
            <ScrollView style={[styles.container, {}]} scrollEnabled={true}>
                <StatusBar barStyle="light-content" />
                <View style={styles.avatarview}>
                    <Image source={require("../resource/qrcode/avatar.jpg")} style={styles.avatarimage} />
                </View>
                <View style={[styles.inputview, {}]}>
                    <TextInput keyboardType="number-pad" underlineColorAndroid='transparent'
                        value={this.state.account}
                        onChangeText={(text) => this.setState({ account: text })}
                        style={styles.textinput} placeholder='QQ号/手机号/邮箱' />
                    <View style={styles.dividerview}>
                        <Text style={styles.divider}></Text>
                    </View>
                    <TextInput underlineColorAndroid='transparent'
                        returnKeyType="done"
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                        style={styles.textinput}
                        placeholder='密码'
                        secureTextEntry={true} />
                </View>
                <View style={styles.bottomview}>
                    <TouchableOpacity onPress={async () => {
                        if (this.state.account == '123' || this.state.password == '123') {
                            this.signInAsync()
                        } else {
                            await AsyncStorage.setItem('TOKEN', this.state.password);
                            DropDownHolder.alert('用户名或密码错误', '', 'error');
                        }
                    }}>
                        <View style={styles.buttonview}>
                            <Text style={styles.logintext}>登 录</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <View style={styles.emptyview}></View>
                    <View style={styles.bottombtnsview}>
                        <View style={styles.bottomleftbtnview}>
                            <Text style={styles.bottombtn}>无法登录？</Text>
                        </View>
                        <View style={styles.bottomrightbtnview}>
                            <Text style={styles.bottombtn}>新用户</Text>
                        </View>
                    </View> */}
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        height: 1900,
        backgroundColor: '#ECEDF1'
    },
    header: {
        height: 50,
        justifyContent: 'center',
    },
    headtitle: {
        alignSelf: 'center',
        fontSize: 18,
        color: '#000000',
    },
    avatarview: {
        height: 300,
        backgroundColor: '#ECEDF1',
        justifyContent: 'center',
    },
    avatarimage: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    inputview: {
        height: 100,
        backgroundColor: '#FFF'
    },
    textinput: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 16,
        paddingRight: 6
    },
    dividerview: {
        flexDirection: 'row',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ECEDF1'
    },
    bottomview: {
        backgroundColor: '#ECEDF1',
        flex: 1,
    },
    buttonview: {
        backgroundColor: '#FAA732',
        margin: 10,
        marginTop: 20,
        height: 50,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logintext: {
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    emptyview: {
        flex: 1,
    },
    bottombtnsview: {
        flexDirection: 'row',
    },
    bottomleftbtnview: {
        flex: 1,
        height: 50,
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    bottomrightbtnview: {
        flex: 1,
        height: 50,
        paddingRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    bottombtn: {
        fontSize: 15,
        color: '#1DBAF1',
    }
};