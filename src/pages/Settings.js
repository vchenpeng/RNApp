import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, Button, Alert, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Header, List, ListItem, Avatar, CheckBox } from 'react-native-elements';
import Icon from "react-native-vector-icons/AntDesign";
import NavigationService from '../utils/navigationService';
import i18n from '../utils/i18n';

export default class Settings extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: i18n.t('settings'),
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            language: ''
        };
    }
    componentDidMount() {
        this.setState({
            language: i18n.locale
        });
    }
    onNavigationStateChange(navState) {

    }
    componentWillUnmount() {

    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
                <StatusBar barStyle="light-content" translucent={false} />
                {/* <View style={{ flex: 1 }}>

                </View> */}

                <Button title="语言中文" onPress={() => {
                    i18n.locale = "zh_CN";
                    this.setState({
                        language: i18n.locale
                    });
                    Alert.alert('当前中文');
                }} />
                <Button title="语言英文" onPress={() => {
                    i18n.locale = "en";
                    this.setState({
                        language: i18n.locale
                    });
                    Alert.alert('当前英文');
                }} />
            </SafeAreaView>)
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