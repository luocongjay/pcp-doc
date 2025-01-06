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

### 请求支付
**PAY_START**
```json

```

### 分配成功
**ASSIGN_SUCCESS**
```json
{
    "tag": "1647",
    "token": "46b5e4fa6b860f671f7717f650dabdce_a4faffd33159d0dd0e1dd2d4e36af440",
    "session_sign": "581f3a3b9eb9cf983c51b928d569126a_7597a082-e5b5-4adc-89b7-6dc5533f82c6",
    "real_ip": "47.242.92.158"
}
```

### 分配失败
**ASSIGN_FAILED**
```json
{
    "tag": "1273",
    "token": "6e30ecf991aa19f1902a760dcb439d85_a6c32249d2f64a30bba0d1449deb4da0",
    "session_sign": "a86dd3d16ae4127db6e551eb99bb9924_a6fdca2c-e4ec-4b96-ac51-d3368af17f22",
    "real_ip": "103.122.95.170"
}
```

### 获取支持条码成功
**GET_BARCODE_SUCCESS**
```json
{
    "tag": "1647",
    "token": "46b5e4fa6b860f671f7717f650dabdce_a4faffd33159d0dd0e1dd2d4e36af440",
    "session_sign": "581f3a3b9eb9cf983c51b928d569126a_7597a082-e5b5-4adc-89b7-6dc5533f82c6",
    "real_ip": "47.242.92.158"
}
```

### 获取支持条码失败
**GET_BARCODE_FAILED**
```json
{
    "tag": "1540",
    "token": "67e2507583e39f414ea1bfe4265262a5_673e9873ce3c53ebd1794e42118607a3",
    "session_sign": "5c2b37a4364bec1da13d2bbd71235c19_43251f4a-2ef8-4291-800b-92f7f0d08337",
    "real_ip": "89.208.252.167"
}
```

### 支付成功
**PAY_SUCCESS**
```json
{
    "tag": "1553",
    "token": "b23703391a8fce673a748006cfe23e97_963f616f7f55283ed60d1d8f172a8356",
    "amount": "1",
    "currency": "CNY",
    "orderNo": "3_2024120704200246001080548276",
    "tradeTime": 1733552119000,
    "merchantName": "%E6%B7%B1%E5%9C%B3%E9%BE%99%E5%B2%97%E5%8C%BA%E6%AC%A3%E7%99%BE%E4%BD%B3%E7%99%BE%E8%B4%A7%E5%95%86%E8%A1%8C",
    "chargeOrderNo": "",
    "realIp": "",
    "remark": ""
}
```

### 退款
**REFUND**
```json
{
    "tag": "1553",
    "token": "b23703391a8fce673a748006cfe23e97_963f616f7f55283ed60d1d8f172a8356",
    "amount": "1",
    "currency": "CNY",
    "orderNo": "4_2024120704200246001080482707_20241207300002005727461205742177",
    "tradeTime": 1733551241000,
    "merchantName": "%E9%80%80%E6%AC%BE-%E6%B7%B1%E5%9C%B3%E9%BE%99%E5%B2%97%E5%8C%BA%E6%AC%A3%E7%99%BE%E4%BD%B3%E7%99%BE%E8%B4%A7%E5%95%86%E8%A1%8C",
    "chargeOrderNo": "4_2024120704200246001080482707",
    "realIp": "",
    "remark": ""
}
```

### 支付结束（未付款）
**PAY_TIMEOUT**
```json
{
    "tag": "1647",
    "token": "46b5e4fa6b860f671f7717f650dabdce_a4faffd33159d0dd0e1dd2d4e36af440",
    "session_sign": "581f3a3b9eb9cf983c51b928d569126a_7597a082-e5b5-4adc-89b7-6dc5533f82c6",
    "real_ip": "47.242.92.158"
}
```

### 支付结束（已付款）
**REFUND**
```json

```

### token续期 
**SESSION_RENEWAL**
```json
{
    "token": "3b61007694319ab6e720994870e65509_8ea7636f-a817-4af0-8f27-158b573d0874app",
    "timestamp": 1732782061830
}
```