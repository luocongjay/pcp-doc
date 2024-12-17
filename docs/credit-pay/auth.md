---
title: 身份校验
sidebar_label: '身份校验'
sidebar_position: 5
---

### API Key
* **获取签名**：平台注册后，会获得一个API Key，该API Key用于身份校验，需要在请求头中携带。


### HMAC 签名
* **获取Signature key**：平台在系统注册后，在后台会自动颁发签名秘钥， 用于对请求内容进行签名。
* **拼接URL和payload**: 将请求的path与payload拼接在一起，确保两者之间没有空格。
* **生成签名**: 使用sha1算法，将拼接好的url和payload，使用Signature key进行加密，得到签名。
* **签名参数**: 将签名作为参数，添加到请求头中，发送请求。

### 代码示例
:::warning
只签名endpoint和payload，不签名完整的URL。  
以下仅为TS代码示例，实际使用中请根据你的语言和框架进行修改。
:::

```typescript
import axios from 'axios';
import { createHmac } from 'crypto';

const apiKey = 'your_api_key';
const signaturekey = 'your_secret_key';

function createSignature(path, payload) {
    const data = JSON.stringify(payload);
    const message = `${path}${data}`;
    const hmac = createHmac('sha1', signaturekey);
    hmac.update(message);
    return hmac.digest().toString('base64');
}

function requestData(url, path, payload) {
    const headers = {
        'Content-Type': 'application/json',
        'api-key': APIKey,
        'signature': createSignature(path, payload)
    };

    return axios.post(url, payload, { headers })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Example usage

const domain = 'https://api.example.com';
const endpoint = '/endpoint';
const url = `${domain}${endpoint}`;
const payload = {
    key1: 'value1',
    key2: 'value2'
};

requestData(url, endpoint, payload);
```