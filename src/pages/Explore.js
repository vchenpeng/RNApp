import React, { Component } from 'react';
import {
    Text, View, StatusBar, FlatList, TouchableOpacity, Dimensions, ActivityIndicator
} from 'react-native';
import NavigationService from '../utils/navigationService';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { Header, List, ListItem, Avatar, CheckBox } from 'react-native-elements';
import DropDownHolder from '../utils/DropDownHolder';
import { Colors } from '../resource';

export default class Explore extends Component {
    static navigationOptions = ((props) => {
        return {

        }
    });
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.state = {
            refreshing: false,
            tabs: [
                { name: 'www', text: '头条', list: [] },
                { name: 'zhengce', text: '政策', list: [] },
                { name: 'personage', text: '人物', list: [] },
                { name: 'fenxishishuo', text: '行情', list: [] },
                { name: 'capitalmarket', text: '投研', list: [] },
                { name: 'tech', text: '技术', list: [] }
            ],
            tab0: [],
            tab1: [],
            tab2: [],
            tab3: [],
            tab4: [],
            tab5: []
        };
    }

    fetchUserList(index) {
        const url = 'https://api.jinse.com/v6/information/list?catelogue_key=' + this.state.tabs[index]['name'] + '&limit=50&information_id=141061&flag=down&version=9.9.9';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                var list = responseJson.list;
                var obj = {};
                obj["tab" + index] = list;
                this.setState(obj);
                this.setState({ refreshing: false })
            })
            .catch((error) => this.setState({ refreshing: false }));
    }
    componentDidMount() {
        for (let i = 0; i < this.state.tabs.length; i++) {
            this.fetchUserList(i);
        }
    }
    renderRow({ item }) {
        return (
            <TouchableOpacity
                onPressIn={() => { }}
                onPress={() => {
                    //DropDownHolder.alert(item.title, '', 'info');
                    NavigationService.navigate("Web", { url: item.extra.topic_url, title: item.title });
                }}
            >
                <ListItem
                    style={{}}
                    bottomDivider={false}
                    wrapperStyle={{ height: 50 }}
                    contentContainerStyle={{ padding: 0, margin: 0 }}
                    containerStyle={{ backgroundColor: '#fff', padding: 0, margin: 0, borderBottomColor: '#eee' }}
                    titleStyle={{ fontSize: 16, flexShrink: 1 }}
                    titleContainerStyle={{
                        height: 25,
                        justifyContent: "center"
                    }}
                    subtitleStyle={{ fontSize: 12 }}
                    subtitleContainerStyle={{ justifyContent: "center", height: 25 }}
                    avatar={<Avatar
                        width={70}
                        height={50}
                        source={item.extra.thumbnail_pic && { uri: item.extra.thumbnail_pic }}
                        title={item.title}
                    />}
                    title={item.title}
                    subtitle={item.extra.summary}
                />
            </TouchableOpacity>
        )
    }
    render() {
        let DOM = this.state.tabs.map((tab, index) =>
            (<View tabLabel={tab.text} style={{}} key={index}>
                <FlatList
                    removeClippedSubviews={false}
                    data={this.state['tab' + index]}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({ refreshing: true })
                        this.fetchUserList(index);
                    }
                    }
                    ListEmptyComponent={null}
                    ListFooterComponent={() => {
                        return <View style={{ alignItems: "center", padding: 20 }}>
                            <ActivityIndicator />
                        </View>
                    }}

                />
            </View>));
        var { height, width } = Dimensions.get('window');
        return (<View style={{ flex: 1 }}>
            <ScrollableTabView
                style={{ marginTop: 0 }}
                initialPage={0}
                renderTabBar={() => (<ScrollableTabBar
                    style={{ borderBottomWidth: 0, height: 40, paddingVertical: 0 }}
                    textStyle={{ height: 40, paddingTop: 8, fontSize: 14 }}
                    activeTextColor={Colors.theme_color}
                    underlineWidth={15}
                    inactiveTextColor="#999" />)
                }
                tabBarBackgroundColor="#eee"
                tabBarUnderlineStyle={{
                    backgroundColor: Colors.theme_color, height: 2
                }}
                underlineWidth={10}
                onChangeTab={(obj) => {
                    console.log('index:' + obj.i);
                }}
            >
                {DOM}
            </ScrollableTabView >
        </View>
        );
    }
}