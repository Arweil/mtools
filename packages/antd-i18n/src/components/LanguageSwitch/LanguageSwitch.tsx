import { Select } from 'antd';
import React from 'react';
import type { TypeLanguage } from '../../types';

export interface LanguageSwitchProps {
  value: TypeLanguage;
  languages: { [key in TypeLanguage]?: React.ReactNode };
  onChange: (value: TypeLanguage) => void;
}

export default function LanguageSwitch(props: LanguageSwitchProps): JSX.Element {
  const { value: v, languages, onChange } = props;
  return (
    <Select
      options={Object.entries(languages).map(([key, value]) => ({
        label: value,
        value: key,
      }))}
      value={v}
      onChange={onChange}
    />
  );
}
