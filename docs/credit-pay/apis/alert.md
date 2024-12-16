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
```TypeScript
import axios from 'axios';

// 定义请求参数
const data = {
    message: 'mock error 1',
    extra: {
      type: 'hello',
      data: {
        message: 'mock error'
      }
    }
  }；

// 发送 POST 请求
axios.post('https://credit-pay-dev.aatest.online/dg/v1/internal/alert', data, {
  headers: {},
})
  .then(response => {
    // 处理响应数据
    console.log.data);
  })
  .catch(error => {
    // 处理错误
    console.error(error);
  });
```