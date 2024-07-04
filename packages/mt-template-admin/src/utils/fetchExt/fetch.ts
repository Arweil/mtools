// 核心
// 提供请求方法，并处理response

import { message } from '@m-tools/antd-ext';
import { addURLParams } from '@m-tools/browser-utils';
import 'whatwg-fetch';
import { BaseApiResponse } from './types';

// 用来处理resposne status
async function resposneStateHandler(response: Response) {
  if (response.status === 200) {
    return Promise.resolve(response);
  }
  if (response.status === 401) {
    // 重新登录鉴权
  } else if (response.status === 403) {
    window.location.replace('/403');
  } else if (response.status === 404) {
    window.location.replace('/404');
  } else if (response.status >= 500 && response.status < 600) {
    window.location.replace('/500');
  } else {
    await message.error({
      content: `响应错误，状态码: ${response.status}`,
      duration: 9,
    });
  }

  return Promise.reject(response);
}

// 用来处理resposne body中的 code
async function responseCodeHandler<T extends BaseApiResponse>(response: T) {
  // 如果没有code 那么默认为'0'
  const code = Number(response.code || '0');

  // 10000 - 19999表示业务警告，还有后续业务逻辑操作
  if (code === 0 || code === 200 || (code > 10000 && code < 20000)) {
    return Promise.resolve(response);
  }
  if (code === 20002) {
    // 重新登录鉴权
  } else {
    await message.error(response.message, 3);
  }

  return Promise.reject(response);
}

async function parseResponseData(response: Response) {
  const contentType = response.headers.get('content-type');
  if (contentType) {
    if (contentType.includes('application/json')) {
      return response.json(); // 响应为 JSON 数据
    }
    if (contentType.includes('application/vnd.ms-excel')) {
      return response.blob(); // 响应为 Blob 数据
    }
    if (contentType.includes('text/plain')) {
      return response.text(); // 响应为文本数据
    }
    // 其他类型的响应数据处理逻辑
    // ...
    return response; // 返回原始响应对象
  }
  return Promise.reject(new Error('无法确定响应的数据类型'));
}

// 请求处理函数
function responseHandle<T extends BaseApiResponse>(response: Response) {
  return Promise.resolve(response)
    .then(res => resposneStateHandler(res))
    .then(res => parseResponseData(res))
    .then(res => responseCodeHandler<T>(res));
}

// post请求
export const post = <T extends BaseApiResponse>({
  url,
  data,
}: {
  url: string;
  data: unknown;
}): Promise<T> =>
  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => responseHandle<T>(response))
    .catch(ex => Promise.reject(ex));

// get请求
export const get = <T extends BaseApiResponse>({
  url,
  data,
}: {
  url: string;
  data?: { [key: string]: any };
}): Promise<T> => {
  const finUrl = data !== undefined ? addURLParams(url, data) : url;

  return fetch(finUrl, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => responseHandle<T>(response))
    .catch(ex => Promise.reject(ex));
};

// put请求
export const put = <T extends BaseApiResponse>({
  url,
  data,
}: {
  url: string;
  data?: unknown;
}): Promise<T> =>
  fetch(url, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => responseHandle<T>(response))
    .catch(ex => Promise.reject(ex));

// post请求
export const dele = <T extends BaseApiResponse>({
  url,
  data,
}: {
  url: string;
  data?: unknown;
}): Promise<T> =>
  fetch(url, {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => responseHandle<T>(response))
    .catch(ex => Promise.reject(ex));

// fetch请求，处理Response
export const fetchHandleResponse = <T extends BaseApiResponse>(
  url: string,
  options: RequestInit,
): Promise<T> =>
  fetch(url, {
    credentials: 'same-origin',
    ...options,
  })
    .then(response => responseHandle<T>(response))
    .catch(ex => Promise.reject(ex));
