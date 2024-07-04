// 提供基础的request 类型和 response类型

// Response 结构
export interface BaseApiResponse<T = unknown> {
  code?: string;
  result?: T;
  message?: string;
}

export interface BasePaginationRequest<T = unknown> {
  pageNum: number;
  pageSize: number;
  params: T;
}

export interface BasePaginationRequestOutsideParams {
  pageNum: number;
  pageSize: number;
}

// 返回 分页 基类
export interface BasePaginationResponse<T = unknown> {
  current: number;
  size: number;
  total: number;
  pages: number;
  records: T[] | null;
}
