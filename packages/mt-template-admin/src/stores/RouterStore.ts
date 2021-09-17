import { makeAutoObservable } from "mobx";
import { Location } from 'history';

const { search, pathname, hash } = window.location;
const defaultLocation: Location = {
  pathname,
  search,
  state: undefined,
  hash,
}

export class RouterStore {
  prevLocation: Location = defaultLocation;
  currentLocation: Location = defaultLocation;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 路由变更触发
   * @param prevLocation
   * @param currentLocation
   */
  onLocationChange(prevLocation: Location, currentLocation: Location) {
    this.prevLocation = prevLocation;
    this.currentLocation = currentLocation;
  }
}

export default new RouterStore();
