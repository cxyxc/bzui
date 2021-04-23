// 内部组件禁止直接引用
import React, { ReactNode, useContext } from 'react';
import { Form as AntdForm } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import {
  BzFormContext,
  FormBlockContext,
  FormInsideBlockContext,
} from './contexts';
import classnames from 'classnames';
import styles from './FormItem.module.scss';
import { isBoolean } from 'lodash';

const AntdFormItem = AntdForm.Item;

export interface BzFormItemProps extends FormItemProps {
  mode?: 'default' | 'detail'; // 详情模式下文本颜色将发生变化
  children: ReactNode;
  isDescription?: boolean; // 详情项，仅在详情模式下有效(开启后与 Description.Item 样式保持一致)
}

interface FormContext {
  mode?: 'default' | 'detail';
}

export function FormItem(props: BzFormItemProps) {
  const {
    mode,
    isDescription,
    labelCol,
    wrapperCol,
    className,
    ...otherProps
  } = props;

  // 处理 mode / isDescription
  const formContext = useContext<FormContext>(BzFormContext);
  const modeFinal = mode || formContext.mode || undefined;
  const isDescriptionFinal = isBoolean(isDescription)
    ? isDescription
    : modeFinal === 'detail' && props.name === undefined;
  const classNames = classnames(className, {
    [styles.detailMode]: modeFinal === 'detail',
    [styles.isDescription]: isDescriptionFinal,
  });

  // 处理 labelCol / wrapperCol
  const blockContext = useContext(FormBlockContext);
  const insideBlockContext = useContext(FormInsideBlockContext);
  const labelColFinal =
    labelCol ||
    insideBlockContext?.labelCol ||
    blockContext?.labelCol ||
    undefined;
  const wrapperColFinal =
    wrapperCol ||
    insideBlockContext?.wrapperCol ||
    blockContext?.wrapperCol ||
    undefined;

  return (
    <AntdFormItem
      className={classNames}
      labelCol={labelColFinal}
      wrapperCol={wrapperColFinal}
      {...otherProps}
    />
  );
}

interface Props {
  value?: any;
  render?: (value: any) => string | ReactNode;
}
function Text(props: Props) {
  if (props.render) return <span>{props.render(props.value)}</span>;
  return <span>{props.value}</span>;
}

export interface BzFormTextItemProps extends FormItemProps {
  render?: (value: any) => ReactNode;
}

export function FormTextItem(props: BzFormTextItemProps) {
  const { render, ...otherProps } = props;
  // 利用 FormItem name 获取到表单值并渲染的组合组件
  return (
    <FormItem {...otherProps} isDescription>
      <Text render={render} />
    </FormItem>
  );
}
