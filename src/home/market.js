import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, FlatList, StatusBar, NavigationActions, DatePickerIOS, TouchableOpacity } from 'react-native';
import { Header, List, ListItem, Avatar, CheckBox } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import NavigationService from '../navigationService';

export default class Market extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            user: null,
            chosenDate: new Date(),
            language: '.net'
        };
        this.setDate = this.setDate.bind(this);
    }

    fetchUserList() {
        const url = 'https://api.jinse.com/v3/coin?offset=0&limit=100&currency=CNY&_source=m';
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
    renderRow({ item, index }) {
        // const { navigation } = this.props;
        return (
            <TouchableOpacity onPress={() => {
                NavigationService.navigate('QRCode');
                //navigation.navigate('QRCode')
            }} >
                <ListItem
                    style={[styles.item, { borderWidth: 0, padding: 20 }]}
                    key={index}
                    avatar={<Avatar
                        width={80}
                        height={60}
                        source={item.icon_url && { uri: item.icon_url }}
                        title={item.cn_name}
                    />}
                    title={item.cn_name + item.abbreviation + '(' + item.change + '%)'}
                    subtitle={'价格:' + item.currency_symbol + '' + item.price + '  Vol:' + item.vol}
                />
            </TouchableOpacity>
        )
    }

    render() {
        const { navigation } = this.props;
        return (<View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <FlatList
                removeClippedSubviews={false}
                data={this.state.list}
                renderItem={this.renderRow}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>)
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