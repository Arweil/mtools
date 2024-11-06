import type { FormItemProps } from 'antd';
import { ConfigProvider, Form } from 'antd'; // 修改Button为想要导入的组件
import cls from 'classnames';
import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { css } from '../utils/emotion';
import useId from '../utils/useId';

export type FormItemExtProps = FormItemProps;
type ChildNodeTypes =
  | 'select'
  | 'picker'
  | 'cascader'
  | 'switch'
  | 'radio'
  | 'checkbox'
  | 'input'
  | '';

const childElementTypes: ChildNodeTypes[] = [
  'cascader',
  'select',
  'picker',
  'switch',
  'radio',
  'checkbox',
  'input',
]; // cascader必须放在select前面判断，否则会被select覆盖
export default function FormItemExt(props: FormItemExtProps) {
  const { children, className, ...restProps } = props;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefix = useMemo(getPrefixCls, [getPrefixCls]);
  const uuid = useId();
  const formItemClassName = `form_item_${uuid}`;
  const [dropdownMatchSelectWidth, setDropdownMatchSelectWidth] = useState<boolean | number>(true);
  const [offsetX, setOffsetX] = useState(0);

  // 根据子组件类型判断传入的props
  const [childrenType, setChildrenType] = useState<ChildNodeTypes>('');

  const calcPopupPosition = useCallback(() => {
    const formItemElement = document.querySelector(`.${formItemClassName}`);
    if (!formItemElement) {
      return;
    }
    const childFormControlElement = document.querySelector(
      `.${formItemClassName} .${prefix}-form-item-control`,
    );

    const rect = formItemElement.getBoundingClientRect();
    const childFormControlRect = childFormControlElement.getBoundingClientRect();
    const { width } = rect;
    const offset = childFormControlRect.width - width;
    setOffsetX(offset);
    setDropdownMatchSelectWidth(width);
  }, [formItemClassName, prefix]);

  const getChildrenType = useCallback(() => {
    for (const childElementType of childElementTypes) {
      const childElement = document.querySelector(
        `.${formItemClassName} .${prefix}-${childElementType}`,
      );
      if (childElement) {
        setChildrenType(childElementType);
        break;
      }
    }
  }, [formItemClassName, prefix]);

  useEffect(() => {
    if (uuid) {
      calcPopupPosition();
      getChildrenType();
    }
    window.addEventListener('resize', calcPopupPosition);
    return () => window.removeEventListener('resize', calcPopupPosition);
  }, [calcPopupPosition, getChildrenType, uuid]);

  const pickerCss = useMemo(
    () => css`
      .${prefix}-picker-range-arrow {
        margin-left: ${offsetX * -1}px;
      }
    `,
    [offsetX, prefix],
  );
  const renderChildren = () => {
    if (!isValidElement(children)) {
      return null;
    }

    let childProps = {
      ...children.props,
      bordered: false,
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
        popupClassName: pickerCss,
      };
    } else if (childrenType === 'cascader') {
      childProps = {
        ...childProps,
        dropdownMatchSelectWidth: childProps.dropdownMatchSelectWidth ?? false,
        dropdownAlign: { offset: [offsetX, 4] },
      };
    } else if (childrenType === 'input') {
      childProps = {
        ...childProps,
      };
    } else if (
      childrenType === 'switch' ||
      childrenType === 'checkbox' ||
      childrenType === 'radio'
    ) {
      childProps.bordered = undefined;
    }
    return cloneElement(children, childProps);
  };

  const formItemCss = useMemo(
    () => css`
      .${prefix}-form-item-explain {
        margin-left: ${offsetX}px;
      }
    `,
    [offsetX],
  );

  return (
    <Form.Item {...restProps} className={cls(className, formItemClassName, formItemCss)}>
      {renderChildren()}
    </Form.Item>
  );
}
