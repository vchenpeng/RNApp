import React, { Component } from 'react';
import { Text, Image, SafeAreaView, View, StyleSheet, Clipboard, WebView, Alert, TouchableOpacity } from 'react-native';
import { Header, List, ListItem, Avatar, CheckBox } from 'react-native-elements';
import Icon from "react-native-vector-icons/AntDesign";
import NavigationService from '../utils/navigationService';
import { Constants, Images, Colors } from "../resource";

export default class Web extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params ? params.title : null,
            headerRight: (<View>
                <TouchableOpacity onPress={() => {
                    let url = params.url;
                    Clipboard.setString(url);
                    Alert.alert('地址', url);
                }} >
                    <Icon name='setting' size={24} color='white' style={{ marginRight: 15 }} />
                </TouchableOpacity>
            </View>)
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        };
    }
    componentDidMount() {
        let url = this.props.navigation.state.params.url;
        this.setState({ url: url });
    }
    onNavigationStateChange(navState) {
        let title = Math.abs(navState.title.indexOf('http')) ? navState.title : '';
        this.props.navigation.setParams({ title: title });
    }

    render() {
        const { navigation } = this.props;
        return (<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <WebView
                source={{ uri: this.state.url }}
                startInLoadingState={true}
                renderLoading={() => (<View
                    style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}

                >
                    <Image source={Images.ic_webloading} />
                </View>)}
                onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            /></SafeAreaView>)
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