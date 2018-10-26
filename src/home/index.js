import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, FlatList, StatusBar, NavigationActions, DatePickerIOS, TouchableOpacity } from 'react-native';
import { Header, List, ListItem, Avatar, CheckBox } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import NavigationService from '../navigationService';
import DropDownHolder from '../DropDownHolder'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        //DropDownHolder.alert('标题一', '我是内容我是内容我是内容我是内容我是内容', 'info');
    }


    render() {
        return (<View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
        </View>)
    }
};
const styles = StyleSheet.create({

});