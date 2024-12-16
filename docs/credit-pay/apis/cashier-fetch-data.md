---
title: 获取收银台数据
---
**获取收银台展示数据**

`POST` `https://cashier.passto.credit/api/v1/cashier/fetch_data`
<br/>


**Headers**  
| 参数名        | 类型   | 是否必须 | 描述                               |
| ------------- | ------ | -------- | ---------------------------------- |
| trace         | string | 是       | 用于链路追踪                       |
| authorization | string | 是       | 授权码登录后系统办颁发的open_token |


<br/>

**响应**
```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "user_id": "673341ce000da318xxx",
        "secret": "01xxxx",
        "platform_callback": "https://domain.com/payment/callback",
        "field_seat": "cvrmvCR0q",
        "local_bucket": "2d7f4de7935d4b298c8571367da4df87",
        "max_amount": "50000",
        "tag": "外部系统卡唯一标识",
        "available_cards": [
            {
                "tag": "外部系统卡唯一标识",
                "amount": "10001.23",
                "currency": "CNY",
                "icon": "https://credit-admin-pre.aatest.online/favicon.ico",
                "input": "<div style=\"font-size: 12px\">\nPASSTO CREDIT CARD（6268）可用额度 <b style=\"font-size: 14px\">28000.00</b>HKD\n</div>" // 需自行实现多语言
            }
        ]
    },
    "trace": "xx-3f1e-40c9-b26d-aa86e7611230"
}
```

<br/>

**代码示例**

```bash
curl -X POST \
  https://credit-pay-dev.aatest.online/dg/v1/cashier/fetch_data \
  -H "trace: xx-3f1e-40c9-b26d-aa86e7611230" \
  -H "authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiI2NzI4ZDgyYjAwMTBhZThhYzVlOSIsInBsYXRmb3JtSWQiOiIzMjhjZjk1OTUwZjU0Zjg5YTJkZDRjM2JmOThhYzVmYiIsInBsYXRmb3JtVXNlcklkIjoiNDczXzMyXzg2MDAwNjk4IiwidXNlcklkIjoiNjc1MmFjOTYwMDFkM2Q2YzA0ZWEiLCJzZWNyZXQiOiI0YzYzYzMiLCJpZGVudENvZGUiOiI4Yzc4ZTAyNzU3ZWY0NmM2YTRmY2RiNmFmZTI5Y2E3NyIsImlhdCI6MTczNDM0MjY3NiwiZXhwIjoxNzM0MzQ2Mjc2fQ.0dGf0t2D0s4Y0r_05Yo9hk5Qe_2Ld-g9KK6UxhKf8nI"
```