# Creator

华炎魔方最终打包运行的是一个Meteor应用，其源码都在该文件夹内。

## 目录索引

- [Meteor项目配置](/creator/.meteor/README.md)：这里存放的是Meteor项目的各种配置文件，项目比如依赖哪些Meteor包，使用的Meteor内核版本是多少等。
- [辅助打包脚本](/creator/.scripts/README.md)：这里存放的是用于辅助解决项目在打包或运行过程中可能出现的各种异常问题。
- [Meteor应用文件](/creator/app/README.md)：这里存放的是华炎魔方包括前后端在内的Meteor应用文件。
- [前端脚本](/creator/client/README.md)：这里存放的是华炎魔方Meteor项目运行于浏览器或客户端时会自动执行的脚本文件。
- [React组件模块](/creator/imports/README.md)：这里存放的是要导入到华炎魔方Meteor项目内的React组件。
- [Meteor功能包](/creator/packages/README.md) ：这里每个文件夹都是华炎魔方Meteor项目依赖的各种功能包。
- [静态资源文件](/creator/public/README.md) ：这里存放的是华炎魔方Meteor项目依赖的各种静态资源文件。

## NPM Scripts说明

本项目提供以下可执行的脚本命令：

- start: 执行 `meteor run` 启动 [Meteor](https://www.meteor.com/) 应用。
- start-verbose: 同 `start`，区别是以verbose日志模式启动应用。
- build: 执行 `meteor build` 把 [Meteor](https://www.meteor.com/) 应用打包为一个 NPM 包，详情请参阅后续 [打包Creator项目](#打包creator项目) 小节。
- pub: 执行 `npm publish` 打包后的 NPM 包。
- prepare: 运行 yarn 命令时会预执行的脚本，其中包括集成注入依赖的前端React组件包 `@steedos-ui/builder-community` 的脚本。

脚本具体内容请查阅 [package.json](./package.json) 文件中的 scripts 属性。

## 远程开发调式

要运行该项目调式开发源码，需要先安装开发环境，我们推荐使用 [Gitpod](https://gitpod.io/) 来启动远程开发环境，以免去本地安装开发环境的繁琐过程。

远程开发环境已经安装并初始化好必须的组件，包括 nodejs, mongodb, redis, vscode, meteor 等，只需要在浏览器中输入地址 `https://gitpod.io/#{Git仓库地址}` 即可使用 [Gitpod](https://gitpod.io/) 启动远程开发环境。

以下开发步骤适用于开发调式`/creator`路径下的源码，它是一个Meteor应用，如果想开发调式的是该Meteor应用依赖的华炎魔方平台源码，即`/packages`路径下的各种NPM包源码，请查阅另一个远程开发调式教程：[启动远程开发环境](https://www.steedos.cn/docs/developer/gitpod)。

### 开发前准备

#### 开通华炎魔方云服务

请按该 [教程](https://steedos.cn/docs/deploy/deploy-activate) 开通华炎魔方云服务。

#### 激活华炎魔方

请参考该 [文档](https://steedos.cn/docs/deploy/deploy-activate)，准备好后续运行项目时激活华炎魔方依赖的两个环境变量。

#### 注册GitPod账户

我们推荐使用Gitpod来在线开发华炎魔方项目，这样可以免去安装开发环境的繁琐过程。 如果没有 [Github](https://github.com/) 账户和 [Gitpod](https://gitpod.io/) 账户，请分别注册并使用浏览器登录它们。

### Fork项目

如果要调式华炎魔方平台源码，请Fork [华炎魔方平台源码](https://github.com/steedos/steedos-platform)，后续我们使用Gitpod在线开发Fork后的项目的话就可以把开发后的代码提交到Git仓库。

我们欢迎大家提交 PR 到平台源码，贡献智慧给华炎魔方开源社区。

### 启动远程开发环境

只要在浏览器中输入地址 `https://gitpod.io/#{之前Fork下来的Git仓库地址}` 即可使用 Gitpod 启动远程开发环境。

比如访问地址 <https://gitpod.io/#https://github.com/steedos/steedos-platform> 即可在线运行 [华炎魔方平台源码](https://github.com/steedos/steedos-platform) 项目，可以把#号后面的Git仓库地址换成您希望运行的任何华炎魔方项目的Git仓库地址。

Gitpod 启动远程开发环境时会自动分配远程服务器资源，安装好相关开发环境，并把#号后面的Git仓库地址中的项目克隆下来初始化，一切就绪后就会自动把浏览器地址重定向到Gitpod初始化好的Workspaces访问地址。

为了方便快速启动远程开发环境，可以安装Chrome插件 [Gitpod - Always ready to code](https://chrome.google.com/webstore/detail/gitpod-always-ready-to-co/dodmmooeoklaejobgleioelladacbeki)，这样使用Chrome浏览器访问任何一个Git仓库主页时都可以看到一个名为Gitpod的按钮，点击它即可一键启动远程开发环境。

> 我们还可以访问 [Gitpod官网个人设置页面](https://gitpod.io/preferences) 勾选 `Open in Desktop IDE` 选项来开启使用本地VS Code打开远程Gitpod项目的功能，该功能开启后，就可以使用本地VS Code打开Gitpod项目了。

### 运行魔方平台

在浏览器中打开项目后，会自动在项目根目录执行`yarn`指令安装项目依赖项，并自动执行`yarn start`指令运行项目。

需要注意的是，平台源码项目根目录运行的是源码项目内的模板项目，该项目路径为 `examples/project-template`，执行npx create-steedos-app命令创建的模板项目也是来自于这个文件夹。

### 运行Creator项目

经过上面的步骤我们只是运行起来了平台中的模板项目，运行的并不是Creator项目，接下来请执行以下步骤来运行Creator项目源码：

- 请先访问之前跑起来的模板项目，并输入华炎魔方初始账户和密码来确认之前已经成功激活和初始化好魔方项目。
- 按`CTRL + C`来停止之前跑起来的模板项目。
- 命令行`cd`进入creator文件夹。
- 执行`yarn`命令安装项目依赖包，并确保最后没有报错日志。
- 执行`yarn start`命令来运行`creator`项目。

运行该项目有以下注意事项：

- `.env.local`文件中的端口号为3100，该端口号在`package.json`的`start`指令中写死了，不可以变更端口号，如果想换端口号的话，需要同时把`start`指令中的端口号参数同时改掉。
- 请不要变更`.env.local`文件中的`MONGO_URL`参数指向其他数据库，默认它指向的是之前运行模板项目时初始化过的数据库，否则无法使用华炎魔方初始账户来登录系统。

### 访问Creator项目

上面的Creator项目运行起来后，是不会自动打开浏览器窗口来访问项目的，可以手动在浏览器中输入Gitpod-Workspaces访问地址并加上要访问的项目端口号作为前缀即可访问它。

比如假设之前开启的远程开发环境打开的Workspaces访问地址为 `https://white-silverfish-e5vy4oyh.ws-us25.gitpod.io`，我们只要输入地址 `https://3100-white-silverfish-e5vy4oyh.ws-us25.gitpod.io` 即可访问刚运行起来的Creator项目。

### 调式Creator源码

按上面步骤运行起来Creator项目后，我们就可以调式Creator项目源码了，这里指的源码是指Creator文件夹内的代码，可以参考该文件夹内的相关`README.md`文件来了解相关项目的介绍说明。

在改动Creator项目源码后，不需要重启服务来测试确认代码效果，因为该项目有热启动功能，只要改动源码会自动重新编译运行项目。

需要注意的是，在Creator项目中的系统配置文件 `steedos-config.yml` 并没有生效，而是使用根目录下名为 `settings.json` 配置文件来配置系统参数，它支持的参数与前者是一样的，只是编写格式不一样而已。

### 打包Creator项目

在命令行执行以下指令即可打包`/creator`目录下的Meteor项目，当打包成功后会把打包后的文件自动拷贝到`/server`文件夹下作为一个名为"steedos-server"的NPM包被华炎魔方平台引用。

```sh
cd creator/
export TOOL_NODE_FLAGS="--max-old-space-size=3800"
yarn run build
```

### 测试

按以上指令打包完Creator项目后，打包后的文件会被自动拷贝到`/server`文件夹下，要测试打包后的Creator项目，只需要执行以下指令来重新运行华炎魔方平台根目录下的模板项目即可：

```sh
cd ../
yarn start
```

如果项目运行完成后没有自动打开浏览器窗口访问项目的话，可以手动在浏览器中输入Gitpod-Workspaces访问地址并加上要访问的项目端口号`5000-`作为前缀即可访问它。
