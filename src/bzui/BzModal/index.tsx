import React, { ReactNode } from 'react';
import { Modal } from 'antd';
import classnames from 'classnames';
import styles from './index.module.scss';
import { ModalProps } from 'antd/lib/modal';
import { ButtonProps } from 'antd/lib/button';

export interface BzModalProps extends ModalProps {
  type?: 'default' | 'simple'; // simple 模式适合作为单行文案的确认框使用
  children?: ReactNode;
  // https://github.com/ant-design/ant-design/issues/26288
  allowSlot?: boolean; // antd 不打算支持插槽类型的 API, 后续可以考虑自行实现
}

export const BzModal: React.FC<BzModalProps> = (props) => {
  const {
    wrapClassName,
    type,
    okButtonProps,
    cancelButtonProps,
    ...otherProps
  } = props;
  const wrapClassNames = classnames(wrapClassName, {
    [styles.container]: type === 'default',
    [styles.simple]: type === 'simple',
  });
  const simpleTypeProps =
    type === 'simple'
      ? {
          okButtonProps: {
            size: 'small',
            ...okButtonProps,
          } as ButtonProps,
          cancelButtonProps: {
            size: 'small',
            ...cancelButtonProps,
          } as ButtonProps,
        }
      : {};

  return (
    <Modal
      wrapClassName={wrapClassNames}
      {...simpleTypeProps}
      {...otherProps}
    />
  );
};

BzModal.defaultProps = {
  type: 'default',
  centered: true,
  maskClosable: false,
  destroyOnClose: true,
};
