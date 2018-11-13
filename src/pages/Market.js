import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, FlatList, Dimensions, StatusBar, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Header, List, ListItem, Avatar, CheckBox } from 'react-native-elements';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import NavigationService from '../utils/navigationService';
import i18n from '../utils/i18n';

export default class Market extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    fetchMarketList() {
        const url = 'http://www.coin918.cc/ajax/allcoin_a/id/0?kw=';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let url = responseJson.url;
                let list = [];
                for (const key in url) {
                    if (url.hasOwnProperty(key)) {
                        const element = url[key];
                        let item = {
                            key: key,
                            name: element[0],
                            price: element[1],
                            change: element[7],
                            vol: element[6],
                            icon_url: 'http://www.coin918.cc/Upload/coin/' + element[9]
                        };
                        if (key == 'gath_usd_') {
                            list.unshift(item);
                        } else {
                            list.push(item);
                        }
                    }
                }
                this.setState({
                    list: list
                });
                this.setState({ refreshing: false })
            })
            .catch((error) => console.error(error))
    }
    componentDidMount() {
        this.fetchMarketList();
    }

    renderRow({ item }) {
        return (
            <TouchableHighlight
                activeOpacity={0.85}
                underlayColor='#000'
                onPress={() => {
                    NavigationService.navigate('MarketDetail', { title: item.name, key: item.key });
                }} >
                <View style={{ backgroundColor: '#fff' }}>
                    <ListItem
                        style={[styles.item]}
                        containerStyle={{
                            backgroundColor: '#fff', padding: 0, margin: 0, borderBottomColor: '#eee',
                            paddingTop: 10, paddingBottom: 10, paddingLeft: 10
                        }}
                        key={item.key}
                        avatar={<Avatar
                            width={40}
                            height={40}
                            avatarStyle={{ borderRadius: 0, backgroundColor: '#fff', margin: 20 }}
                            source={item.icon_url && { uri: item.icon_url }}
                            title={item.name}
                        />}
                        titleStyle={{ fontSize: 14 }}
                        subtitleStyle={{ fontSize: 12 }}
                        titleContainerStyle={{
                            height: 20,
                            width: 200,
                            marginLeft: 10,
                            justifyContent: "center"
                        }}
                        subtitleContainerStyle={{ justifyContent: "center", marginLeft: 10, height: 20 }}
                        title={item.name}
                        subtitle={'$' + item.price.toFixed(4)}
                        rightTitle={item.change > 0 ? '+' + item.change + '%' : item.change + '%'}
                        rightTitleStyle={[{
                            backgroundColor: '#d43f3a', paddingTop: 5, paddingBottom: 5, width: 55, color: '#fff', fontSize: 12, textAlign: "center",
                        }, { backgroundColor: item.change > 0 ? '#d43f3a' : '#7ED321' }]}
                        checkmark={false}
                        chevron={false}
                        rightAvatar={false}
                        rightIcon={<View />}
                        buttonGroup={null}
                    />
                </View>
            </TouchableHighlight>
        )
    }
    closeRow(rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }
    render() {
        const { navigation } = this.props;
        return (<View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <SwipeListView
                style={{ backgroundColor: '#eee' }}
                useFlatList={true}
                data={this.state.list}
                renderItem={(rowData, rowMap) => this.renderRow(rowData, rowMap)}
                directionalDistanceChangeThreshold={1}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.rowBack}>
                        <Text></Text>
                        <TouchableOpacity activeOpacity={1} style={[styles.backRightBtn, styles.backRightBtnLeft]}
                            onPress={_ => this.closeRow(rowMap, data.item.key)}>
                            <Text style={styles.backTextWhite}>关闭</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={[styles.backRightBtn, styles.backRightBtnRight]}
                            onPress={_ => this.closeRow(rowMap, data.item.key)}>
                            <Text style={styles.backTextWhite}>删除</Text>
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-150}
                disableRightSwipe={true}
                friction={10}
                tension={0}
                recalculateHiddenLayout={false}
                previewDuration={0}
                previewOpenValue={.01}
                keyExtractor={(rowData, index) => {
                    return rowData.name.toString();
                }}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    this.setState({ refreshing: true })
                    this.fetchMarketList();
                }}
            />
        </View>)
    }
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    backTextWhite: {
        color: '#FFF'
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: '#FAA732',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: '#d43f3a',
        right: 0
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: Dimensions.get('window').width / 4,
    }
});