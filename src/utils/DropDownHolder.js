import React, { Component } from 'react';
import DropdownAlert from 'react-native-dropdownalert';

export default class DropDownHolder {
    static dropDown;
    static setDropDown(dropDown) {
        this.dropDown = dropDown;
    }
    static getDropDown() {
        return this.dropDown;
    }
    static alert(title, message, type) {
        setTimeout(() => {
            let alertType = 'info';
            // message处理
            let alertMessage = message ? message : '';
            // 图标处理
            if (!type) {

            } else {
                alertType = type;
            }
            this.dropDown.alertWithType(alertType, title, alertMessage);
        }, 0);
    }
}