import Mock from 'mockjs';

export interface ResponseData<T> {
  result?: T;
}

export interface IDataSource {
  id: number;
  name?: string;
  age?: number;
  address?: string;
  needOP?: boolean;
}

export interface Pager<T> {
  current: number;
  total: number;
  size: number;
  records: T;
}

/**
 * 模拟接口，一次性获取全量数据
 */
export async function getFullData(max = 50) {
  return await new Promise<ResponseData<IDataSource[]>>(resolve => {
    setTimeout(() => {
      const data = Mock.mock({
        [`result|1-${max}`]: [
          {
            'id|+1': 1,
            name: '@cname',
            'age|20-50': 0,
            'address|1-60': '@cword',
            'needOP|1': true,
          },
        ],
      });
      resolve(data);
    }, 1000);
  });
}

/**
 * 模拟接口返回空数组
 */
export async function getEmptyData() {
  return await new Promise<ResponseData<IDataSource[]>>(resolve => {
    setTimeout(() => {
      resolve({ result: undefined });
    }, 1000);
  });
}

/**
 * 模拟接口返回分页数据
 */
export const pager = (() => {
  let total = 0;

  return {
    init: (max = 50) => {
      total = Mock.Random.integer(0, max);
    },
    getDataFromPager: async (data: { pageNum: number; pageSize: number }) => {
      const { pageNum, pageSize } = data;
      const curDataNum =
        total / pageSize < pageNum ? total % pageSize : total < pageSize ? total : pageSize;
      return await new Promise<ResponseData<Pager<IDataSource[]>>>(resolve => {
        setTimeout(() => {
          let records = Mock.mock({
            [`records|${curDataNum}`]: [
              {
                'id|+1': pageNum * pageSize,
                name: '@cname',
                'age|20-50': 0,
                'address|1-60': '@cword',
                'needOP|1': true,
              },
            ],
          });
          if (curDataNum === 1) {
            records = { records: [records.records] };
          }
          resolve({
            result: Mock.mock({
              current: pageNum,
              total,
              size: pageSize,
              ...records,
            }),
          });
        }, 1000);
      });
    },
  };
})();
