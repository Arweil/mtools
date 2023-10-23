import { getLastPromise } from '../src/promiseExt';

interface IPromiseResult<T> {
  code?: string;
  message?: string;
  result?: T;
}

function sleep(sleepTime) {
  const start = new Date().getTime();
  while (new Date().getTime() - start <= sleepTime) {}
}

describe('promiseExt', () => {
  test('getLastPromise', () => {
    async function fetchAPI(sleepTime: number) {
      const res = await new Promise<IPromiseResult<number>>((resolve, reject) => {
        sleep(sleepTime);
        resolve({
          result: sleepTime,
        });
      });

      return res;
    }

    const request = getLastPromise<IPromiseResult<number>>();
    const resA = request(async () => await fetchAPI(1000));
    const resB = request(async () => await fetchAPI(0));

    expect(resA).resolves.toEqual('cancel');
    expect(resB).resolves.toEqual({ result: 0 });
  });
});
