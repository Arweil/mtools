/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import { Input, InputProps } from 'antd';
import { SelectValue, OptionProps } from 'antd/lib/select';
import SelectExt, { SelectExtend } from './SelectExt';
import InputExt from './InputExt';

const InputGroup = Input.Group;

type InputValueType = string | number | string[];

export interface SelectInputProps {
  value?: {
    // 默认值
    selectValue?: SelectValue;
    inputValue?: InputValueType;
  };
  selectProps?: SelectExtend<SelectValue>; // select组件属性
  inputProps?: InputProps; // input组件属性
  showSelect?: boolean; // 是否显示Select
  showInput?: boolean; // 是否显示Input
  onChange?: (params: { selectValue?: SelectValue; inputValue?: InputValueType }) => void; // 重写onChange事件
}

interface SelectInputState {
  selectValue?: SelectValue;
  inputValue?: InputValueType;
}

export default class SelectInput extends PureComponent<SelectInputProps, SelectInputState> {
  constructor(props: Readonly<SelectInputProps>) {
    super(props);

    this.state = {
      selectValue: undefined,
      inputValue: undefined,
    };
  }

  static getDerivedStateFromProps(nextProps: SelectInputProps): SelectInputState | null {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  onSelectChange = (value: SelectValue, option: OptionProps): void => {
    const { selectProps } = this.props;
    const { inputValue } = this.state;

    if (selectProps && selectProps.onChange) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      selectProps.onChange(value, option);
    }

    if (!('value' in this.props)) {
      this.setState({ selectValue: value }, () => {
        this.onChange({ selectValue: value, inputValue });
      });
    } else {
      this.onChange({ selectValue: value, inputValue });
    }
  };

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { inputProps } = this.props;
    const { selectValue } = this.state;

    const { value } = e.target;

    if (inputProps && inputProps.onChange) {
      inputProps.onChange(e);
    }

    if (!('value' in this.props)) {
      this.setState({ inputValue: value }, () => {
        this.onChange({ selectValue, inputValue: value });
      });
    } else {
      this.onChange({ selectValue, inputValue: value });
    }
  };

  onChange(params: { selectValue?: SelectValue; inputValue?: InputValueType }): void {
    const { onChange } = this.props;
    if (onChange) {
      onChange(params);
    }
  }

  render(): JSX.Element {
    const { selectProps, inputProps, showSelect, showInput } = this.props;
    const { selectValue, inputValue } = this.state;

    const showSelectX = showSelect === undefined || showSelect;
    const showInputX = showInput === undefined || showInput;

    return (
      <InputGroup compact>
        {showSelectX ? (
          <SelectExt
            style={{ width: showInputX ? '50%' : '100%' }}
            optionAll={false}
            value={selectValue}
            {...selectProps}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onChange={this.onSelectChange}
          />
        ) : null}
        {showInputX ? (
          <InputExt
            style={{ width: showSelectX ? '50%' : '100%' }}
            value={inputValue}
            {...inputProps}
            onChange={this.onInputChange}
          />
        ) : null}
      </InputGroup>
    );
  }
}
