import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import React from 'react';
import useModal from './useModal';

const Mix = function (props: ModalProps) {
  return <Modal {...props} />;
};

Mix.useModal = useModal;

export default Mix;
