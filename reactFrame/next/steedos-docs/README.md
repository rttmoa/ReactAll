# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```shell
yarn
```

### Local Development

```shell
yarn start
```

调试中文版 

```shell
yarn start -- --locale zh-CN
```

更新中文翻译资源

```shell
yarn write-translations -- --locale zh-CN
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```shell
yarn build
yarn build:openapi
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
