import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BzStatusTag } from '@bzui/index';
import {
  BzStatusTagProps,
  BzStatusTagSwitchProps,
} from '@bzui/BzStatusTag/interfaces';

export default {
  title: '数据展示/BzStatusTag',
  component: BzStatusTag,
  argTypes: {},
} as Meta;

export const Default: Story<BzStatusTagProps> = (args) => {
  return (
    <>
      <BzStatusTag
        status="success"
        text="试工结束"
        childStatus="primary"
        childText="管家确认通过"
      />
      <br />
      <br />
      <BzStatusTag
        status="error"
        text="试工失败"
        childStatus="default"
        childText="待管家确认"
      />
      <br />
      <br />
      <BzStatusTag status="default" text="未安排" />
      <br />
      <br />
      <BzStatusTag status="processing" text="试工中" />
      <br />
      <br />
      <BzStatusTag {...args} />
    </>
  );
};

Default.args = {
  text: '根据属性变化',
};

export const TextType: Story<BzStatusTagProps> = (args) => {
  return (
    <>
      <BzStatusTag {...args} />
    </>
  );
};

TextType.args = {
  text: '文本模式',
  status: 'success',
  type: 'text',
};

export const WithDescription: Story<BzStatusTagProps> = (args) => {
  return <BzStatusTag {...args} />;
};
WithDescription.args = {
  status: 'success',
  text: '试工结束',
  description: '商家反馈用户待定',
};

export const WithAction: Story<BzStatusTagProps> = (args) => {
  return <BzStatusTag {...args} extra={<a>发送上岗确认</a>} />;
};
WithAction.args = {
  status: 'warning',
  text: '时间未确认',
  type: 'text',
};

export const StatusTagSwitch: Story<BzStatusTagSwitchProps> = (args) => {
  return (
    <BzStatusTag.Switch
      value={args.value}
      options={[
        {
          status: 'success',
          text: '试工结束',
          childStatus: 'primary',
          childText: '管家确认通过',
          value: 1,
        },
        {
          status: 'error',
          text: '试工失败',
          childStatus: 'default',
          childText: '待管家确认',
          value: 2,
        },
        {
          status: 'default',
          text: '未安排',
          value: 3,
        },
        {
          status: 'processing',
          text: '试工中',
          value: 4,
        },
        {
          status: 'success',
          text: '试工结束',
          childStatus: 'primary',
          childText: '客成确认通过',
          value: 5,
        },
      ]}
    />
  );
};

StatusTagSwitch.args = {
  value: 1,
};
