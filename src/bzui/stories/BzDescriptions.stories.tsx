import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BzDescriptions, BzSpotlight } from '@bzui/index';
import {
  BzDescriptionsProps,
  BzInsideBlockProps,
} from '@bzui/BzDescriptions/interfaces';
import { Divider } from 'antd';

export default {
  title: '详情/BzDescriptions',
  component: BzDescriptions,
  argTypes: {},
} as Meta;

export const Default: Story<BzDescriptionsProps> = (props) => (
  <BzDescriptions {...props}>
    <BzDescriptions.Item label="招聘人数">15人</BzDescriptions.Item>
    <BzDescriptions.Item label="报名人数">31人</BzDescriptions.Item>
    <BzDescriptions.Item label="合作模式">
      BPO（业务流程外包）
    </BzDescriptions.Item>
    <BzDescriptions.Item label="负责客成">马景涛</BzDescriptions.Item>
    <BzDescriptions.Item label="岗位ID">2828980989809</BzDescriptions.Item>
  </BzDescriptions>
);
Default.args = {};

export const LabelRightAndSubBlock: Story<BzDescriptionsProps> = (args) => (
  <BzDescriptions {...args}>
    <BzDescriptions.Item label="基本薪资">35元/时</BzDescriptions.Item>
    <BzDescriptions.Item label="阶梯薪资">
      超出部分按照新的薪资标准计算
    </BzDescriptions.Item>
    <BzDescriptions.Item hasSubBlock>
      <BzDescriptions.InsideBlock>
        <BzDescriptions
          labelStyle={{
            width: 84,
            textAlign: 'right',
          }}
        >
          <BzDescriptions.Item label="阶梯1">
            每月做满20天，薪资为200元/日
          </BzDescriptions.Item>
          <BzDescriptions.Item label="阶梯阶梯2">
            每月做满25天，薪资为300元/日
          </BzDescriptions.Item>
        </BzDescriptions>
      </BzDescriptions.InsideBlock>
    </BzDescriptions.Item>
    <BzDescriptions.Item label="节假日薪资">2倍薪资</BzDescriptions.Item>
    <BzDescriptions.Item label="加班薪资">20元/时</BzDescriptions.Item>
    <BzDescriptions.Item label="全勤奖">200元/月</BzDescriptions.Item>
    <BzDescriptions.Item label="综合薪资">4000-5000元/月</BzDescriptions.Item>
    <BzDescriptions.Item label="提成">
      这是一段自定义提成内容，字数可以很长很长最长200个字符这是一段自定义提成内容，字数可以很长很长最长最长200个字符
    </BzDescriptions.Item>
  </BzDescriptions>
);
LabelRightAndSubBlock.args = {
  title: '薪资说明',
  labelStyle: {
    width: 84,
    textAlign: 'right',
  },
};
LabelRightAndSubBlock.parameters = {
  docs: {
    source: {
      code: `
<BzDescriptions {...args}>
<BzDescriptions.Item label="基本薪资">35元/时</BzDescriptions.Item>
<BzDescriptions.Item label="阶梯薪资">
  超出部分按照新的薪资标准计算
</BzDescriptions.Item>
<BzDescriptions.Item hasSubBlock>
  <BzDescriptions.InsideBlock>
    <BzDescriptions>
      <BzDescriptions.Item label="阶梯1">
        每月做满20天，薪资为200元/日
      </BzDescriptions.Item>
      <BzDescriptions.Item label="阶梯阶梯2">
        每月做满25天，薪资为300元/日
      </BzDescriptions.Item>
    </BzDescriptions>
  </BzDescriptions.InsideBlock>
</BzDescriptions.Item>
<BzDescriptions.Item label="节假日薪资">2倍薪资</BzDescriptions.Item>
<BzDescriptions.Item label="加班薪资">20元/时</BzDescriptions.Item>
<BzDescriptions.Item label="全勤奖">200元/月</BzDescriptions.Item>
<BzDescriptions.Item label="综合薪资">4000-5000元/月</BzDescriptions.Item>
<BzDescriptions.Item label="提成">
  这是一段自定义提成内容，字数可以很长很长最长200个字符这是一段自定义提成内容，字数可以很长很长最长最长200个字符
</BzDescriptions.Item>
</BzDescriptions>
`,
    },
  },
};

