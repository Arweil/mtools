import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import React from 'react';
import modal from './modal';
import type { ModalFuncPropsExt } from './types';
import useModal from './useModal';

const Mix = function (props: ModalProps) {
  return <Modal {...props} />;
};

Mix.useModal = useModal;
Mix.confirm = modal;
Mix.info = function (config: ModalFuncPropsExt) {
  return modal({ ...config, type: 'info' });
};
Mix.success = function (config: ModalFuncPropsExt) {
  return modal({ ...config, type: 'success' });
};
Mix.warning = function (config: ModalFuncPropsExt) {
  return modal({ ...config, type: 'warning' });
};
Mix.error = function (config: ModalFuncPropsExt) {
  return modal({ ...config, type: 'error' });
};

export default Mix;
export * from './types';
