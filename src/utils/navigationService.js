import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}
function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}
function replace(routeName, params) {
    _navigator.dispatch(
        StackActions.replace({
            routeName,
            params,
        })
    );
}
function back(routeName, params) {
    _navigator.dispatch(
        NavigationActions.back()
    );
}

export default {
    navigate,
    replace,
    setTopLevelNavigator,
    back
};