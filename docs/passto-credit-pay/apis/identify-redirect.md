---
title: 一次性授权码登录
sidebar_position: 3
---
**使用一次性授权码登录Credit Pay收银台，并获取系统的业务token。**

`POST` `https://credit-pay-dev.aatest.online/dg/v1/identify/redirect`
<br/>


**Headers**  
| 参数名 | 类型   | 是否必须 | 描述                                         |
| ------ | ------ | -------- | -------------------------------------------- |
| trace  | string | 是       | 用于链路追踪，推荐传入平台自身业务的trace Id |


<br/>

**Body**
| 参数名     | 类型   | 是否必须 | 描述         |
| ---------- | ------ | -------- | ------------ |
| ident_code | string | 是       | 一次性授权码 |

<br/>

**响应**
| 参数名     | 类型   | 描述                          |
| ---------- | ------ | ----------------------------- |
| code       | int    | 状态码                        |
| msg        | string | 响应消息                      |
| data       | object | 响应数据                      |
| data.open_token | string | PassTo CreditPay系统业务token |
| trace      | string | 业务追踪id                    |

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "open_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiI2NzI4ZDgyYjAwMTBhZThhYzVlOSIsInBsYXRmb3JtSWQiOiIzMjhjZjk1OTUwZjU0Zjg5YTJkZDRjM2JmOThhYzVmYiIsInBsYXRmb3JtVXNlcklkIjoiNDczXzMyXzg2MDAwNjk4IiwidXNlcklkIjoiNjczYjEyYTcwMDJiYTk3ZjY0MTYiLCJzZWNyZXQiOiIzMWM5MjIiLCJpZGVudENvZGUiOiJiYjE1YTUwMWQyMzU0YWViOTM3MTYwYzY3YjM1ODBhNiIsImlhdCI6MTczMjUzNDUxNSwiZXhwIjoxNzMyNTM4MTE1fQ.VjKQ37Ea3kxPGpoQ9dIuArGPo5ENrDilQuAP6p0Ixxx"
    },
    "trace": "xx-3f1e-40c9-b26d-aa86e7611230"
}
```

<br/>

**请求示例**
```bash
curl -X POST https://credit-pay-dev.aatest.online/dg/v1/identify/redirect \
-H "trace: xx-3f1e-40c9-b26d-aa86e7611230" \
-H "Content-Type: application/json" \
-d '{"ident_code": "8c78e02757ef46c6a4fcdb6afe29ca77"}'
```