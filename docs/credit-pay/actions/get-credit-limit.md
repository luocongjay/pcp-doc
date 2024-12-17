---
title: 获取授信额度
---
**平台需要提供此接口，提供给Credit Pay收银台调用以获取授信额度。**

:::danger
1. 建议平台保留支付渠道单笔最大限额。
2. 交易过程中授信额变动之后终止本次交易流程。
:::
<br/>

### Credit Pay以下面的形式调用接口获取授信额度
```typescript
function getCreditLimit(): Promise<any> {
  const signatureKey = "your-signature-key";
  const timestamp = Date.now();

  const domain = "https://your-domain.com";
  const path = "/api/v1/credit-pay/notify"; // 可自定义
  const data = {
    type: 'GET_DEFAULT_ACCOUNT_CREDIT_LIMIT', // 固定事件名
    data: {
      tag: '', // 保留字段，供业务拓展
      currency: currency, // 币种
      digits: digits // 小数点
    } 
  };
  
  const signature = hmacSha1(`${path}${JSON.stringify(data)}`, signatureKey);
  const headers = {
    signature,
    token,  // 获取一次性授权码时，传入的customer_token
    trace,
    lang, // 获取一次性授权码时, 传入的lang
    timestamp
  };

  return axios.post(`${domain}${path}`, user, { headers })
    .then(response => response.data);
}

// Usage example
async function main() {
  const creditLimitData = await getCreditLimit();
  console.log('Credit limit data:', creditLimitData);
}

main();
```

### 要求返回数据格式
```json
{
  "tag": "外部系统卡唯一标识", // 外部系统卡唯一标识
  "inputs" [
    {
      "tag": "外部系统卡唯一标识",
      "amount": "10001.23", // 金额，保留请求的精度
      "currency": "CNY", // 币种
      "icon": "https://credit-admin-pre.aatest.online/favicon.ico",  // 收银台展示的logo
      "input": "<div style=\"font-size: 12px\">\nPASSTO CREDIT CARD（6268）可用额度 <b style=\"font-size: 14px\">28000.00</b>HKD\n</div>" // 收银台展示的信息，需自行实现多语言
    }
  ]
}
```
