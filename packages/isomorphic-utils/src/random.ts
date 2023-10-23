export const getRandomStr = (): string =>
  `r${new Date().getTime()}${Math.random().toString().slice(-6)}`;
