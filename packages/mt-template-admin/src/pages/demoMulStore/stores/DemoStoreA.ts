import { makeAutoObservable } from 'malganis/mobx';

class DemoAStore {
  namespace: string;

  constructor() {
    makeAutoObservable(this);

    this.namespace = 'DemoAStoreNameSpace';
  }
}

export default new DemoAStore();
