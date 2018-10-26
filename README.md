#### 注意事项：

1.本项目内ac-qrcode 使用的版本为1.0.1，但是作者仅更新了github上的源码并未更新npmjs.com上的版本，所以npm install ac-qrcode --save后，请在node_modules中找到package.json和QRScanner.js，更新这2个文件。  
2.如果有需要调用React.PropTypes的地方，请`import PropTypes from 'prop-types'`安装一下。  
3.在本地运行`react-native run-ios`时，会自动在ios文件夹内创建一个build文件夹，如果你直接用XCode打开过，且默认项目内引用了这个build文件请删除，否则会报循环引用错误。  
4.在ios文件夹内的bundle文件为打包文件，当你运行`npm run bundle-ios`时会将打包的内容放到此文件夹内。  
5.发布应用前，请先移除build文件的引用，然后添加bundle文件的引用，同时将
```
Product > Scheme > Edit Scheme...中Build Configuration选项改成Release
```