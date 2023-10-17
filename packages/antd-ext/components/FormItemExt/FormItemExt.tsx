import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ConfigProvider, Form } from 'antd'; // 修改Button为想要导入的组件
import type { FormItemProps } from 'antd';
import cls from 'classnames';
import useId from '../utils/useId';

export type FormItemExtProps = FormItemProps;

export default function FormItemExt(props: FormItemExtProps) {
  const { children, className, ...restProps } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefix = useMemo(getPrefixCls, [getPrefixCls]);
  const uuid = useId();
  const formItemClassName = `form_item_${uuid}`;
  const [dropdownMatchSelectWidth, setDropdownMatchSelectWidth] = useState<boolean | number>(true);
  const [offsetX, setOffsetX] = useState(0);
  // TODO 根据子组件类型判断传入的props
  // const [isInput, setIsInput] = useState(false);

  const calcPopupPosition = useCallback(() => {
    const formItemElement = document.querySelector(`.${formItemClassName}`);
    const childFormControlElement = document.querySelector(
      `.${formItemClassName} .${prefix}-form-item-control`,
    );
    const rect = formItemElement.getBoundingClientRect();
    const childFormControlRect = childFormControlElement.getBoundingClientRect();
    const { width } = rect;
    const offset = childFormControlRect.width - width;
    setOffsetX(offset);
    setDropdownMatchSelectWidth(width);
  }, [uuid]);

  useEffect(() => {
    if (uuid) {
      calcPopupPosition();
    }
    window.addEventListener('resize', calcPopupPosition);
    return () => window.removeEventListener('resize', calcPopupPosition);
  }, [uuid]);

  const renderChildren = () => {
    if (!React.isValidElement(children)) {
      return null;
    }
    // 这里我们通常还会判断 child 的类型来确定是不是要传递相应的数据，这里我就不做了
    const childProps = {
      ...children.props,
      dropdownMatchSelectWidth,
      dropdownAlign: { offset: [offsetX, 4] },
    };
    return React.cloneElement(children, childProps);
  };

  return (
    <Form.Item {...restProps} className={cls(className, formItemClassName)}>
      {renderChildren()}
    </Form.Item>
  );
}
