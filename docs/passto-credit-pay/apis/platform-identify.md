---
title: 获取一次性授权码
sidebar_position: 1
---
**平台登录过程中，获取一次性授权码，用于登录Creit Pay收银台**

`POST` `https://credit-pay-dev.aatest.online/dg/v1/platform/identify/auth`
<br/>

**Query Params**
| 参数名 | 类型   | 是否必须 | 描述       |
| ------ | ------ | -------- | ---------- |
| platId | string | 是       | 平台唯一ID |

<br/>

**Headers**  
| 参数名    | 类型   | 是否必须 | 描述                                         |
| --------- | ------ | -------- | -------------------------------------------- |
| trace     | string | 是       | 用于链路追踪，推荐传入平台自身业务的trace Id |
| api-key   | string | 是       | 平台密钥，用于鉴权                           |
| signature | string | 是       | HMAC签名，详情见身份校验章节                 |
| lang      | string | 否       | 语言，默认为en-US                            |

<br/>

**Body**
| 参数名         | 类型   | 是否必须 | 描述                              |
| -------------- | ------ | -------- | --------------------------------- |
| custom_no      | string | 是       | 用户自定义编号, 需要保持唯一      |
| customer_token | string | 是       | 平台用户Token, 需要与用户一一对应 |
| token_expire   | number | 是       | token过期时间，13位时间戳         |
| callback_url   | string | 是       | 平台回调地址                      |
| client_ip      | string | 是       | 用户IP, 用于后续鉴权              |

<br/>

**响应**
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
  -H "x-real-ip: 192.168.1.66" \
  -d '{"customer_token":"a1472263c7b9709xxxb624adccc60_ad0975be-877c-4420-8e2e-8a156a3ec7b2app","customer_no":"473_32_86000698","callback_url":"https://credit-pre.aatest.online/payment/callback","token_expire":1732521424191,"client_ip":"192.168.1.166"}' \
  "https://credit-pay-dev.aatest.online/dg/v1/platform/identify/auth?platId=328cf95950f54f89a2dd4c3bf98ac5fb"
```
