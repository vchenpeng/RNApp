import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownHolder from '../DropDownHolder'

export default class Login extends Component {
    static navigationOptions = ((props) => {
        return {
            headerTitle: '登录',
            header: null,
            headerRight: (<View>
                <TouchableOpacity onPress={() => {

                }} >
                    <Icon name='fingerprint' size={24} color='white' style={{ marginRight: 10 }} />
                </TouchableOpacity>
            </View>)
        }
    });
    render() {
        return (

            <ScrollView style={[styles.container, {}]} scrollEnabled={false}>
                <View style={styles.avatarview}>
                    <Image source={require("../resource/imgs/avatar.jpg")} style={styles.avatarimage} />
                </View>
                <View style={[styles.inputview, {}]}>
                    <TextInput keyboardType="number-pad" underlineColorAndroid='transparent' style={styles.textinput} placeholder='QQ号/手机号/邮箱' />
                    <View style={styles.dividerview}>
                        <Text style={styles.divider}></Text>
                    </View>
                    <TextInput underlineColorAndroid='transparent'
                        returnKeyType="done"
                        style={styles.textinput}
                        placeholder='密码'
                        secureTextEntry={true} />
                </View>
                <View style={styles.bottomview}>
                    <TouchableOpacity onPress={() => {
                        DropDownHolder.alert('用户名或密码错误', '', 'error');
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
        paddingLeft: 16
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