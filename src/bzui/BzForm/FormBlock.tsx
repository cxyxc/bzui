// 内部组件禁止直接引用
import React, { CSSProperties, ReactNode, useContext } from 'react';
import classnames from 'classnames';
import styles from './FormBlock.module.scss';
import { BzFormContext, FormBlockContext, FormCardContext } from './contexts';
import { ColProps } from 'antd/lib/col';

const isEmpty = (value: any) => value === null || value === undefined;

interface Props {
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  labelCol?: ColProps; // 作用同 Form labelCol , 通过上下文配置 Form Item 的 labelCol
  wrapperCol?: ColProps; // 同上
}

export function FormBlock(props: Props) {
  const { className, labelCol, wrapperCol } = props;

  const { mode } = useContext(BzFormContext);
  const { inCard } = useContext(FormCardContext);

  const classNames = classnames(className, styles.container, {
    [styles.inCard]: inCard,
    [styles.formDetail]: mode === 'detail',
  });

  return (
    <div className={classNames} style={props.style}>
      {isEmpty(props.title) ? null : (
        <div className={styles.header}>
          <div className={styles.title}>{props.title}</div>
        </div>
      )}
      <div className={styles.body}>
        <FormBlockContext.Provider
          value={{
            labelCol,
            wrapperCol,
          }}
        >
          {props.children}
        </FormBlockContext.Provider>
      </div>
    </div>
  );
}
