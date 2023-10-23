export function setStateAsync<K extends keyof S, S>(
  // eslint-disable-next-line @typescript-eslint/ban-types
  $this: React.Component<{}, S> | React.PureComponent<{}, S>,
  params: Pick<S, K>,
): Promise<void> {
  return new Promise(resolve => {
    $this.setState(params, resolve);
  });
}

// 获取一个随机id
export const getRandomId = (): string =>
  `${new Date().getTime()}${Math.random().toString().slice(-6)}`;

export function getLayoutElement(formClassName: string): HTMLElement {
  const arrformQueryClass = formClassName
    .replace(/(^\s*)|(\s*$)/g, '')
    .split(' ')
    .map(item => `.${item}`);

  // 如果只有默认的className那么默认返回
  if (arrformQueryClass.length === 1 && arrformQueryClass.includes('antd-ext-form')) {
    return document.body;
  }

  return document.querySelector(arrformQueryClass.join('')) || document.body;
}
