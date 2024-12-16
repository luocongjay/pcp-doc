---
title: 获取授信额度
---
:::warning
该接口需要接入的平台方提供  
credit pay将以下面方式请求该接口
:::
:::danger
1. 建议平台保留支付渠道单笔最大限额。
2. 交易过程中授信额变动之后终止本次交易流程。
:::
<br/>

### 请求该接口代码示例
```typescript

// POST 请求示例
const getCreditLimit = async(): Promise<any> => {
  try {
    const signatureKey = "your-signature-key"

    const timestamp = new Date().getTime()

    const domain = "https://your-domain.com"
    const path = "/api/v1/credit-pay/notify"
    const url = `${domain}${path}`
    const data = {
        type: 'GET_DEFAULT_ACCOUNT_CREDIT_LIMIT', // 固定事件名
        data: {
            tag: '',
            currency: currency, // 币种
            digits: digits // 小数点
        }
    }
    const dataString = JSON.stringify(data)
    const pathWithData = `${path}${dataString}`
    const signature = hmacSha1(pathWithData, signatureKey)
    const headers = {
        signature: signature,
        token: token, // 获取一次性授权码时，传入的customer_token
        trace: trace,
        lang: lang, // 获取一次性授权码时, 传入的lang
        timestamp: timestamp
    }
    const response: AxiosResponse = await axios.post(url, user);
    return response.data;
  } catch (error) {
    console.error('Error getting credit limit:', error);
    throw error;
  }
};

// 使用示例
const main = async () => {
  const creditLimitData = await getCreditLimit(newUser);
  console.log('Credit limit data:', creditLimitData);
};

main();
```