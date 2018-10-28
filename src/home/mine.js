import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, FlatList, StatusBar, AlertIOS, DatePickerIOS, TouchableOpacity } from 'react-native';
import { Header, List, ListItem, Avatar, CheckBox } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class Mine extends Component {
    //接收上一个页面传过来的title显示出来
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '首页',
        headerTitleStyle: {
            fontSize: 18,
            fontWeight: '400',
            alignSelf: 'center',
            color: '#fff'
        },
        headerMode: "screen",
        headerStyle: { backgroundColor: '#376fff' },
        //headerLeft: (<icon name="menu"></icon>),
        headerRight: (<View>
            <TouchableOpacity onPress={() => navigation.navigate('Web')} >
                <Text style={{ paddingRight: 14, color: '#fff', fontSize: 18 }}>图文</Text>
            </TouchableOpacity>
        </View>),
        headerLeft: null,
        // headerBackTitle: '返回',
        // headerTruncatedBackTitle: '返回'
    })
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
    renderRow({ item }) {
        return (
            <TouchableOpacity onPress={() => console.log()} >
                <CheckBox
                    title='Click Here 啦🌶'
                    checked={false}
                />
                <ListItem
                    avatar={<Avatar
                        rounded
                        source={item.icon_url && { uri: item.icon_url }}
                        title={item.cn_name}
                    />}
                    title={item.cn_name}
                    subtitle={item.currency_symbol + '' + item.price}
                />
            </TouchableOpacity>
        )
    }
    goScan() {
        const { navigate } = this.props.navigation;
        navigate('Web');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (<View style={{ flex: 1, flexDirection: 'column' }}>
            <StatusBar barStyle="light-content" />
            {/* <TouchableOpacity style={{}}
                onPress={() => navigate('Web')} >
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    leftComponent={{ icon: 'home', color: '#fff', size: 22 }}
                    backgroundColor="#376fff"
                    centerComponent={{ text: '首页首页首页首页', style: { color: '#fff', fontSize: 18 } }}
                    rightComponent={{ icon: 'menu', color: '#fff', size: 22 }}
                />
            </TouchableOpacity> */}
            <FlatList
                data={this.state.list}
                renderItem={this.renderRow}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>)
    }
}