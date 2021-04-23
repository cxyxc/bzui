/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  BzBellFilled,
  BzBusinessFilled,
  BzEllipsisFilled,
  BzTextIcon,
  BzDianpingFilled,
} from '@bzui/icons';
import { BzIconsProps } from '@bzui/icons/interfaces';
import { Descriptions } from 'antd';

export default {
  title: '通用/Icon',
  component: BzBellFilled,
  argTypes: {},
} as Meta;

export const Default: Story<BzIconsProps> = (props) => (
  <Descriptions title="图标" bordered>
    <Descriptions.Item label="铃铛">
      <BzBellFilled />
    </Descriptions.Item>
    <Descriptions.Item label="商户确认">
      <BzBusinessFilled />
    </Descriptions.Item>
    <Descriptions.Item label="省略符号">
      <BzEllipsisFilled />
    </Descriptions.Item>
    <Descriptions.Item label="任意文字标">
      <BzTextIcon text="供" />
    </Descriptions.Item>
    <Descriptions.Item label="大众点评">
      <BzDianpingFilled />
    </Descriptions.Item>
  </Descriptions>
);

Default.args = {};
