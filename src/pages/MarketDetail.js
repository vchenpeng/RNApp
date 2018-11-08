import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, ScrollView, StatusBar, NavigationActions, DatePickerIOS, TouchableOpacity } from 'react-native';
import { Header, List, ListItem, Avatar, CheckBox } from 'react-native-elements';
import Icon from "react-native-vector-icons/AntDesign";
import NavigationService from '../utils/navigationService';
import { Echarts, echarts } from 'react-native-secharts';

export default class MarketDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            headerTitle: params.title,
            headerRight: null
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            fetchMarketInfo: []
        }
    }

    fetchMarketInfo(key) {
        const url = `http://www.coin918.cc/pub/ajax/get_market_ordinary_json?market=${key}&time=5`;
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                if (list) {
                    var list = response;
                    var market = list.map(item => {
                        return item[1];
                    });
                    this.setState({
                        market: market
                    });
                } else {
                    this.setState({
                        market: []
                    });
                }
            })
            .catch((error) => console.error(error))
    }
    componentDidMount() {
        const { navigation } = this.props;
        const { params } = navigation.state;
        this.fetchMarketInfo(params.key);
    }

    render() {
        const { navigation } = this.props;
        option = {
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.state.market,
                type: 'line'
            }]
        };

        return (<ScrollView style={{ flex: 1 }}>
            <Echarts option={option} height={300} />
        </ScrollView>)
    }
};
const styles = StyleSheet.create({

});