/**
 * Created by marno on 2017/4/9
 * Function: 可点击的 Image 组件
 * Desc:
 */
import React, { Component } from 'react';
import { Image, TouchableOpacity, ImageBackground, AlertIOS } from 'react-native';

export default class ImageButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Image
                    resizeMode="cover"
                    style={this.props.style}
                    source={this.props.source}
                    onPress={this.props.onPress}
                />
                {this.props.children}
            </TouchableOpacity>
        )
    }
}