import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import React from 'react';
import confirm from './confirm';
import type { ModalFuncPropsExt } from './types';
import useModal from './useModal';

const Mix = function (props: ModalProps) {
  return <Modal {...props} />;
};

Mix.useModal = useModal;
Mix.confirm = confirm;
Mix.info = function (config: ModalFuncPropsExt) {
  return confirm({ ...config, type: 'info' });
};
Mix.success = function (config: ModalFuncPropsExt) {
  return confirm({ ...config, type: 'success' });
};
Mix.warning = function (config: ModalFuncPropsExt) {
  return confirm({ ...config, type: 'warning' });
};
Mix.error = function (config: ModalFuncPropsExt) {
  return confirm({ ...config, type: 'error' });
};

export default Mix;
export * from './types';
