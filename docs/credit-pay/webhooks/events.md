---
title: 事件列表
---
:::warning
需要在Credit Pay后台配置用于接收事件的Webhooks  
配置的URL需要允许公网`POST`请求
:::

### 事件列表
| 事件名称        | 事件描述      |
| --------------- | ------------- |
| PAY_TIMEOUT     | 支付超时      |
| REFUND          | 退款          |
| PAY_FAILED      | 支付失败      |
| PAY_SUCCESS     | 支付成功      |
| SESSION_RENEWAL | 用户token续期 |
<br/>

### Webhook请求参数示例
#### Headers
| 参数名      | 类型   | 描述                                                                          |
| ----------- | ------ | ----------------------------------------------------------------------------- |
| signerature | string | 针对path和body的签名，使用sha1签名算法，签名算法参考文档：[HMAC签名](../auth) |
| token"      | string | 平台用户token, 与平台获取一次性二维码授权码时传入的customer_token一致法。     |
| trace       | string | 用于标识本次请求的唯一id，用于排查问题，请保持唯一。                          |
| timestamp   | string | 请求时间戳, 13位。                                                            |
<br/>

#### Body
| 参数名      | 类型   | 描述                                                                            |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| type        | string | 事件类型，例如：PAY_SUCCESS                                                     |
| platform_id | string | 平台唯一ID                                                                      |
| retry       | int    | 重试次数，默认为0，当为0时，表示第一次发送，当为1时，表示第二次发送，以此类推。 |
| event_id    | string | 事件唯一ID，用于标识本次事件，请保持唯一。                                      |
| data        | object | 数据内容参考对应以下`事件类型`                                                  |
<br/>

### 返回参数要求
**接收方返回状态码200，视为通知成功。**
**其余状态码视为通知失败。CreditPay将会重试通知，频率为5分钟一次。最大重试次数10次**
<br/>


### 事件类型示例
### PAY_TIMEOUT
```json
{
    "tag": "1273",
    "token": "xxxxecf991aa19f1902a760dcb439d85_cd3e512f380e3a757171c8b282be01a6",
    "amount": "",
    "currency": "",
    "orderNo": "",
    "tradeTime": 1734085802167,
    "merchantName": "",
    "chargeOrderNo": "",
    "realIp": "",
    "remark": ""
}

```
<br/>

### REFUND
```json
{
    "tag": "1515",
    "token": "a1472263c7b97095f095cb624adccc60_ad0975be-877c-4420-8e2e-8a1xxxxx",
    "amount": "0.01",
    "currency": "CNY",
    "realIp": "",
    "orderNo": "3_20241125300002008527461251547252",
    "tradeTime": 1732539755000,
    "chargeOrderNo": "3_2024112504200246001077424466",
    "merchantName": "%E9%80%80%E6%AC%BE-%E6%B7%B1%E5%9C%B3%E9%BE%99%E5%B2%97%E5%8C%BA%E6%AC%A3%E7%99%BE%E4%BD%B3%E7%99%BE%E8%B4%A7%E5%95%86%E8%A1%8C",
    "remark": ""
}
```
<br/>

### PAY_FAILED
```json
{
    "tag": "359",
    "token": "a1472263c7b97095f095cb624adccc60_ad0975be-877c-4420-8e2e-8a1xxxxx",
    "amount": "",
    "currency": "",
    "realIp": "",
    "orderNo": "",
    "tradeTime": 1732601067646,
    "merchantName": "",
    "result": "fail",
    "remark": ""
}
```
<br/>

### PAY_SUCCESS
```json
{
    "tag": "359",
    "token": "a1472263c7b97095f095cb624adccc60_ad0975be-877c-4420-8e2e-8a1xxxxx",
    "amount": "0.01",
    "currency": "CNY",
    "realIp": "",
    "orderNo": "3_2024112604200246001077582932",
    "tradeTime": 1732601183000,
    "merchantName": "%E6%B7%B1%E5%9C%B3%E9%BE%99%E5%B2%97%E5%8C%BA%E6%AC%A3%E7%99%BE%E4%BD%B3%E7%99%BE%E8%B4%A7%E5%95%86%E8%A1%8C",
    "result": "success",
    "remark": ""
}
```
<br/>

### SESSION_RENEWAL
```json
{
    "token": "a1472263c7b97095f095cb624adccc60_ad0975be-877c-4420-8e2e-8a1xxxxx",
    "timestamp": 1732586406526
}
```
<br/>