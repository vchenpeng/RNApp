/** @format */
import { Navigation } from "react-native-navigation";
import { AppRegistry, Alert } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import SignIn from './src/pages/SignInScreen';
import Mine from './src/pages/Mine';
import Web from './src/pages/Web';

console.disableYellowBox = true;
// AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent(`navigation.rn.Root`, () => App);
Navigation.registerComponent(`navigation.rn.MineScreen`, () => Mine);
Navigation.registerComponent(`navigation.rn.SiginInScreen`, () => SignIn);
Navigation.registerComponent(`navigation.rn.WebScreen`, () => Web);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
        topBar: {
            visible: false,
            drawBehind: true
        },
        bottomTabs: {
            visible: false,
            animate: false,
            drawBehind: true
        },
        overlay: {
            interceptTouchOutside: true
        },
    });
    Navigation.setRoot({
        root: {
            bottomTabs: {
                visible: true,
                children: [{
                    stack: {
                        children: [{
                            component: {
                                name: 'navigation.rn.MineScreen',
                                passProps: {
                                    text: 'This is tab 1'
                                }
                            }
                        }],
                        options: {
                            bottomTab: {
                                text: 'Tab 1',
                                // icon: require('../images/one.png'),
                                testID: 'FIRST_TAB_BAR_BUTTON'
                            }
                        }
                    }
                },
                {
                    component: {
                        name: 'navigation.rn.SiginInScreen',
                        passProps: {
                            text: 'This is tab 2'
                        },
                        options: {
                            bottomTab: {
                                text: 'Tab 2',
                                // icon: require('../images/two.png'),
                                testID: 'SECOND_TAB_BAR_BUTTON'
                            }
                        }
                    }
                }]
            }
        }
    });

});