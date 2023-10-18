import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  isValidElement,
  cloneElement,
} from 'react';
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
  // 根据子组件类型判断传入的props
  const [childrenType, setChildrenType] = useState<'select' | 'picker' | ''>('');

  const calcPopupPosition = useCallback(() => {
    const formItemElement = document.querySelector(`.${formItemClassName}`);
    const childFormControlElement = document.querySelector(
      `.${formItemClassName} .${prefix}-form-item-control`,
    );
    const childSelectElement = document.querySelector(`.${formItemClassName} .${prefix}-select`);
    const childPickerElement = document.querySelector(`.${formItemClassName} .${prefix}-picker`);
    if (childSelectElement) {
      setChildrenType('select');
    }
    if (childPickerElement) {
      setChildrenType('picker');
    }
    const rect = formItemElement.getBoundingClientRect();
    const childFormControlRect = childFormControlElement.getBoundingClientRect();
    const { width } = rect;
    const offset = childFormControlRect.width - width;
    setOffsetX(offset);
    setDropdownMatchSelectWidth(width);
  }, [formItemClassName, prefix]);

  useEffect(() => {
    if (uuid) {
      calcPopupPosition();
    }
    window.addEventListener('resize', calcPopupPosition);
    return () => window.removeEventListener('resize', calcPopupPosition);
  }, [calcPopupPosition, uuid]);

  const renderChildren = () => {
    if (!isValidElement(children)) {
      return null;
    }

    let childProps = {
      ...children.props,
    };

    // 根据子组件类型判断传入的props, 防止控制台警告
    if (childrenType === 'select') {
      childProps = {
        ...childProps,
        dropdownMatchSelectWidth,
        dropdownAlign: { offset: [offsetX, 4] },
      };
    } else if (childrenType === 'picker') {
      childProps = {
        ...childProps,
        dropdownAlign: { offset: [offsetX, 4] },
      };
    }
    return cloneElement(children, childProps);
  };

  return (
    <Form.Item {...restProps} className={cls(className, formItemClassName)}>
      {renderChildren()}
    </Form.Item>
  );
}
