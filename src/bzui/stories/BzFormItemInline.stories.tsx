import React from 'react';
import { Button, Input, Select } from 'antd';
import { Story, Meta } from '@storybook/react';
import { BzForm } from '@bzui/index';
import { BzFormItemInlineProps } from '@bzui/BzForm/FormItemInline';

export default {
  title: '表单/BzFormItemInline',
  component: BzForm.Inline,
  argTypes: {},
} as Meta;

export const Default: Story<BzFormItemInlineProps> = (args) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <BzForm onFinish={onFinish}>
      <BzForm.Block
        title={'多表单项单行布局,一般用于复杂字段'}
        labelCol={{ flex: '80px' }}
        wrapperCol={{ flex: '600px' }}
      >
        <BzForm.Inline {...args}>
          <BzForm.Item
            name="expectedType"
            rules={[{ required: true, message: '期望薪资单位是必填项' }]}
          >
            <Select
              style={{ width: 160 }}
              options={[{ label: '每月', value: 1 }]}
            />
          </BzForm.Item>
          <BzForm.Item
            name="expectedMoney"
            rules={[{ required: true, message: '期望薪资金额是必填项' }]}
          >
            <Input style={{ width: 160 }} />
          </BzForm.Item>
          <span>元</span>
        </BzForm.Inline>
        <BzForm.Inline label="阶梯薪资">
          <span>做满</span>
          <BzForm.Item name="workCount">
            <Input style={{ width: 160 }} />
          </BzForm.Item>
          <BzForm.Item name="workType">
            <Select
              style={{ width: 70 }}
              options={[{ label: '天', value: 1 }]}
            />
          </BzForm.Item>
          ，薪资为
          <BzForm.Item name="workMoney">
            <Input style={{ width: 160 }} />
          </BzForm.Item>
          <span>元/月</span>
        </BzForm.Inline>
        <BzForm.Item>
          <Button type="primary" htmlType="submit">
            测试校验UI效果
          </Button>
        </BzForm.Item>
      </BzForm.Block>
    </BzForm>
  );
};
Default.args = {
  label: '期望薪资',
  required: true,
};

export const InlineCompact: Story<BzFormItemInlineProps> = (args) => (
  <BzForm>
    <BzForm.Block
      title={'紧凑模式'}
      labelCol={{ flex: '80px' }}
      wrapperCol={{ flex: '600px' }}
    >
      <BzForm.Inline {...args}>
        <BzForm.Item noStyle>
          <Select
            style={{ width: 160 }}
            options={[{ label: '每月', value: 1 }]}
          />
        </BzForm.Item>
        <BzForm.Item noStyle>
          <Input style={{ width: 160 }} suffix="元" />
        </BzForm.Item>
      </BzForm.Inline>
    </BzForm.Block>
  </BzForm>
);
InlineCompact.args = {
  label: '期望薪资',
  compact: true,
};
