import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, FlatList, StatusBar, AlertIOS, Button, TouchableOpacity } from 'react-native';
import { Header, List, ListItem, Avatar, CheckBox } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import NavigationService from '../utils/navigationService';

export default class Mine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            user: null,
            chosenDate: new Date(),
            language: '.net'
        };
        this.setDate = this.setDate.bind(this);
        this.goScan = this.goScan.bind(this);
    }

    fetchUserList() {
        const url = 'https://api.jinse.com/v4/coin/change/ranks?order=up&limit=50';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                var list = responseJson;
                this.setState({
                    list: list
                });
            })
            .catch((error) => console.error(error))
    }
    componentDidMount() {
        this.fetchUserList();
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    goScan() {
        const { navigate } = this.props.navigation;
        navigate('Web');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (<View style={{ flex: 1, flexDirection: 'column' }}>
            <StatusBar barStyle="light-content" />

            <Button title="设置语言" onPress={() => {
                NavigationService.navigate('Settings');
            }}>设置</Button>
        </View>)
    }
}