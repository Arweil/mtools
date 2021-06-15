import { IFetchConfigOptions } from "./types";

export const configStore = new Map<string, string | RequestInit | Function | undefined>();

export function config(options: IFetchConfigOptions) {
  const { baseUrl, requestOptions } = options;

  configStore.set('baseUrl', baseUrl);
  configStore.set('requestOptions', requestOptions);
}
