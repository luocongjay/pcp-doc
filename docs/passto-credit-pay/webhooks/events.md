---
title: 事件列表
---
### 介绍
📫 PassTo CreditPay在交易生命周期的每个阶段，通过Webhook实时向外界传递系统内的行为信息。平台能够根据不同事件灵活调整，实施相应的业务策略以优化用户体验。
:::warning
需要在PassTo Credit Pay后台配置用于接收事件的Webhooks  
配置的URL需要允许公网`POST`请求
:::
***

<br/>

### 事件列表
| 事件名称            | 事件描述           |
| ------------------- | ------------------ |
| PAY_START           | 请求支付           |
| ASSIGN_SUCCESS      | 分配成功           |
| ASSIGN_FAILED       | 分配失败           |
| GET_BARCODE_SUCCESS | 获取支持条码成功   |
| GET_BARCODE_FAILED  | 获取支持条码失败   |
| PAY_SUCCESS         | 支付成功（多次）   |
| REFUND              | 退款（多次）       |
| PAY_TIMEOUT         | 支付结束（未付款） |
| PAY_FINISH          | 支付结束（已付款） |
| SESSION_RENEWAL     | token续期          |

:::warning
1. PAY_SUCCESS 通常情况下会在PAY_TIMEOUT之前出现。当网络出现波动时，PAY_SUCCESS可能会在PAY_TIMEOUT之后出现。
:::

### Webhook请求参数示例
#### Headers
| 参数名      | 类型   | 描述                                                                               |
| ----------- | ------ | ---------------------------------------------------------------------------------- |
| signerature | string | 针对path和body的签名，使用HMAC-SHA1签名算法，签名算法参考文档：[身份校验](../auth) |
| token"      | string | 平台用户token, 与平台获取一次性二维码授权码时传入的customer_token一致。            |
| trace       | string | 用于标识本次请求的唯一id，用于排查问题，请保持唯一。                               |
| timestamp   | int    | 请求时间戳, 13位。                                                                 |
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
<br/>

### 开始获取条码
```json
```

### 获取条码成功
```json
```

### 获取条码失败
```json
```

### 刷新条码
```json
```

### 支付成功
```json
```

### 支付已完成
**PAY_SUCCESS**
```json
{
    "tag": "359",
    "token": "a1472263c7b97095f095cb624adccc60_ad0975be-877c-4420-8e2e-8a1xxxxx",
    "amount": "0.01",
    "currency": "CNY",
    "real_ip": "",
    "order_no": "3_2024112604200246001077582932",
    "trade_time": 1732601183000,
    "merchant_name": "%E6%B7%B1%E5%9C%B3%E9%BE%99%E5%B2%97%E5%8C%BA%E6%AC%A3%E7%99%BE%E4%BD%B3%E7%99%BE%E8%B4%A7%E5%95%86%E8%A1%8C",
    "result": "success",
    "remark": ""
}
```

### 支付超时
**PAY_TIMEOUT**
```json
{
    "tag": "1273",
    "token": "xxxxecf991aa19f1902a760dcb439d85_cd3e512f380e3a757171c8b282be01a6",
    "amount": "",
    "currency": "",
    "order_no": "",
    "trade_time": 1734085802167,
    "merchant_name": "",
    "charge_order_no": "",
    "real_ip": "",
    "remark": ""
}
```

### 支付失败
**PAY_FAILED**
```json
{
    "tag": "359",
    "token": "a1472263c7b97095f095cb624adccc60_ad0975be-877c-4420-8e2e-8a1xxxxx",
    "amount": "",
    "currency": "",
    "real_ip": "",
    "order_no": "",
    "trade_time": 1732601067646,
    "merchant_name": "",
    "result": "fail",
    "remark": ""
}
```

### 退款
**REFUND**
```json
{
    "tag": "1515",
    "token": "a1472263c7b97095f095cb624adccc60_ad0975be-877c-4420-8e2e-8a1xxxxx",
    "amount": "0.01",
    "currency": "CNY",
    "real_ip": "",
    "order_no": "3_20241125300002008527461251547252",
    "trade_time": 1732539755000,
    "charge_order_no": "3_2024112504200246001077424466",
    "merchant_name": "%E9%80%80%E6%AC%BE-%E6%B7%B1%E5%9C%B3%E9%BE%99%E5%B2%97%E5%8C%BA%E6%AC%A3%E7%99%BE%E4%BD%B3%E7%99%BE%E8%B4%A7%E5%95%86%E8%A1%8C",
    "remark": ""
}
```

### 用户token续期
**SESSION_RENEWAL**
```json
{
    "token": "a1472263c7b97095f095cb624adccc60_ad0975be-877c-4420-8e2e-8a1xxxxx",
    "timestamp": 1732586406526
}
```