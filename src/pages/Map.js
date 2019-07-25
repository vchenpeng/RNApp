import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import MapView from '../components/Amap/index'

export default class Map extends Component {
  componentDidMount() {
    // this.map.addPoint({
    //   lon: 121.30677,
    //   lat: 31.290549,
    //   title: '南翔镇1',
    //   subtitle: '这是描述1'
    // })
    // this.map.addPoint({
    //   lon: 121.30877,
    //   lat: 31.290449,
    //   title: '南翔镇2',
    //   subtitle: '这是描述2'
    // })
    // this.map.setLocationEnabled(true)
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          showsCompass={true}
          showsZoomControls={true}
          locationEnabled={true}
          showsScale={true}
          showsLocationButton={true}
          zoomLevel={12}
          map={'satellite'}
          coordinate={{ latitude: 31.282378, longitude: 121.353456 }}
          ref={_ref => (this.map = _ref)}
          style={{ flex: 1 }}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
