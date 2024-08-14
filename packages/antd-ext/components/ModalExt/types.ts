import type { Modal, ModalFuncProps } from 'antd';
import type { HookAPI } from 'antd/es/modal/useModal';

export type ModalReturnType = ReturnType<(typeof Modal)['useModal']>;

export interface ModalFuncPropsExt extends ModalFuncProps {
  type?: 'info' | 'success' | 'error' | 'warning' | 'confirm';
  backgroundImg?: React.ReactNode;
}

export interface HookAPIExt extends Omit<HookAPI, 'confirm'> {
  confirm: (config: ModalFuncPropsExt) => ReturnType<HookAPI['confirm']>;
}
