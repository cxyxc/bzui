import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BzSpotlight } from '@bzui/index';
import { BzSpotlightProps } from '@bzui/BzSpotlight';
import { BzDescriptions } from '@bzui/BzDescriptions';

export default {
  title: '数据展示/BzSpotlight',
  component: BzSpotlight,
  argTypes: {},
} as Meta;

export const Default: Story<BzSpotlightProps> = (args) => {
  return <BzSpotlight {...args} />;
};

Default.args = {
  title: '重要重要',
  children: '这段文本很重要',
  visible: true,
};

export const InDescription: Story<BzSpotlightProps> = (args) => {
  return (
    <BzDescriptions>
      <BzDescriptions.Item label="基本薪资">35元/时</BzDescriptions.Item>
      <BzDescriptions.Item label="综合薪资">
        <BzSpotlight {...args} />
      </BzDescriptions.Item>
    </BzDescriptions>
  );
};

InDescription.args = {
  title: '不符合',
  visible: true,
  children: '4000-5000元/月',
};
