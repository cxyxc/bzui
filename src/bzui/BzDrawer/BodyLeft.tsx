// 左侧区块(内部组件禁止直接引用)
import React, { HTMLProps } from 'react';
import classnames from 'classnames';
import styles from './BodyLeft.module.scss';

interface Props extends HTMLProps<HTMLDivElement> {}

export function BodyLeft(props: Props) {
  const { className, ...otherProps } = props;
  const classNames = classnames(className, styles.container);

  return <div className={classNames} {...otherProps} />;
}
