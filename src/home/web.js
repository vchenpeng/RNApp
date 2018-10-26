import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, FlatList, StatusBar, WebView, Alert, TouchableOpacity } from 'react-native';
import { Header, List, ListItem, Avatar, CheckBox } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import NavigationService from '../navigationService';

export default class Web extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: ''
        };
    }
    componentDidMount() {
        let url = this.props.navigation.state.params.url;
        this.setState({
            url: url
        });
    }

    render() {
        const { navigation } = this.props;
        return (<WebView
            source={{ uri: this.state.url }}
        />)
    }
};
const styles = StyleSheet.create({
    item: {
        padding: 40,
        borderColor: 'red',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
});