/**
 * title: 自定义分页尺寸
 * description: 骨架屏默认渲染条数和分页器数量逻辑处理
 */

import type { RadioChangeEvent } from 'antd';
import { Divider, Radio } from 'antd';
import React, { useCallback, useState } from 'react';
import TableExtBackEnd from './TableExtBackEnd';
import TableExtFrontEnd from './TableExtFrontEnd';
import { ConfigProviderExt, locale } from '@m-tools/antd-ext';

export default function Index() {
  const [radioVal, setRadioVal] = useState('TableExtBackEnd');

  const onChangeRadio = useCallback((e: RadioChangeEvent) => {
    setRadioVal(e.target.value);
  }, []);

  return (
    <ConfigProviderExt locale={locale.zh_CN} themeExt="hermes">
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        options={[
          { label: 'TableExtBackEnd', value: 'TableExtBackEnd' },
          { label: 'TableExtFrontEnd', value: 'TableExtFrontEnd' },
        ]}
        onChange={onChangeRadio}
        value={radioVal}
      />

      <Divider />

      {radioVal === 'TableExtBackEnd' ? <TableExtBackEnd /> : <TableExtFrontEnd />}
    </ConfigProviderExt>
  );
}
