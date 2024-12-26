---
title: 获取一次性授权码
sidebar_position: 2
---
**平台登录过程中，获取一次性授权码，用于登录Credit Pay收银台**

`POST` `https://credit-pay-dev.aatest.online/dg/v1/platform/identify/auth?plat_id=xxxxxxxxx`
<br/>

**Query Params**
| 参数名  | 类型   | 是否必须 | 描述       |
| ------- | ------ | -------- | ---------- |
| plat_id | string | 是       | 平台唯一ID |

<br/>

**Headers**  
| 参数名    | 类型   | 是否必须 | 描述                                         |
| --------- | ------ | -------- | -------------------------------------------- |
| trace     | string | 是       | 用于链路追踪，推荐传入平台自身业务的trace Id |
| api-key   | string | 是       | 平台密钥，用于鉴权                           |
| signature | string | 是       | HMAC签名，详情见[身份校验](../auth)章节      |
| lang      | string | 否       | 语言，默认为en-US                            |

<br/>

**Body**
| 参数名                                     | 类型   | 是否必须 | 描述                                                                                                                          |
| ------------------------------------------ | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| custom_no                                  | string | 是       | 用户自定义编号, 需要保持唯一                                                                                                  |
| customer_token                             | string | 是       | 平台用户Token, 需要与用户一一对应                                                                                             |
| token_expire                               | number | 是       | token过期时间，13位时间戳                                                                                                     |
| callback_url                               | string | 是       | 平台回调地址                                                                                                                  |
| client_ip                                  | string | 是       | 用户IP, 用于后续鉴权                                                                                                          |
| session_sign                               | string | 否       | session标记, 用户同一个用户多次设置授信额场景，当session_sign不变时，获取之前颁发的条码。当session_sign变化时，获取新的条码。 |
| credit_limit_tag                           | string | 否       | 唯一标识, 将根据此参数，获取`credit_limit_available_cards`列表中的对应授信额数据。                                            |
| credit_limit_available_cards               | array  | 否       | 授信额数据列表，支持多个数据对象。                                                                                            |
| credit_limit_available_cards.item.tag      | string | 是       | 授信额数据标签，与credit_limit_tag对应。                                                                                      |
| credit_limit_available_cards.item.amount   | number | 是       | 授信额度。                                                                                                                    |
| credit_limit_available_cards.item.currency | string | 是       | 授信额度币种                                                                                                                  |
| credit_limit_available_cards.item.icon     | string | 是       | 平台.ico 图标链接，将展示在收银台。                                                                                           |
| credit_limit_available_cards.item.input    | string | 是       | html对象，将展示在收银台，需要自行实现多语言。                                                                                |
:::warning
授信额相关数据字段`credit_limit_*`说明。  
1. 在传入情况下为最高优先级，后续将不再调用后台配置的授信额接口。  
2. 不传入时，需要在后台配置授信额接口供调用。
3. 当即在此接口传入了授信额相关数据，又在后台配置了授信额接口，则优先使用此接口传入的数据。
:::
<br/>

**响应**
| 参数名          | 类型   | 描述                       |
| --------------- | ------ | -------------------------- |
| code            | int    | 状态码                     |
| msg             | string | 响应消息                   |
| data            | object | 响应数据                   |
| data.ident_code | string | 颁发的一次性授权码         |
| data.url        | string | 携带一次性授权码的跳转地址 |
| trace           | string | 业务追踪id                 |

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "ident_code": "bb15a501d2354aeb937160c67b3580a6", // 一次性授权码
        "url": "https://credit-pay-dev.aatest.online/dg/oauth?ident_code=bb15a501d2354aeb937160c67b3580a6"
    },
    "trace": "xx-3f1e-40c9-b26d-aa86e7611230"
}
```
<br/>


**请求示例**   
```bash
curl -X POST \
  -H "lang: en-US" \
  -H "trace: xx-3f1e-40c9-b26d-aa86e7611230" \
  -H "api-key: kHm2nk3dgrBhn10v494XqwpPOV7gn1Uu0rUVMuxpxAowvNfXEs5UzZueUdq7vgNc" \
  -H "signature: tkqXws4SYtA7MDN3PYSKs+N8X6Y=" \
  -d '{
      "customer_token": "a1472263c7b97095f095cb624adccc60_ad0975be-877c-4420-8e2e-8a156a3ec7b2app",
      "customer_no": "473_32_86000698",
      "callback_url": "https://credit-pre.aatest.online/payment/callback",
      "token_expire": 1732521424191,
      "client_ip": "192.168.1.166",
      "session_sign": "123",
      "credit_limit_tag": "外部系统卡唯一标识",
      "credit_limit_available_cards": [
        {
          "tag": "外部系统卡唯一标识",
          "amount": "10001.23",
          "currency": "CNY",
          "icon": "https://credit-admin-pre.aatest.online/favicon.ico",
          "input": "<div style=\"font-size: 12px\">PASSTO CREDIT CARD（6268）可用额度 <b style=\"font-size: 14px\">28000.00</b>HKD</div>"
        }
      ],
    }' \
  "https://credit-pay-dev.aatest.online/dg/v1/platform/identify/auth?plat_id=328cf95950f54f89a2dd4c3bf98ac5fb"
```