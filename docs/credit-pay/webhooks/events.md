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

### 事件示例
#### PAY_TIMEOUT
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

#### REFUND
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