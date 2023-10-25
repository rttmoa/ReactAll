---
title: Environment Variables
---

## Required

```bash
# Platform
PORT=5000
ROOT_URL=http://localhost:5000

# Communication in Microservices [https://moleculer.services/docs/0.14/networking.html](https://moleculer.services/zh/docs/0.14/networking.html)
TRANSPORTER=redis://127.0.0.1:6379

# Cache https://moleculer.services/zh/docs/0.14/caching.html
CACHER=redis://127.0.0.1:6379/1

# Database
MONGO_URL=mongodb://127.0.0.1:27017/steedos
MONGO_OPLOG_URL=mongodb://127.0.0.1:27017/local

```

## Login

```bash
STEEDOS_TENANT_ENABLE_REGISTER=true 
STEEDOS_TENANT_ENABLE_FORGET_PASSWORD=true  
STEEDOS_TENANT_ENABLE_CREATE_TENANT=false  
STEEDOS_TENANT_ENABLE_PASSWORD_LOGIN=true
STEEDOS_TENANT_ENABLE_BIND_EMAIL=false 
STEEDOS_TENANT_ENABLE_BIND_MOBILE=false 
STEEDOS_TENANT_ENABLE_EMAIL_CODE_LOGIN=false 
STEEDOS_TENANT_ENABLE_MOBILE_CODE_LOGIN=false 
STEEDOS_TENANT_TOKEN_SECRET=  
STEEDOS_TENANT_ACCESS_TOKEN_EXPIRES_IN= 
STEEDOS_TENANT_REFRESH_TOKEN_EXPIRES_IN=  
```

# deploy

```bash
METADATA_SERVER=http://localhost:5000
METADATA_APIKEY=
```

## File Storage

### local

```bash
STEEDOS_CFS_STORE=local
STEEDOS_STORAGE_DIR=/app/storage
```

### S3

```bash
STEEDOS_CFS_STORE=S3
STEEDOS_CFS_AWS_S3_ENDPOINT=http://minio:9000
STEEDOS_CFS_AWS_S3_FORCE_PATH_STYLE=true
STEEDOS_CFS_AWS_S3_BUCKET=steedos-prod
STEEDOS_CFS_AWS_S3_ACCESS_KEY_ID=${MINIO_ROOT_USER:-steedos} 
STEEDOS_CFS_AWS_S3_SECRET_ACCESS_KEY=${MINIO_ROOT_PASSWORD:-steedos123}
```
### Download without logging in.

```bash
STEEDOS_CFS_DOWNLOAD_PUBLIC=avatars,images # Optional avatars, images, files, with the default value of avatars.
```

## Push Notification

Configure the relevant parameters of the push notification on the mobile phone, which is used for the Steedos mobile app to receive notification messages.

```bash
# iPhone
STEEDOS_PUSH_APN_DATA=

# android
STEEDOS_GCM_APIKEY=
STEEDOS_GCM_PROJECT_NUMBER=

# huawei
STEEDOS_PUSH_HUAWEI_APPID=
STEEDOS_PUSH_HUAWEI_APPPKGNAME=
STEEDOS_PUSH_HUAWEI_APPSECRET=

# xiaomi
STEEDOS_PUSH_MI_APPSECRET=
STEEDOS_PUSH_MI_PRODUCTION=
```

## Email

```bash
STEEDOS_EMAIL_FROM=
STEEDOS_EMAIL_URL=
STEEDOS_EMAIL_HOST=
STEEDOS_EMAIL_PORT=
STEEDOS_EMAIL_USERNAME=
STEEDOS_EMAIL_PASSWORD=
STEEDOS_EMAIL_SECURE=
STEEDOS_EMAIL_SIGNNAME=
```

## OIDC

```bash
# OpenID Connect
STEEDOS_IDENTITY_OIDC_ENABLED=true
STEEDOS_IDENTITY_OIDC_CONFIG_URL=https://id.steedos.cn/realms/master/.well-known/openid-configuration
STEEDOS_IDENTITY_OIDC_CLIENT_ID=steedos-oidc-public
STEEDOS_IDENTITY_OIDC_CLIENT_SECRET=none
STEEDOS_IDENTITY_OIDC_NAME=Steedos ID
STEEDOS_IDENTITY_OIDC_LOGO=
STEEDOS_IDENTITY_OIDC_REQUIRE_LOCAL_ACCOUNT=false
```

## Cron job configuration.

```bash
STEEDOS_CRON_BUILD_INDEX="0 0 * * * *"
STEEDOS_CRON_WORKFLOW_RULE='*/10 * * * * *'
STEEDOS_CRON_MAILQUEUE_INTERVAL=10000
STEEDOS_CRON_PUSH_INTERVAL=1000
STEEDOS_CRON_WEBHOOKQUEUE_INTERVAL=10000
STEEDOS_CRON_INSTANCERECORDQUEUE_INTERVAL=10000
STEEDOS_CRON_SMSQUEUE_INTERVAL=1000
STEEDOS_CRON_OBJECTWEBHOOKSQUEUE_INTERVAL=10000
```

## Graphql

```bash
STEEDOS_GRAPHQL_ENABLE_CONSOLE=true
```

* STEEDOS_GRAPHQL_ENABLE_CONSOLE: Controls whether the Graphql editor is displayed, default true, configurable false suppression, editor access address '{ROOT_URL}/graphql'.

## ProcessTrigger

```
STEEDOS_ENABLE_PROCESS_TRIGGER=true
```

- STEEDOS_ENABLE_PROCESS_TRIGGER: Controls whether process triggers execute