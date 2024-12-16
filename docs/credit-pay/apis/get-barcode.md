---
title: 获取二维码
---
**请求付款二维码**

`POST` `https://cashier.passto.credit/api/v1/cashier/get_barcode/get_barcode`
<br/>

**Body**
| 参数名       | 类型   | 是否必须 | 描述   |
| ------------ | ------ | -------- | ------ |
| local_bucket | string | 是       | 令牌   |
| user_id      | string | 是       | 用户ID |

**响应**
```json
{
    "code": "string",
    "msg": "string",
    "data": {
        "db_id": "string",
        "collection_id": "string",
        "ask_wait": "string",
        "status": "string",
        "data": {
            "kfdajfkjjf ": "string"
        }
    }
}
```
<br/>

**代码示例**
```TypeScript
import axios from 'axios';

// 定义请求参数
const data = {
  local_bucket: 'your-local-bucket-value',
  user_id: 'your-user-id-value',
};

// 发送 POST 请求
axios.post('https://credit-pay-dev.aatest.online/dg/v1/cashier/get_barcode/get_barcode', data, {
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response {
    // 处理响应数据
    console.log(response.data);
  })
  .catch(error => {
    // 处理错误
    console.error(error);
  })
```
