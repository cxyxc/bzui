// 内部组件禁止直接引用
import React, { ReactNode } from 'react';
import styles from './FormItemInline.module.scss';
import classnames from 'classnames';
import { FormItem, BzFormItemProps } from './FormItem';
import { Space, Input } from 'antd';
const InputGroup = Input.Group;
export interface BzFormItemInlineProps extends BzFormItemProps {
  children: ReactNode;
  spaceSize?: 'small' | 'middle' | 'large' | number; // 间距大小
  compact?: boolean; // 是否用紧凑模式	boolean	false
}
FormItemInline.defaultProps = {
  spaceSize: 'small',
};

export function FormItemInline(props: BzFormItemInlineProps) {
  const { className, spaceSize, compact, isDescription, ...otherProps } = props;

  const classNames = classnames(className, styles.container);
  const isDescriptionFinal = isDescription || false; // 默认将 isDescription 调整为 false

  let children = null;
  if (compact) {
    // 启用紧凑模式
    children = <InputGroup compact>{props.children}</InputGroup>;
  } else {
    children = (
      <Space size={spaceSize} align="baseline">
        {props.children}
      </Space>
    );
  }

  return (
    <FormItem
      className={classNames}
      isDescription={isDescriptionFinal}
      {...otherProps}
    >
      {children}
    </FormItem>
  );
}
