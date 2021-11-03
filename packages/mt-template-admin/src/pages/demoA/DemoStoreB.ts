import { makeAutoObservable } from 'malganis/mobx';

class DemoBStore {
  namespace: string;

  constructor() {
    makeAutoObservable(this);

    this.namespace = 'DemoBStoreNameSpace';
  }
}

export default new DemoBStore();
