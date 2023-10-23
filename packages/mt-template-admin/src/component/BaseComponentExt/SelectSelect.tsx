/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import { Input } from 'antd';
import { SelectValue, OptionProps } from 'antd/lib/select';
import SelectExt, { SelectExtend } from './SelectExt';

const InputGroup = Input.Group;

export interface SelectSelectProps {
  value?: {
    // 默认值
    selectValueBefore?: SelectValue;
    selectValueAfter?: SelectValue;
  };
  selectPropsBefore?: SelectExtend<SelectValue>; // select组件属性
  selectPropsAfter?: SelectExtend<SelectValue>; // input组件属性
  showSelectBefore?: boolean; // 是否显示Select
  showSelectAfter?: boolean; // 是否显示Input
  onChange?: (params: { selectValueBefore?: SelectValue; selectValueAfter?: SelectValue }) => void; // 重写onChange事件
}

interface SelectSelectState {
  selectValueBefore?: SelectValue;
  selectValueAfter?: SelectValue;
}

export default class SelectSelect extends PureComponent<SelectSelectProps, SelectSelectState> {
  constructor(props: Readonly<SelectSelectProps>) {
    super(props);

    this.state = {
      selectValueBefore: undefined,
      selectValueAfter: undefined,
    };

    this.onSelectBeforeChange = this.onSelectBeforeChange.bind(this);
    this.onSelectAfterChange = this.onSelectAfterChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps: SelectSelectProps): SelectSelectState | null {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  // 前一个Select onChange
  onSelectBeforeChange(value: SelectValue, option: OptionProps): void {
    const { selectPropsBefore } = this.props;

    if (selectPropsBefore && selectPropsBefore.onChange) {
      selectPropsBefore.onChange(value, option);
    }

    if (!('value' in this.props)) {
      this.setState({ selectValueBefore: value }, () => {
        this.onChange({ selectValueBefore: value, selectValueAfter: undefined });
      });
    } else {
      this.onChange({ selectValueBefore: value, selectValueAfter: undefined });
    }
  }

  // 后一个Select onChange
  onSelectAfterChange(value: SelectValue, option: OptionProps): void {
    const { selectPropsAfter } = this.props;
    const { selectValueBefore } = this.state;

    if (selectPropsAfter && selectPropsAfter.onChange) {
      selectPropsAfter.onChange(value, option);
    }

    if (!('value' in this.props)) {
      this.setState({ selectValueAfter: value }, () => {
        this.onChange({ selectValueBefore, selectValueAfter: value });
      });
    } else {
      this.onChange({ selectValueBefore, selectValueAfter: value });
    }
  }

  onChange(params: { selectValueBefore?: SelectValue; selectValueAfter?: SelectValue }): void {
    const { onChange } = this.props;
    if (onChange) {
      onChange(params);
    }
  }

  render(): JSX.Element {
    const { selectPropsBefore, selectPropsAfter, showSelectBefore, showSelectAfter } = this.props;
    const { selectValueBefore, selectValueAfter } = this.state;

    const showSelectBeforeX = showSelectBefore === undefined || showSelectBefore;
    const showSelectAfterX = showSelectAfter === undefined || showSelectAfter;

    return (
      <InputGroup compact>
        {showSelectBeforeX ? (
          <SelectExt
            style={{ width: showSelectAfterX ? '50%' : '100%' }}
            optionAll={false}
            value={selectValueBefore}
            {...selectPropsBefore}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onChange={this.onSelectBeforeChange}
          />
        ) : null}
        {showSelectAfterX ? (
          <SelectExt
            style={{ width: showSelectBeforeX ? '50%' : '100%' }}
            optionAll={false}
            value={selectValueAfter}
            {...selectPropsAfter}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onChange={this.onSelectAfterChange}
          />
        ) : null}
      </InputGroup>
    );
  }
}
