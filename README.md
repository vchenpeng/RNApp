#### 注意事项：

1.本项目内ac-qrcode 使用的版本为1.0.1，但是作者仅更新了github上的源码并未更新npmjs.com上的版本，所以npm install ac-qrcode --save后，请在node_modules中找到package.json和QRScanner.js，更新这2个文件;~~或者你可以使用本人当前github上的ac-qrcode版本~~（此库已经直接引入项目内）  
2.如果有需要调用React.PropTypes的地方，请`import PropTypes from 'prop-types'`安装一下。  
3.在本地运行`react-native run-ios`时，会自动在ios文件夹内创建一个build文件夹，如果你直接用XCode打开过，且默认项目内引用了这个build文件请删除，否则会报循环引用错误。  
4.在ios文件夹内的bundle文件为打包文件，当你运行`npm run bundle-ios`时会将打包的内容放到此文件夹内。  
5.发布应用前，请先移除build文件的引用，然后添加bundle文件的引用，同时将
```
Product > Scheme > Edit Scheme...中Build Configuration选项改成Release
```
6.因为`react-native-scrollable-tab-view`的作者没有更新npmjs版本，所以此处用的另一个开发解决的版本，后期待原版本调整请切换一下。  
7.选择图片API
```
地址：git+https://github.com/vchenpeng/react-native-syan-image-picker.git

self.navigationBar.barTintColor = [UIColor colorWithRed:(59/255.0) green:(175/255.0)  blue:(218/255.0) alpha:1.0];

选择本地相册库中配置字体: TZImagePickerController.m
Line:265设置字体大小
```
8.设置是否开启设置摇一摇开启调试
[self setIsShakeToShowDevMenuEnabled:NO];