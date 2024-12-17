---
title: 快速开始
sidebar_label: '快速开始'
sidebar_position: 2
---
<br/>

## ⭐ 快速简单的整合方式 
PassTo CreditPay 提供灵活的 API 对接方案，旨在为平台提供便捷高效的接入体验。我们的 API 设计充分考虑开发者的需求，确保快速、安全的集成。
<br/>

## 开发者快速上手
### 步骤 ①：登录
为确保安全，PassTo CreditPay 提供了 OAuth2.0 标准的授权流程，用户只需在页面中点击一次，即可完成授权的过程，并跳转到PassTo Credit Pay收银台， 使用获取到的条码进行支付。  

[__身份验证__](./auth)：为确保交易的安全性，我们采用了先进的鉴权机制，每个请求都需要进行身份验证才能执行。此机制保证了信息交换过程的安全可靠。  
[__获取一次性授权码__](./apis/platform-identify.md)：为保持平台与PassTo CreditPay双方的会话同步。平台请求PassTo CreditPay获取一次性验证码时，需要带上用户的会话token。  
[__一次性授权登录__](./apis/identify-redirect.md)：使用获取到携带一次性授权码的URL进行跳转，完成登录。  
<br/>

### 步骤 ②：开发授信额接口
**❗ 需要平台自行开发**，并配置到PassTo CreditPay后台，供PassTo CreditPay调用获取授信额度。

**授信额**：平台允许用户当次交易可以使用的额度。  
[获取授信额度](./platform-actions/get-credit-limit.md)：PassTo CreditPay将如何请求平台授信额度接口。以及授信额度接口需要返回的接口数据格式要求。  
<br/>

### 步骤 ③：配置Webhook监听（可选）
**❗ 需要平台自行开发**，并配置到PassTo CreditPay后台，PassTo CreditPay将通过该接口推送事件通知。  
[Webhook](./webhooks/events.md)：PassTo CreditPay将通过Webhook方式通知所有事件。方便平台根据事件做出相应的业务处理。
<br/>

## 鉴权流程图
![鉴权流程图](../../assets/OAuth2.0-v1.0.0.drawio.png)


:::tip
平台与Credit Pay的所有API交互都需要进行身份验证。  
* [API Key](auth)
* [HMAC 签名](auth)
:::

<!-- ## 鉴权登录
平台接入Credit Pay，需要接入以下接口  
[获取一次性授权码](./apis/platform-identify.md)  
[一次性授权登录](./apis/identify-redirect.md)

## 授信额度
完成登录后，会自动跳转收银台。  
跳转收银台过程中，Credit Pay会向平台请求授信额度，平台方需要返回授信额度。  
:::warning
平台需要自行实现授信额接口，供Credit Pay调用。
:::
[返回授信额度](./platform-actions/get-credit-limit.md)

## 通知Webhook
业务流程中，Credit Pay会向平台方发送通知，平台方需要实现webhook接受通知。
:::warning
业务事件将通过POST请求发送到平台方指定的webhook地址，平台方需要自行实现webhook接收。
:::
[Webhook](./webhooks/events.md) -->

