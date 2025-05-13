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

const api = {
  path: {
    of: {
      java: {
        // get请求示例
        javaApiGet: async function javaApiGet(
          data: Partial<JavaRequestDTO>,
        ): Promise<BaseApiResponse<Partial<JavaResponseDTO>>> {
          const res = await get<BaseApiResponse<Partial<JavaResponseDTO>>>({
            url: `${commonUrl}/path/of/java/javaApiGet`,
            data,
          });

          return res;
        },
        // post请求示例
        javaApiPost: async function javaApiPost(
          data: Partial<JavaRequestDTO>,
        ): Promise<BaseApiResponse<Partial<JavaResponseDTO>>> {
          const res = await post<BaseApiResponse<Partial<JavaResponseDTO>>>({
            url: `${commonUrl}/path/of/java/javaApiPost`,
            data,
          });

          return res;
        },
        // put请求示例
        javaApiPut: async function javaApiPut(
          data: Partial<JavaRequestDTO>,
        ): Promise<BaseApiResponse<Partial<JavaResponseDTO>>> {
          const res = await put<BaseApiResponse<Partial<JavaResponseDTO>>>({
            url: `${commonUrl}/path/of/java/javaApiPut`,
            data,
          });

          return res;
        },
        // delete请求示例
        javaApiDele: async function javaApiDele(
          data: Partial<JavaRequestDTO>,
        ): Promise<BaseApiResponse<Partial<JavaResponseDTO>>> {
          const res = await dele<BaseApiResponse<Partial<JavaResponseDTO>>>({
            url: `${commonUrl}/path/of/java/javaApiDele`,
            data,
          });

          return res;
        },
        // 分页请求 分页数据同级
        javaApiPagerPost1: async function javaApiPagerPost1(
          data: Partial<JavaRequestDTO> & BasePaginationRequestOutsideParams,
        ): Promise<BaseApiResponse<BasePaginationResponse<Partial<JavaResponseDTO>>>> {
          const res = await post<BaseApiResponse<BasePaginationResponse<Partial<JavaResponseDTO>>>>(
            {
              url: `${commonUrl}/path/of/java/javaApiPagerPost1`,
              data,
            },
          );

          return res;
        },
        // 分页请求 分页数据在params中
        javaApiPagerPost2: async function javaApiPagerPost2(
          data: BasePaginationRequest<Partial<JavaRequestDTO>>,
        ): Promise<BaseApiResponse<BasePaginationResponse<Partial<JavaResponseDTO>>>> {
          const res = await post<BaseApiResponse<BasePaginationResponse<Partial<JavaResponseDTO>>>>(
            {
              url: `${commonUrl}/path/of/java/javaApiPagerPost2`,
              data,
            },
          );

          return res;
        },
      },
    },
  },
};

export default api;

// 调用
async function init() {
  const a = await api.path.of.java.javaApiGet({ a: '1', b: 2 });

  const b = await api.path.of.java.javaApiPost({ a: '1', b: 2 });

  const c = await api.path.of.java.javaApiPut({ a: '1', b: 2 });

  const d = await api.path.of.java.javaApiDele({ a: '1', b: 2 });

  const e = await api.path.of.java.javaApiPagerPost1({
    pageNum: 1,
    pageSize: 10,
    a: '1',
    b: 2,
  });

  const f = api.path.of.java.javaApiPagerPost2({
    pageNum: 1,
    pageSize: 10,
    params: {
      a: '1',
      b: 2,
    },
  });
}
