import {
  BaseApiResponse,
  BasePaginationRequest,
  BasePaginationRequestOutsideParams,
  BasePaginationResponse,
  dele,
  get,
  post,
  put,
} from '@/utils/fetchExt';

// 使用JAVA的Request DTO文件 直接转换为 interface
// 保证interface复用性
export interface JavaRequestDTO {
  a: string;
  b: number;
}

// 使用JAVA的Response DTO文件 直接转换为 interface
// 保证interface复用性
export interface JavaResponseDTO {
  a: string;
  b: number;
}

// 公共路径用于请求转发
const commonUrl = '/api/examples';

// get请求示例
export async function javaApiGet(
  data: Partial<JavaRequestDTO>,
): Promise<BaseApiResponse<Partial<JavaResponseDTO>>> {
  const res = await get<BaseApiResponse<Partial<JavaResponseDTO>>>({
    url: `${commonUrl}/path/of/java/api`,
    data,
  });

  return res;
}

// post请求示例
export async function javaApiPost(
  data: Partial<JavaRequestDTO>,
): Promise<BaseApiResponse<Partial<JavaResponseDTO>>> {
  const res = await post<BaseApiResponse<Partial<JavaResponseDTO>>>({
    url: `${commonUrl}/path/of/java/api`,
    data,
  });

  return res;
}

// put请求示例
export async function javaApiPut(
  data: Partial<JavaRequestDTO>,
): Promise<BaseApiResponse<Partial<JavaResponseDTO>>> {
  const res = await put<BaseApiResponse<Partial<JavaResponseDTO>>>({
    url: `${commonUrl}/path/of/java/api`,
    data,
  });

  return res;
}

// delete请求示例
export async function javaApiDele(
  data: Partial<JavaRequestDTO>,
): Promise<BaseApiResponse<Partial<JavaResponseDTO>>> {
  const res = await dele<BaseApiResponse<Partial<JavaResponseDTO>>>({
    url: `${commonUrl}/path/of/java/api`,
    data,
  });

  return res;
}

// 分页请求 分页数据同级
export async function javaApiPagerPost1(
  data: Partial<JavaRequestDTO> & BasePaginationRequestOutsideParams,
): Promise<BaseApiResponse<BasePaginationResponse<Partial<JavaResponseDTO>[]>>> {
  const res = await post<BaseApiResponse<BasePaginationResponse<Partial<JavaResponseDTO>[]>>>({
    url: `${commonUrl}/path/of/java/api`,
    data,
  });

  return res;
}

// 分页请求 分页数据在params中
export async function javaApiPagerPost2(
  data: BasePaginationRequest<Partial<JavaRequestDTO>>,
): Promise<BaseApiResponse<BasePaginationResponse<Partial<JavaResponseDTO>[]>>> {
  const res = await post<BaseApiResponse<BasePaginationResponse<Partial<JavaResponseDTO>[]>>>({
    url: `${commonUrl}/path/of/java/api`,
    data,
  });

  return res;
}

// 调用
async function init() {
  const a = await javaApiGet({ a: '1', b: 2 });

  const b = await javaApiPost({ a: '1', b: 2 });

  const c = await javaApiPut({ a: '1', b: 2 });

  const d = await javaApiDele({ a: '1', b: 2 });

  const e = await javaApiPagerPost1({
    pageNum: 1,
    pageSize: 10,
    a: '1',
    b: 2,
  });

  const f = javaApiPagerPost2({
    pageNum: 1,
    pageSize: 10,
    params: {
      a: '1',
      b: 2,
    },
  });
}
