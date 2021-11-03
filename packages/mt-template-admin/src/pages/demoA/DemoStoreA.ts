import { makeAutoObservable } from 'malganis/mobx';

class DemoAStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default new DemoAStore();
