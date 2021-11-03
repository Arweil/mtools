export function setStateAsync<K extends keyof S, S>(
  $this: React.Component<{}, S> | React.PureComponent<{}, S>,
  params: Pick<S, K>
) {
  return new Promise((resolve) => {
    $this.setState(params, resolve);
  });
}

// 获取一个随机id
export const getRandomId = () => {
  return `${new Date().getTime()}${Math.random().toString().slice(-6)}`;
};

export function getLayoutElement(formClassName: string): HTMLElement {
  formClassName = formClassName.replace(/(^\s*)|(\s*$)/g, '');
  const arrformQueryClass = formClassName.split(' ').map((item) => {
    return `.${item}`;
  });

  // 如果只有默认的className那么默认返回
  if (arrformQueryClass.length === 1 && arrformQueryClass.includes('antd-ext-form')) {
    return document.body;
  } else {
    return document.querySelector(arrformQueryClass.join('')) || document.body;
  }
}
