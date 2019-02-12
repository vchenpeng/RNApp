/**
 * Created by marno on 2017/4/9
 * Function: 可点击的 Image 组件
 * Desc:
 */
import React, { Component } from 'react';
import { Image, TouchableOpacity, ImageBackground, AlertIOS } from 'react-native';
import AntDesignIcon from "react-native-vector-icons/AntDesign";

export default class IconButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <AntDesignIcon
                    name='profile'
                    size={24}
                    color='white'
                    style={[{ marginRight: 15 }, this.props.style]} />
            </TouchableOpacity>
        )
    }
}