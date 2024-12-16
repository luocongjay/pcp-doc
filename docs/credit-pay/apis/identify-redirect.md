---
title: 一次性授权码登录
---
**使用一次性授权码登录**

`POST` `https://cashier.passto.credit/api/v1/identify/redirect`
<br/>


**Headers**  
| 参数名    | 类型   | 是否必须 | 描述                                         |
| --------- | ------ | -------- | -------------------------------------------- |
| trace     | string | 是       | 用于链路追踪，推荐传入平台自身业务的trace Id |


<br/>

**Body**
| 参数名         | 类型   | 是否必须 | 描述                              |
| -------------- | ------ | -------- | --------------------------------- |
| ident_code      | string | 是       | 一次性授权码     |

<br/>

**响应**
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

**代码示例**
```TypeScript
import axios from 'axios';

// 定义请求配置
const config = {
  method: 'post',
  url: 'https://credit-pay-dev.aatest.online/dg/v1/identify/redirect',
  headers: {
    trace: 'xx-3f1e-40c9-b26d-aa86e7611230', // 业务追踪IP
    'Content-Type': 'application/json'
  },
  data: {
    ident_code: '4f255f79bdf9443d817dac5e64d51fab'
  }
};

// 发送请求
axios(config)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```