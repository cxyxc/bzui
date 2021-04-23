import React, { ReactNode, useMemo } from 'react';
import { Form as AntdForm } from 'antd';
import { BzFormContext } from './contexts';
import { FormCard } from './FormCard';
import { FormBlock } from './FormBlock';
import { FormInsideBlock } from './FormInsideBlock';
import { FormItemInline } from './FormItemInline';
import { FormItem, FormTextItem } from './FormItem';
import { FormProps } from 'antd/lib/form';
export interface BzFormProps extends FormProps {
  mode?: 'default' | 'detail'; // detail 标明表单与详情混排
  children: ReactNode;
}

export function BzForm(props: BzFormProps) {
  const { mode, ...otherProps } = props;
  const contextValue = useMemo(() => {
    return {
      mode,
      labelCol: otherProps?.labelCol,
      wrapperCol: otherProps?.wrapperCol,
    };
  }, [mode]);

  return (
    <BzFormContext.Provider value={contextValue}>
      <AntdForm {...otherProps} />
    </BzFormContext.Provider>
  );
}

BzForm.useForm = AntdForm.useForm;
BzForm.List = AntdForm.List;
BzForm.Provider = AntdForm.Provider;

BzForm.Item = FormItem;
BzForm.TextItem = FormTextItem;
BzForm.Card = FormCard;
BzForm.Block = FormBlock;
BzForm.InsideBlock = FormInsideBlock;
BzForm.Inline = FormItemInline;
