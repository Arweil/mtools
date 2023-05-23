import React, { useState } from 'react';
import { RangeNumberExt } from 'antd-ext';
import type { RangeNumberVal } from 'antd-ext/RangeNumberExt/RangeNumberExt';

export default () => {
  const [range, setRange] = useState<RangeNumberVal>([null, null]);
  const onChange = (v: RangeNumberVal) => {
    console.log(v);
    setRange(v);
  };
  return (
    <div>
      <div>
        输入的范围是：{range[0]}——{range[1]}
      </div>
      <RangeNumberExt onChange={onChange} />
    </div>
  );
};
