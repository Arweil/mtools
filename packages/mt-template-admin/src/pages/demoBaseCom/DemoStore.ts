import {
  action,
  makeAutoObservable,
  runInAction,
} from 'malganis/mobx';

export class DemoStore {
  namespace = 'DemoStore';

  initialValues: { [key: string]: any } = {};

  loading = false;

  count = 0;

  constructor() {
    makeAutoObservable(this, {
      init: action.bound,
      onAdd: action.bound,
      onReset: action.bound,
      resetStore: action.bound,
    });
  }

  get total(): number {
    return this.count;
  }

  onAdd(): void {
    this.count += 1;
  }

  onReset(): void {
    this.count = 0;
  }

  async init(): Promise<void> {
    try {
      runInAction(() => {
        this.loading = true;
      });
      // fetch from @/api
      const res = await new Promise<{ [key: string]: any }>((resolve) => {
        setTimeout(() => resolve({
          InputExt: 'InputExt',
        }), 1000);
      });
      runInAction(() => {
        this.initialValues = res;
      });
    } catch (ex) {
      console.warn(ex);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  resetStore(): void {
    this.initialValues = {};
    this.loading = false;
    this.count = 0;
  }
}

export default new DemoStore();
