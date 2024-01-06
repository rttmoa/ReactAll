# NeteaseCloudMusic Electron

[![devDependency Status](https://david-dm.org/disoul/electron-cloud-music/dev-status.svg)](https://david-dm.org/disoul/electron-cloud-music#info=devDependencies)
网易云音乐Electron版

## 👀 使用 React、Redux 和 Electron 构建的非官方网易云客户端。

## 进度

* 搜索歌曲+播放（版权歌曲无法播放
* 播放列表
* 手机登陆
* 个人歌单（创建，收藏
* 歌曲界面（滚动歌词
* 主页推荐
* 喜欢歌曲 && 自动向网易提交听歌记录
* [TODO] 私人FM

![预览截图](http://7xn38i.com1.z0.glb.clouddn.com/QQ20161106-1@2x.png)
![预览截图](http://7xn38i.com1.z0.glb.clouddn.com/QQ20161106-0@2x.png)
![预览截图](http://7xn38i.com1.z0.glb.clouddn.com/QQ20161106-2@2x.png)

## 试用

打包了64位的linux和mac，见[release](https://github.com/disoul/electron-cloud-music/releases/tag/0.0.2)

## Build

```bash
git clone https://github.com/disoul/electron-cloud-music && cd electron-cloud-music
npm install

# Dev

# Start dev server
npm run dev

# run cloudmusic in proj root path
# electron will load from 127.0.0.1:8080(webpack-dev-server
npm start

# Release

vim main.js
# edit main.js like this
//mainWindow.loadURL('http://127.0.0.1:8080');
mainWindow.loadURL('file://' + __dirname + '/index.html');

# build
make release
```
