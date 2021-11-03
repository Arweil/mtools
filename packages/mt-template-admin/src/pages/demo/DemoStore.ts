import {
  action,
  makeObservable,
  observable,
  runInAction,
} from 'malganis/mobx';

export class DemoStore {
  initialValues: { [key: string]: any };

  loading: boolean;

  constructor() {
    makeObservable(this, {
      initialValues: observable,
      loading: observable,
      init: action.bound,
    });

    this.initialValues = {};
    this.loading = false;
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
}

export default new DemoStore();
