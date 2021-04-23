// 内部组件禁止直接引用
import React from 'react';
import { FormCardContext } from './contexts';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';
import classnames from 'classnames';
import styles from './FormCard.module.scss';

interface Props extends CardProps {}

const contextValue = {
  inCard: true,
};

export function FormCard(props: Props) {
  let { className, ...otherProps } = props;
  className = classnames(className, styles.container);

  return (
    <FormCardContext.Provider value={contextValue}>
      <Card bordered={false} {...otherProps} className={className} />
    </FormCardContext.Provider>
  );
}
