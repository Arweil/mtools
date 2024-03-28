import { makeAutoObservable } from 'malganis/mobx';

class Store {
  namespace: string;

  $$needResetStore = false;

  constructor() {
    makeAutoObservable(this);

    this.namespace = 'SingleStoreNameSpace';
  }
}

export default new Store();
