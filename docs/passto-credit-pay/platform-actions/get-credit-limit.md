---
title: 获取授信额度
---
❗**此接口需要平台自行实现**

**授信额**：平台允许用户当次交易可以使用的额度。   
PassTo CreditPay将请求平台授信额度接口。    
接口返回指定格式的数据。

:::warning
1. 建议平台保留支付渠道单笔最大限额。
2. 交易过程中授信额变动之后终止本次交易流程。
:::

***

## 如何实现此接口

### 步骤 ①：创建接口
创建一个接口，设置接口路由，例如：`/api/v1/credit-pay/notify`  
<br/>

### 步骤 ②：处理请求数据
#### 接口鉴权
PassTo CreditPay请求`Headers`包含了`signature`和`token`供平台进行接口鉴权。
- `signature`: HMAC-SHA1签名，对请求`path`和`data`进行签名，签名密钥与PassTo CreditPay颁发给平台的签名密钥一致。 详情参考[身份校验](../auth)
- `token`: 返回平台请求`获取一次性授权码`接口时传入的用户token。平台可根据此token完成用户信息校验。
<br/>

请求包含以下参数：  

**Headers**  
| 参数名    | 类型   | 是否必须 | 描述                                                              |
| --------- | ------ | -------- | ----------------------------------------------------------------- |
| signature | string | 是       | HMAC签名，详情参考[身份校验](../auth)                             |
| token     | string | 是       | 平台用户token，与`获取一次性授权码`接口传入的customer_token一致。 |
| trace     | string | 是       | 业务请求唯一标识                                                  |
| lang      | string | 是       | 语言类型，与`获取一次性授权码`接口传入的`lang`一直                |
| timestamp | int    | 是       | 时间戳, 13位                                                      |
<br/>

**Body**
| 参数名   | 类型   | 是否必须 | 描述                                             |
| -------- | ------ | -------- | ------------------------------------------------ |
| type     | string | 是       | 事件名，固定为`GET_DEFAULT_ACCOUNT_CREDIT_LIMIT` |
| data     | object | 是       | 请求参数data                                     |
| tag      | string | 是       | 保留参数，方便后期拓展                           |
| currency | string | 是       | 授信额币种                                       |
| digits   | string | 是       | 授信额精度                                       |
<br/>

### 步骤 ③：实现平台业务逻辑
**如涉及到币种转换，平台需要自行实现汇率转换。**
按照业务需求，实现平台业务逻辑。按指定格式返回授信额数据。


#### 返回数据格式要求
| 参数名          | 类型   | 是否必须 | 描述                                                                                                   |
| --------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------ |
| tag             | string | 是       | 外部唯一标识, 将根据此参数，获取`inputs`列表中的对应授信额数据。                                       |
| available_cards | array  | 是       | 授信额数据列表，支持多个数据对象。                                                                     |
| tag             | string | 是       | 与外部唯一标识`tag`对应。                                                                              |
| amount          | number | 是       | 授信额度，保留与请求参数一致的精度                                                                     |
| currency        | string | 是       | 授信额度币种，保留与请求参数一致                                                                       |
| icon            | string | 是       | 平台图标，将展示在收银台                                                                               |
| inputs          | html   | 是       | html对象，将展示在收银台，需要自行实现多语言，语言需要保持与`获取一次性授信额`接口传入的`lang`参数一致 |
<br/>



### PassTo Credit Pay调用此接口示例
```typescript
import { createHmac } from "crypto";

function hmacSha1(content: string, secret: string) {
    const hmac = createHmac("sha1", secret);
    hmac.update(content);
    return hmac.digest().toString("base64");
}

function getCreditLimit() {
    const signatureKey = "your-signature-key";
    const timestamp = Date.now();

    const domain = "https://your-domain.com";
    const path = "/api/v1/credit-pay/notify"; // 需要平台方提供的，用于获取授信额的接口。url可定义。
    const data = {
        type: "GET_DEFAULT_ACCOUNT_CREDIT_LIMIT", // 固定事件名
        data: {
            tag: "", // 保留字段，供业务拓展
            currency: currency, // 币种
            digits: digits, // 小数点
        },
    };

    const signature = hmacSha1(`${path}${JSON.stringify(data)}`, signatureKey);
    const headers = {
        signature,
        token, // 获取一次性授权码时，传入的customer_token
        trace,
        lang, // 获取一次性授权码时, 传入的lang
        timestamp,
    };

    return axios.post(`${domain}${path}`, data, { headers });
}

```

### 要求返回数据格式示例
```json
{
    "data": {
        "tag": "外部系统卡唯一标识",
        "inputs": [
            {
                "tag": "外部系统卡唯一标识",
                "amount": "10001.23",
                "currency": "CNY",
                "icon": "https://credit-admin-pre.aatest.online/favicon.ico",
                "input": "<div style=\"font-size: 12px\">\nPASSTO CREDIT CARD（6268）可用额度 <b style=\"font-size: 14px\">28000.00</b>HKD\n</div>"
            }
        ]
    }
}

```
