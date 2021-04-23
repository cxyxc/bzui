import React from 'react';
import { Input } from 'antd';
import { Story, Meta } from '@storybook/react';
import { BzForm } from '@bzui/index';
import { BzFormItemInlineProps } from '@bzui/BzForm/FormItemInline';

export default {
  title: '表单/BzFormItem',
  component: BzForm,
  argTypes: {},
} as Meta;

export const WithDetails: Story<BzFormItemInlineProps> = (args) => (
  <BzForm
    mode={args.mode}
    initialValues={{ text: '上岗要求是...', time: '待确定' }}
  >
    <BzForm.Block
      title={'与详情混排的表单项'}
      labelCol={{ flex: '126px' }}
      wrapperCol={{ flex: '600px' }}
    >
      <BzForm.Item label="上岗地址">
        同门店地址（上海市浦东新区张江镇或香路）
      </BzForm.Item>
      <BzForm.TextItem
        label="商家要求上岗时间"
        name="time"
        render={(value) => value}
      />
      <BzForm.Item label="上岗要求" name="text">
        <Input />
      </BzForm.Item>
    </BzForm.Block>
  </BzForm>
);

WithDetails.args = {
  mode: 'detail',
};
