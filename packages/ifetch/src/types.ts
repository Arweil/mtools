// 提供基础的request 类型和 response类型

// Response 结构
export interface BaseApiResponse<T = any> {
  code?: string;
  result?: T;
  message?: string;
}

export interface BasePaginationRequest<T = any> {
  currentPage: number;
  pageSize: number;
  params: T;
};

export interface BasePaginationRequestOutsideParams {
  currentPage: number;
  pageSize: number;
}

// 返回 分页 基类
export interface BasePaginationResponse<T = any> {
  currentPage: number;
  pageSize: number;
  totalItem: number;
  totalPage: number;
  resultList: T[] | null;
}

export interface IFetchConfigOptions {
  baseUrl?: string;
  requestOptions?: RequestInit;
}
