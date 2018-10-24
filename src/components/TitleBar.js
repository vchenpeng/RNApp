/**
 * Created by marno on 2017/4/9
 * Func: 顶部标题栏
 * Desc:
 */
import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, AlertIOS } from 'react-native';

import { Images } from '../resource/'
import ImageButton from "./ImageButton";


export default class TitleBar extends Component {

    static propTypes = {
        leftTitle: React.PropTypes.string,
        leftIcon: React.PropTypes.number,
        rightIcon: React.PropTypes.number,
        rightTitle: React.PropTypes.string,
        leftIconPress: React.PropTypes.func,
        rightIconPress: React.PropTypes.func,
        bgColor: React.PropTypes.string,
        titleColor: React.PropTypes.string,
        paddingTop: React.PropTypes.string
    };

    static defaultProps = {
        leftIcon: '关闭',
        bgColor: 'white'
    };

    render() {
        return (
            <View style={[styles.view_header_container, { backgroundColor: this.props.bgColor, opacity: 0.9, height: 64, paddingTop: 20 }]}>
                <ImageButton
                    style={{ width: 25, height: 25, marginLeft: 10, marginRight: 10 }}
                    source={this.props.leftIcon}
                    onPress={() => {
                        AlertIOS.alert('9988776');
                    }}
                />
                <Text style={[styles.text_title, { color: this.props.titleColor, textAlign: "center" }]}>{this.props.leftTitle}</Text>
                {this._renderRight()}
            </View>
        )
    }

    /**
     * 根据传入值判断右边渲染文字还是图标
     */
    _renderRight() {
        if (this.props.rightIcon) {
            return (<ImageButton
                style={styles.image_header_right}
                source={this.props.rightIcon}
                onPress={this.props.rightIconPress}
            />)
        } else if (this.props.rightTitle) {
            return (
                <Text style={styles.text_right_title}>
                    {this.props.rightTitle}
                </Text>
            )
        }
    }

}

const styles = StyleSheet.create({
    view_header_container: {
        height: 84,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image_header_left: {
        height: 24,
        width: 24,
        marginLeft: 8,
        marginRight: 32,
    },
    image_header_right: {
        height: 24,
        width: 24,
        marginRight: 8,
        position: 'absolute',
        right: 0,
    },
    text_right_title: {
        color: '#000',
        position: 'absolute',
        right: 16,
    },
    text_title: {
        color: '#000',
        fontSize: 18,
    }
})