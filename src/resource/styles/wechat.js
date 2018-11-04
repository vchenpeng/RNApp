import { StyleSheet } from 'react-native';
import { Colors } from '../index';

export default StyleSheet.create({
    image_bottom_menu: {
        height: 46,
        width: 46,
        resizeMode: 'contain'
    },
    view_bottom_menu_item: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    text_bottom_menu_item: {
        color: Colors.white_fff,
        marginTop: 8
    }
})