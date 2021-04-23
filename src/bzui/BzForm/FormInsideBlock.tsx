// 内部组件禁止直接引用
import React, { CSSProperties, ReactNode, useContext, useMemo } from 'react';
import classnames from 'classnames';
import styles from './FormInsideBlock.module.scss';
import {
  BzFormContext,
  FormBlockContext,
  FormInsideBlockContext,
} from './contexts';
import { Row, Col } from 'antd';
import { ColProps } from 'antd/lib/col';

interface Props {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  labelCol?: ColProps; // 作用同 Form labelCol , 通过上下文配置 Form Item 的 labelCol
  wrapperCol?: ColProps; // 同上
}

FormInsideBlock.defaultProps = {
  // 清除 Form / FormBlock 设置的 Col 属性
  labelCol: {},
  wrapperCol: {},
};

export function FormInsideBlock(props: Props) {
  const { className, labelCol, wrapperCol } = props;
  const formContext = useContext(BzFormContext);
  const blockContext = useContext(FormBlockContext);

  const classNames = classnames(className, styles.container);

  const contextLabelColFinal =
    blockContext?.labelCol || formContext?.labelCol || {};
  const containerColProps = blockContext?.wrapperCol ||
    formContext?.wrapperCol || { flex: '1 1 auto' };

  const providerValue = useMemo(() => {
    return {
      inInsideBlock: true,
      labelCol,
      wrapperCol,
    };
  }, [labelCol, wrapperCol]);

  return (
    <Row className={styles.rowContainer}>
      <Col {...contextLabelColFinal}></Col>
      <Col {...containerColProps}>
        <div className={classNames} style={props.style}>
          <FormInsideBlockContext.Provider value={providerValue}>
            {props.children}
          </FormInsideBlockContext.Provider>
        </div>
      </Col>
    </Row>
  );
}
