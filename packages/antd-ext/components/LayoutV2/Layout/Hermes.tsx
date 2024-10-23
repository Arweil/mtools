import React from 'react';
import type { LayoutProps } from '../types';

const LayoutHermes: React.FC<LayoutProps> = props => {
  const { className } = props;
  return <div className={className}>LayoutHermes</div>;
};

export default LayoutHermes;
