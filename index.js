/** @format */

import { AppRegistry, Alert } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import localStorage from './src/utils/storage';

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);