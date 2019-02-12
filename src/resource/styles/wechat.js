import { StyleSheet } from 'react-native';
import { Colors } from '../index';

export default StyleSheet.create({
    image_bottom_menu: {
        height: 50,
        width: 50,
        marginBottom: 10,
    },
    view_menu_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingBottom: 20,
    },
    text_menu_title: {
        color: 'white',
        fontSize: 14
    },
    view_menu_item_container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})