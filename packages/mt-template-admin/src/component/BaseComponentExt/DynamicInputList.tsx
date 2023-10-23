import React, { PureComponent } from 'react';
import { InputProps } from 'antd/lib/input';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import InputExt from './InputExt';
import './dynamic-input-item.less';

export interface DynamicInputListProps {
  inputProps?: InputProps;
  value?: string[];
  onChange?: (values: string[]) => void;
  disabled?: boolean;
}

interface DynamicInputListState {
  valueList: string[];
}

export default class DynamicInputList extends PureComponent<
  DynamicInputListProps,
  DynamicInputListState
> {
  constructor(props: Readonly<DynamicInputListProps>) {
    super(props);

    this.state = {
      valueList: [''],
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  static getDerivedStateFromProps(nextProps: DynamicInputListProps): DynamicInputListState | null {
    if ('value' in nextProps) {
      return {
        valueList: nextProps.value && nextProps.value.length ? nextProps.value : [''],
      };
    }
    return null;
  }

  onAdd(): void {
    const { valueList } = this.state;
    const finVals = [...valueList, ''];
    this.setState(
      {
        valueList: finVals,
      },
      () => {
        const { onChange } = this.props;
        if (onChange) {
          onChange(finVals);
        }
      },
    );
  }

  onDelete(index: number): void {
    const { valueList } = this.state;
    const finVals = valueList.filter((item, _index) => index !== _index);

    this.setState(
      {
        valueList: finVals,
      },
      () => {
        const { onChange } = this.props;
        if (onChange) {
          onChange(finVals);
        }
      },
    );
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    const { valueList } = this.state;
    const finValueList = [...valueList];
    finValueList[index] = e.target.value;

    this.setState(
      {
        valueList: finValueList,
      },
      () => {
        const { onChange } = this.props;
        if (onChange) {
          onChange(finValueList);
        }
      },
    );
  }

  render(): JSX.Element {
    const { inputProps, disabled } = this.props;
    const { valueList } = this.state;

    return (
      <div>
        {valueList.map((value, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="dynamic-input-item">
            <InputExt
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...inputProps}
              disabled={disabled}
              value={value}
              onChange={event => this.onChange(event, index)}
            />
            {disabled ? null : <PlusCircleOutlined onClick={() => this.onAdd()} />}
            {valueList.length > 1 && !disabled ? (
              <MinusCircleOutlined onClick={() => this.onDelete(index)} />
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}
