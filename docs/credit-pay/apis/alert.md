---
title: 告警
---
**将告警信息上报到sentry**

`POST` `https://cashier.passto.credit/api/v1/internal/alert`
<br/>

**Body**
| 参数名  | 类型   | 是否必须 | 描述         |
| ------- | ------ | -------- | ------------ |
| message | string | 是       | 错误标题     |
| extra   | object | 是       | 具体报错内容 |

<br/>

**代码示例**
```bash
curl -X POST https://credit-pay-dev.aatest.online/dg/v1/internal/alert \
-H "Content-Type: application/json" \
-d '{
  "message": "mock error 1",
  "extra": {
    "type": "hello",
    "data": {
      "message": "mock error"
    }
  }
}'
```