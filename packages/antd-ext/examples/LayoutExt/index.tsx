import { LayoutExt } from '@m-tools/antd-ext';
import React from 'react';

export default function Index() {
  return (
    <LayoutExt
      setTitle={collapsed => {
        return <div style={{ textAlign: 'center', color: '#FFF' }}>ZEUS</div>;
      }}
      theme="zeus"
      headerExtra={
        <div style={{ display: 'flex', color: '#FFF', marginRight: 8 }}>
          <div style={{ marginRight: 12 }}>爱邦保险经纪</div>
          <div>超级管理员</div>
        </div>
      }
    />
  );
}
