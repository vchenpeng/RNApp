/**
 * Created by marno on 2017/4/9
 * Func: 顶部标题栏
 * Desc:
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity, AlertIOS, SafeAreaView } from 'react-native';
import { Images } from '../resource/'
import ImageButton from "./ImageButton";
import NavigationService from '../utils/navigationService';

export default class TitleBar extends Component {

    static propTypes = {
        leftTitle: PropTypes.string,
        leftIcon: PropTypes.number,
        rightIcon: PropTypes.number,
        rightTitle: PropTypes.string,
        leftIconPress: PropTypes.func,
        rightIconPress: PropTypes.func,
        bgColor: PropTypes.string,
        titleColor: PropTypes.string,
        paddingTop: PropTypes.string
    };

    static defaultProps = {
        leftIcon: '关闭',
        bgColor: '#eee',
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={[styles.view_header_container, {}]}>
                    <ImageButton
                        style={{ width: 18, height: 35, marginLeft: 9, marginRight: 6 }}
                        source={this.props.leftIcon}
                        onPress={() => {
                            NavigationService.back();
                        }}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                        NavigationService.back();
                    }}>
                        <Text style={[styles.text_title, { color: this.props.titleColor, textAlign: "center" }]}>{this.props.leftTitle}</Text>
                    </TouchableOpacity>
                    {this._renderRight()}
                </View>
            </SafeAreaView>
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
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        height: 44
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
        color: '#fff',
        position: 'absolute',
        right: 16,
        fontSize: 17
    },
    text_title: {
        color: '#000',
        fontSize: 17,
    }
})