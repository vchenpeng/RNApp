/**
 * Created by marno on 2017/4/9
 * Func: 顶部标题栏
 * Desc:
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { Images } from '../resource/'
import ImageButton from "./ImageButton";
import NavigationService from '../utils/navigationService';

let { height, width } = Dimensions.get('window');
export default class TitleBar extends Component {

    static propTypes = {
        leftTitle: PropTypes.string,
        leftIcon: PropTypes.number,
        rightIcon: PropTypes.number,
        rightTitle: PropTypes.string,
        leftPress: PropTypes.func,
        rightPress: PropTypes.func,
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
            <SafeAreaView style={{ backgroundColor: this.props.bgColor }}>
                <View style={[styles.view_header_container, {}]}>
                    <TouchableOpacity activeOpacity={0.5} style={[styles.image_header_left, { flexDirection: "row", alignItems: "center", backgroundColor: "transparent" }]} onPress={() => {
                        NavigationService.back();
                    }}>
                        <Image
                            style={{ width: 13, height: 21, marginLeft: 9, marginRight: 6, tintColor: "#fff", resizeMode: "contain" }}
                            source={this.props.leftIcon}
                        />
                        <Text style={[styles.text_left_title, { color: this.props.titleColor }]}>{this.props.leftTitle}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.text_title, { color: this.props.titleColor }]}>{this.props.title}</Text>
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
            return <TouchableOpacity style={styles.text_right_title} onPress={this.props.rightPress} >
                {this.props.rightIcon}
            </TouchableOpacity>;
        } else if (this.props.rightTitle) {
            return <Text style={styles.text_right_title}>
                {this.props.rightTitle}
            </Text>;
        }
    }
}

const styles = StyleSheet.create({
    view_header_container: {
        height: 44,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
    },
    image_header_left: {
        position: 'absolute',
        left: 0,
        height: 24,
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
        right: 15,
        fontSize: 17
    },
    text_left_title: {
        color: '#000',
        fontSize: 17,
    },
    text_title: {
        color: '#000',
        fontSize: 18,
        fontWeight: "400"
    }
})