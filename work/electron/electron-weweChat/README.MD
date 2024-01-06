# weweChat

<img src="https://github.com/trazyn/weweChat/blob/master/resource/128x128.png" />

> Icon by [honey4809](https://github.com/honey4809)

[![Current Release](https://img.shields.io/github/release/trazyn/weweChat.svg?style=flat-square)](https://github.com/trazyn/ieaseMusic/releases)
[![Travis CI status](https://img.shields.io/travis/trazyn/weweChat/dev.svg?style=flat-square)](https://travis-ci.org/trazyn/weweChat/branches)
[![JS Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

## 👀 使用 React、MobX 和 Electron 构建的非官方微信客户端。

API from [https://web.wechat.com/](https://web.wechat.com/)

## [CHANGELOG](https://github.com/trazyn/weweChat/blob/master/CHANGELOG.MD)

## Feature 功能

- 1. 在桌面上工作
  2. 在 macOS ，Window 活力效果
  3. 阻止消息召回（默认设置不阻止）
  4. 桌面通知
  5. 支持键盘快捷键
  6. 通过粘贴发送图像
- ![preview](https://raw.githubusercontent.com/trazyn/weweChat/master/screenshots/pasteconfirmation.png)
- 拖动发送文件
  ![preview](https://raw.githubusercontent.com/trazyn/weweChat/master/screenshots/dragdrop.png)
- 批量发送消息
  ![preview](https://raw.githubusercontent.com/trazyn/weweChat/master/screenshots/batchsend.png)
- 发送 GIF emoji
  ![preview](https://raw.githubusercontent.com/trazyn/weweChat/master/screenshots/sendgif.gif)
-

## Install

Download the last version on the [website](https://github.com/trazyn/weweChat/releases/latest) or below.

#### Mac(10.9+)

[Download](https://github.com/trazyn/weweChat/releases/download/v1.1.6/wewechat-1.1.6-mac.dmg) the `.dmg` file.
Or use [Homebrew-Cask](https://caskroom.github.io/):

```
$ brew cask install wewechat
```

#### Linux

[Download](https://github.com/trazyn/weweChat/releases)
Centos/RHEL please download `.rpm` packages.
Debian/Ubuntu please download `.deb` pacages.
Other linux distribution please download `.AppImage` packages.

Install deb package for Debian / Ubuntu:

```
$ sudo dpkg -i wewechat-1.1.6-amd64.deb
```

Install rpm package for Centos / RHEL:

```
$ sudo yum localinstall wewechat-1.1.6-x86_64.rpm
```

Install AppImage package for other linux distribution:

```
$ chmod u+x wewechat-1.1.6-x86_64.AppImage
$ ./wewechat-1.1.6-x86_64.AppImage
```

#### Windows

[Download](https://github.com/trazyn/weweChat/releases/download/v1.1.6/wewechat-1.1.6-win-setup.exe) the `.exe` file.

## Screenshot 截屏

![preview](https://raw.githubusercontent.com/trazyn/weweChat/master/screenshots/0.png)
![preview](https://raw.githubusercontent.com/trazyn/weweChat/master/screenshots/1.png)
![preview](https://raw.githubusercontent.com/trazyn/weweChat/master/screenshots/2.png)
![preview](https://raw.githubusercontent.com/trazyn/weweChat/master/screenshots/3.png)
![preview](https://raw.githubusercontent.com/trazyn/weweChat/master/screenshots/4.png)

## Development

```
$ npm install
$ npm run dev
```

Generate the binary:

* For Linux

```
$ npm run package-linux
```

Maybe you will install some depends packages.

* For Mac

```
$ npm run package-mac
```

After that, you will see the binary in `./release` folder

## Keyboard shortcuts

| Description           | Keys                                                                    |
| --------------------- | ----------------------------------------------------------------------- |
| New conversation      | `<kbd>`Cmd `</kbd>` `<kbd>`N `</kbd>`                           |
| Search conversations  | `<kbd>`Cmd `</kbd>` `<kbd>`F `</kbd>`                           |
| Hide conversation     | `<kbd>`Shift `</kbd>` `<kbd>`Cmd `</kbd>` `<kbd>`M `</kbd>` |
| Jump to conversation  | `<kbd>`Cmd `</kbd>` `<kbd>`0 `</kbd>` ... `<kbd>`9 `</kbd>` |
| Next conversation     | `<kbd>`Cmd `</kbd>` `<kbd>`J `</kbd>`                           |
| Previous conversation | `<kbd>`Cmd `</kbd>` `<kbd>`K `</kbd>`                           |
| Batch message         | `<kbd>`Cmd `</kbd>` `<kbd>`B `</kbd>`                           |
| Toggle Full Screen    | `<kbd>`Shift `</kbd>` `<kbd>`Cmd `</kbd>` `<kbd>`F `</kbd>` |
| Insert QQ emoji       | `<kbd>`Cmd `</kbd>` `<kbd>`I `</kbd>`                           |
| Preferences           | `<kbd>`Cmd `</kbd>` `<kbd>`,`</kbd>`                            |

### TODO

- [X] Windows support
- [X] Linux support
- [X] Sticky on top
- [X] Delete chat session
- [X] Mark as Read
- [X] Chat Room
  - [X] Show correct contact
  - [X] Show members
  - [X] Add / Remove member
  - [X] Create chat room
- [X] Receive message
  - [X] Text
  - [X] Image
  - [X] Voice
  - [X] Location
  - [X] Sticker
  - [X] Contact Card
  - [X] Video
  - [X] Money Transger
  - [X] Location sharing
  - [X] Download File
- [X] Send message
  - [X] Text
  - [X] File
  - [X] Image
  - [X] Video
  - [X] Recall
- [X] Forward text message
- [X] Forward emoji
- [X] Forward image
- [X] Forward file
- [X] Forward video
- [X] Show QQ emoji
- [X] Search chat set
- [X] Search and create chat room
- [X] Desktop notification
- [X] Keep online
- [X] Logout
- [X] Autosart at login
- [X] Send image from clipboard
- [X] Drag to send file
- [X] Batch send message
- [ ] Mention a user

### FAQ

- ~~`Mac` 上如何修改图标，请参考 #39（另外问下，有没屌大的或者胸大的帮忙设计一个图标啊）~~
- 关于历史记录的问题请参考 #30

### License

MIT License
