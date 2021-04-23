import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BzPopoverText } from '@bzui/index';
import { BzPopoverTextProps } from '@bzui/BzPopoverText';
import { BzDescriptions } from '@bzui/BzDescriptions';

export default {
  title: '排版/BzPopoverText',
  component: BzPopoverText,
  argTypes: {},
} as Meta;

export const Default: Story<BzPopoverTextProps> = (args) => {
  return (
    <>
      <BzPopoverText
        popoverProps={{
          title: '时间',
          content: (
            <BzDescriptions>
              <BzDescriptions.Item label="预约上岗时间">
                2020/7/3
              </BzDescriptions.Item>
              <BzDescriptions.Item label="预约试工时间">
                2020/7/1
              </BzDescriptions.Item>
              <BzDescriptions.Item label="预约面试时间">
                2020/6/30
              </BzDescriptions.Item>
              <BzDescriptions.Item label="报名时间">
                2020/6/27 12:00
              </BzDescriptions.Item>
            </BzDescriptions>
          ),
        }}
      >
        <span>面试时间：2020/7/3 12:00</span>
      </BzPopoverText>
    </>
  );
};

Default.args = {};

export const PopoverTextEllipsis: Story<BzPopoverTextProps> = (args) => {
  return (
    <BzPopoverText.Ellipsis {...args}>
      超长文本超长文本超长文本
    </BzPopoverText.Ellipsis>
  );
};

PopoverTextEllipsis.args = {
  style: { width: 150 },
};
