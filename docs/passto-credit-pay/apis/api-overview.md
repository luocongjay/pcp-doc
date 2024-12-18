---
title: API请求
sidebar_position: 1
---
👀 了解 PassTo CreditPay API   

PassTo CreditPay API采用RESTful风格构建，设计了可预测的资源导向URL，以确保高效的访问。我们的API返回JSON格式的响应，旨在提供简洁明了的数据交互体验。
***

## API常用请求参数
| 关键参数  | 类型   | 描述                                                                    |
| --------- | ------ | ----------------------------------------------------------------------- |
| signature | string | HMAC签名，针对请求`path`和`body`进行签名，详情请参考[身份校验](../auth) |
| api-key   | string | API密钥，详情请参考[身份校验](../auth)                                  |
<br />    

## API常用响应参数
| 参数名 | 类型   | 描述     |
| ------ | ------ | -------- |
| code   | int    | 状态码   |
| msg    | string | 响应消息 |
| data   | object | 响应数据 |

## API常用响应码
| 状态码 | 描述                    |
| ------ | ----------------------- |
| 0      | 成功                    |
| 500    | 服务端错误，详情见`msg` |
