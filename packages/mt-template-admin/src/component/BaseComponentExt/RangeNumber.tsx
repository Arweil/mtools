import React, { PureComponent } from 'react';
import { Input } from 'antd';
import InputExt from './InputExt';

const InputGroup = Input.Group;

interface IRangeNumberProps {
  value?: [string | undefined, string | undefined];
  onChange?: (params: [string | undefined, string | undefined]) => void;
  placeholder?: [string | undefined, string | undefined];
}

interface IRangeNumberState {
  minimum: string | undefined;
  maximum: string | undefined;
}

export default class RangeNumber extends PureComponent<IRangeNumberProps, IRangeNumberState> {
  constructor(props: Readonly<IRangeNumberProps>) {
    super(props);

    this.state = {
      minimum: undefined,
      maximum: undefined,
    };

    this.onStartValueChange = this.onStartValueChange.bind(this);
    this.onEndValueChange = this.onEndValueChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps: IRangeNumberProps): IRangeNumberState | null {
    if ('value' in nextProps) {
      if (nextProps.value && nextProps.value.length > 0) {
        return {
          minimum: nextProps.value[0],
          maximum: nextProps.value[1],
        };
      }

      return {
        minimum: undefined,
        maximum: undefined,
      };
    }

    return null;
  }

  onStartValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    if (!('value' in this.props)) {
      this.setState({ minimum: value }, () => {
        const { maximum } = this.state;
        this.onChange([value, maximum]);
      });
    } else {
      const { maximum } = this.state;
      this.onChange([value, maximum]);
    }
  }

  onEndValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    if (!('value' in this.props)) {
      this.setState({ maximum: value }, () => {
        const { minimum } = this.state;
        this.onChange([minimum, value]);
      });
    } else {
      const { minimum } = this.state;
      this.onChange([minimum, value]);
    }
  }

  onChange(value: [string | undefined, string | undefined]): void {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  render(): JSX.Element {
    const { minimum, maximum } = this.state;
    const { placeholder } = this.props;
    const [startPlaceholder, endPlaceholder] = placeholder || ['Minimum', 'Maximum'];

    return (
      <InputGroup compact className="flex-cnt" style={{ marginTop: 4 }}>
        <InputExt
          style={{ textAlign: 'center' }}
          placeholder={startPlaceholder}
          value={minimum}
          onChange={this.onStartValueChange}
        />
        <InputExt
          style={{
            width: 30,
            borderLeft: 0,
            pointerEvents: 'none',
            backgroundColor: '#fff',
          }}
          placeholder="~"
          disabled
        />
        <InputExt
          style={{ textAlign: 'center', borderLeft: 0 }}
          placeholder={endPlaceholder}
          value={maximum}
          onChange={this.onEndValueChange}
        />
      </InputGroup>
    );
  }
}
