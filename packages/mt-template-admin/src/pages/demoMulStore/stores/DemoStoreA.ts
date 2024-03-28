import { makeAutoObservable } from 'malganis/mobx';

class DemoAStore {
  namespace: string;

  $$needResetStore = false;

  constructor() {
    makeAutoObservable(this);

    this.namespace = 'DemoAStoreNameSpace';
  }
}

export default new DemoAStore();
