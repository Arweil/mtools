// 核心
// 提供请求方法，并处理response

// import ifetch from 'isomorphic-fetch';
// import queryString from 'query-string';
// const ifetch = require('isomorphic-fetch');
const queryString = require('query-string');
import 'isomorphic-fetch';
import { BaseApiResponse } from './types';
import { configStore } from './config';

// 用来处理resposne status
function resposneStateHandler(response: Response) {
  if (response.ok) {
    return Promise.resolve(response);
  }

  return Promise.reject(response);
}

// 用来处理resposne body中的 code
function responseCodeHandler<T extends BaseApiResponse>(response: T) {
}

// 请求处理函数
function responseHandler<T extends BaseApiResponse>(response: Response) {
  return Promise.resolve(response)
    .then((res) => {
      return resposneStateHandler(res);
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return responseCodeHandler<T>(res);
    });
}

// export const fetch = ifetch as typeof self.fetch;

// post请求
export const post = <T extends BaseApiResponse>({ url, data }: { url: string; data?: any }) => {
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    return responseHandler<T>(response);
  }).catch((ex) => {
    return Promise.reject(ex);
  });
};

// get请求
export const get = <T extends BaseApiResponse>({
  url,
  data,
  config,
}: {
  url: string;
  data?: { [key: string]: number | string };
  config?: RequestInit;
}) => {
  // 获取location.search
  const locationSearch = data && queryString.stringify(data);
  // 创建get请求的url
  const finUrl = locationSearch ? `${url}?${locationSearch}` : url;
  let finFetch: Promise<Response> | null = null;
  const { method, headers: configHeaders, ...restProps } = config || {};

  // 如果定义了默认的请求选项
  if (configStore.has('requestOptions')) {
    // merge request 配置
    const reqInit: RequestInit = {
      credentials: 'same-origin',
      ...configStore.get('requestOptions') as RequestInit,
      ...restProps,
      method: 'GET',
    };

    // 创建Headers对象
    const headers = new Headers({
      ...reqInit.headers,
      ...configHeaders
    });

    // 这是请求头
    reqInit.headers = headers;

    // 创建Request对象
    const req = new Request(
      configStore.has('baseUrl') ? `${configStore.get('baseUrl') as string}/${finUrl}` : finUrl,
      reqInit,
    );

    // 发起请求
    finFetch = fetch(req);
  } else {
    finFetch = fetch(finUrl, config);
  }

  return finFetch.then((response) => {
    return responseHandler<T>(response);
  }).catch((ex) => {
    return Promise.reject(ex);
  });
};

// fetch请求，处理Response
export const fetchHandleResponse = <T extends BaseApiResponse>(url: string, options: RequestInit) => {
  return fetch(url, {
    credentials: 'same-origin',
    ...options
  }).then((response) => {
    return responseHandler<T>(response);
  }).catch((ex) => {
    return Promise.reject(ex);
  });
};

export default {
  get,
  post,
  fetchHandleResponse,
  fetch,
}
