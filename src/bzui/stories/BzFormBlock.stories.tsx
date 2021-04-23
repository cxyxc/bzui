/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { Button, Input, Radio } from 'antd';
import { Story, Meta } from '@storybook/react';
import { BzForm } from '@bzui/index';
import { BzFormProps } from '@bzui/BzForm';

export default {
  title: '表单/BzFormBlock',
  component: BzForm,
  argTypes: {},
} as Meta;

export const Default: Story<BzFormProps> = (props) => (
  <BzForm>
    <BzForm.Block {...props}>
      <BzForm.Item label="姓名" name="name" rules={[{ required: true }]}>
        <Input />
      </BzForm.Item>
      <BzForm.Item label="性别" name="gender" rules={[{ required: true }]}>
        <Input />
      </BzForm.Item>
      <BzForm.Item label="身高">
        <Input />
      </BzForm.Item>
      <BzForm.Item label="体重">
        <Input />
      </BzForm.Item>
    </BzForm.Block>
  </BzForm>
);
Default.args = {
  title: '表单区块固定像素布局,常见于抽屉左侧',
  labelCol: { flex: '52px' },
  wrapperCol: { flex: '174px' },
};

export const InsideBlock: Story<BzFormProps> = (props) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <BzForm onFinish={onFinish}>
      <BzForm.Block
        title="表单内嵌区块（注意: labelCol wrapperCol 同 Antd）"
        labelCol={{ flex: '132px' }}
        wrapperCol={{ flex: '500px' }}
      >
        <BzForm.Item
          label="用工形式"
          name="laborForm"
          initialValue={1}
          rules={[{ required: true, message: '用工形式是必填项' }]}
        >
          <Radio.Group
            options={[
              { label: '全职', value: 1 },
              { label: '兼职', value: 2 },
            ]}
          />
        </BzForm.Item>
        <BzForm.InsideBlock {...props}>
          <BzForm.Item
            name="haveProbation"
            label="试用期"
            rules={[{ required: true, message: '试用期是必填项' }]}
          >
            <Radio.Group
              options={[
                { label: '无试用期', value: 1 },
                { label: '有试用期', value: 2 },
              ]}
            />
          </BzForm.Item>
        </BzForm.InsideBlock>
        <BzForm.Item>
          <Button type="primary" htmlType="submit">
            测试校验UI效果
          </Button>
        </BzForm.Item>
      </BzForm.Block>
    </BzForm>
  );
};
InsideBlock.args = {
  labelCol: {},
  wrapperCol: {},
};

const wrapperStyle = {
  padding: 32,
  backgroundColor: '#F0F2F5',
};
export const CardAndBlock: Story<BzFormProps> = (props) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <div style={wrapperStyle}>
      <BzForm
        labelCol={{ flex: '132px' }}
        onFinish={onFinish}
        validateMessages={{ required: '${label}是必填项' }}
      >
        <BzForm.Card title="5.设置面试/试工/上岗 - 卡片包裹的表格区域,常见于单页复杂表单">
          <BzForm.Block {...props}>
            <BzForm.Item label="面试地址">
              <Input />
            </BzForm.Item>
            <BzForm.Item label="面试时间">
              <Input />
            </BzForm.Item>
            <BzForm.Item label="面试要求">
              <Input.TextArea />
            </BzForm.Item>
          </BzForm.Block>
          <BzForm.Block {...props}>
            <BzForm.Item label="试工地址">
              <Input />
            </BzForm.Item>
            <BzForm.Item label="试工周期">
              <Input />
            </BzForm.Item>
            <BzForm.Item label="试工考核">
              <Input.TextArea />
            </BzForm.Item>
          </BzForm.Block>
        </BzForm.Card>
        <BzForm.Card title="5.设置面试/试工/上岗 - 卡片包裹的表格区域,常见于单页复杂表单">
          <BzForm.Block {...props}>
            <BzForm.Item label="面试地址">
              <Input />
            </BzForm.Item>
            <BzForm.Item label="面试时间">
              <Input />
            </BzForm.Item>
            <BzForm.Item label="面试要求">
              <Input.TextArea />
            </BzForm.Item>
          </BzForm.Block>
          <BzForm.Block {...props}>
            <BzForm.Item
              label="试工地址"
              name="address"
              rules={[{ required: true }]}
            >
              <Input />
            </BzForm.Item>
            <BzForm.Item
              label="试工周期"
              name="range"
              rules={[{ required: true }]}
            >
              <Input />
            </BzForm.Item>
          </BzForm.Block>
        </BzForm.Card>
        <BzForm.Item>
          <Button type="primary" htmlType="submit">
            测试校验UI效果
          </Button>
        </BzForm.Item>
      </BzForm>
    </div>
  );
};
CardAndBlock.args = {
  title: '面试地址',
};
