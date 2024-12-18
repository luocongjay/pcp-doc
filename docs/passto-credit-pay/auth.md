---
title: 身份校验
sidebar_label: '身份校验'
sidebar_position: 5
---
✍️ 保护双方数据交互的安全
## API Key 与 HMAC签名
1. 你需要在请求`headers`中携带`api-key`。  
2. 您可以在服务端对请求`path`和`body`进行签名并将其添加到请求`headers`中。此举动是为了防止数据被篡改，确保请求的完整性。
PassTo CreditPay将检查签名的有效性。如果签名因任何原因未通过，则请求将被拒绝。
***

### API Key
1. **获取签名**  
平台注册后，会获得一个API Key，该API Key用于身份校验，需要在请求头中携带。  
此API Key可以在PassTo CreditPay管理后台 -> **平台管理-平台列表**中获取。


### HMAC 签名
PassTo CreditPay支持HMAC签名，以增强数据传输的安全性。默认使用`HMAC-SHA1`算法。

**步骤 ①：获取signature key**  
 * 平台在系统注册后，在后台会自动颁发签名密钥，用于对请求内容进行签名。在**平台管理-平台列表**中获取。

**步骤 ②：生成签名**  
* **拼接path和body**: 将请求的path与body拼接在一起，确保两者之间没有空格。
* **生成签名**: 使用HMAC-SHA1算法，将拼接好的url和body，使用signature key进行加密，得到签名。
* **签名参数**: 将签名作为参数，添加到请求`Headers`的`signature`参数中，发送请求。

**步骤 ③：校验生成的签名是否正确（可选）**   
* 为保证您流畅的开发体验，建议您完成步骤①和②的代码逻辑之后。  
* 进行此步骤的测试参数进行校验，以保证HMAC签名逻辑的准确性。
<br/>

### **签名测试示例**:   
为验证您的签名逻辑正确，可使用下面示例参数进行签名，验证签名结果是否与示例签名结果一致。  

**signature key**:  
```text
18dd8a3c8003d2adcd13cb9981618bedd759a19f697a46d270542c6023479a08f541a5fa7f2e09a6f93cab7fe5de3b1b465abxxx
```
**path**:  
```text
/v1/platform/identify/auth
```
**body**  

body参数通常是JSON格式，这里以JSON为例。
```json
{
    "customer_token": "a1472263c7b97095f095cb62477c-4420-8e2e-8a156axxxxxx",
    "customer_no": "473_32_86000698",
    "callback_url": "https://credit-pre.aatest.online/payment/callback",
    "token_expire": 1732521424191,
    "client_ip": "192.168.1.166"
}
```

**将path和body拼接在一起**
* 注意body为JSON,需要转为字符串。
* 拼接path和body，确保两者之间没有空格。

```text
/v1/platform/identify/auth{"customer_token":"a1472263c7b97095f095cb62477c-4420-8e2e-8a156axxxxxx","customer_no":"473_32_86000698","callback_url":"https://credit-pre.aatest.online/payment/callback","token_expire":1732521424191,"client_ip":"192.168.1.166"}
```

**生成签名**  

代码示例
```typescript
function hmacSha1(content: string, secret: string) {
  const hmac = createHmac('sha1', secret)
  hmac.update(content)
  return hmac.digest().toString('base64')
}
```
签名结果
```text
qKAfzANeovNTa2dQpIlOWIibZ/U=
```
<br/>

### 如何解密
📌**当您的服务端接收到PassTo CreditPay的请求时，您可以重复签名步骤，比对接收到的请求`Headers`中的`signature`，确保请求未被篡改。**

<br/>

### 完整代码示例
:::warning
只签名path和data，不签名完整的URL。  
以下仅为TS代码示例，实际使用中请根据你的语言和框架进行修改。
:::

```typescript
import axios from "axios";
import { createHmac } from "crypto";

const apiKey = "your_api_key";
const signaturekey = "your_secret_key";

function createSignature(path, data) {
    const data = JSON.stringify(data);
    const message = `${path}${data}`;
    const hmac = createHmac("sha1", signaturekey);
    hmac.update(message);
    return hmac.digest().toString("base64");
}

function requestData(url, path, data) {
    const headers = {
        "Content-Type": "application/json",
        "api-key": APIKey,
        signature: createSignature(path, data),
    };

    return axios
        .post(url, data, { headers })
        .then((response) => {
            console.log("Response:", response.data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

const domain = "https://api.example.com";
const endpoint = "/endpoint";
const url = `${domain}${endpoint}`;
const data = {
    key1: "value1",
    key2: "value2",
};

requestData(url, endpoint, data);
```