const copyableText = `时间：2020-12-03 星期四 下午02:00~下午04:00
地址：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
面试的时候要表现自己稳定性、能长期干，说话声音要大一些，面试和试工积极主动、眼里有活一般都没问题。提前准备一个自我介绍，比如姓名、年龄、哪里人、之前做过什么等，主要是要大声、积极。~
`;

export const BlockCopyable: Story<BzInsideBlockProps> = (props) => (
  <BzDescriptions title="面试要求及面试辅导">
    <BzDescriptions.Item hasBlock>
      <BzDescriptions.InsideBlock {...props}>
        {copyableText}
      </BzDescriptions.InsideBlock>
    </BzDescriptions.Item>
    <BzDescriptions.Item hasBlock>
      <BzDescriptions.InsideBlock {...props}>
        {copyableText}
      </BzDescriptions.InsideBlock>
    </BzDescriptions.Item>
  </BzDescriptions>
);
BlockCopyable.args = {
  title: '面试要求',
  copyable: true,
};

export const ManyDescriptions: Story<BzDescriptionsProps> = (props) => (
  <BzDescriptions.Provider {...props}>
    <BzDescriptions title="基本信息">
      <BzDescriptions.Item label="招聘人数">15人</BzDescriptions.Item>
      <BzDescriptions.Item label="报名人数">31人</BzDescriptions.Item>
      <BzDescriptions.Item label="合作模式">
        BPO（业务流程外包）
      </BzDescriptions.Item>
    </BzDescriptions>

    <Divider />

    <BzDescriptions title="其他信息">
      <BzDescriptions.Item label="负责客成">马景涛</BzDescriptions.Item>
      <BzDescriptions.Item label="岗位ID">2828980989809</BzDescriptions.Item>
    </BzDescriptions>
  </BzDescriptions.Provider>
);
ManyDescriptions.args = {
  labelStyle: { width: 70, textAlign: 'right' },
};

export const ManyDescriptionsCustomRender: Story<BzDescriptionsProps> = (
  props
) => (
  <BzDescriptions.Provider
    {...props}
    itemRender={(item, itemProps) => {
      if (itemProps.name === 'a')
        return <BzSpotlight title="人数人数">{item}</BzSpotlight>;
      return item;
    }}
  >
    <BzDescriptions title="基本信息">
      <BzDescriptions.Item name="a" label="招聘人数">
        15人
      </BzDescriptions.Item>
      <BzDescriptions.Item label="报名人数">31人</BzDescriptions.Item>
      <BzDescriptions.Item label="合作模式">
        BPO（业务流程外包）
      </BzDescriptions.Item>
    </BzDescriptions>

    <Divider />

    <BzDescriptions title="其他信息">
      <BzDescriptions.Item label="负责客成">马景涛</BzDescriptions.Item>
      <BzDescriptions.Item label="岗位ID">2828980989809</BzDescriptions.Item>
    </BzDescriptions>
  </BzDescriptions.Provider>
);
ManyDescriptionsCustomRender.args = {
  labelStyle: { width: 70, textAlign: 'right' },
};
ManyDescriptionsCustomRender.parameters = {
  docs: {
    source: {
      code: `
<BzDescriptions.Provider
  {...props}
  itemRender={(item, itemProps) => {
    if (itemProps.name === 'a')
      return <BzSpotlight title="人数人数">{item}</BzSpotlight>;
    return item;
  }}
>
  <BzDescriptions title="基本信息">
    <BzDescriptions.Item name="a" label="招聘人数">
      15人
    </BzDescriptions.Item>
    <BzDescriptions.Item label="报名人数">31人</BzDescriptions.Item>
    <BzDescriptions.Item label="合作模式">
      BPO（业务流程外包）
    </BzDescriptions.Item>
  </BzDescriptions>

  <Divider />

  <BzDescriptions title="其他信息">
    <BzDescriptions.Item label="负责客成">马景涛</BzDescriptions.Item>
    <BzDescriptions.Item label="岗位ID">2828980989809</BzDescriptions.Item>
  </BzDescriptions>
</BzDescriptions.Provider>
`,
    },
  },
};
