import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BzDrawer } from '@bzui/index';
import { BzDrawerProps } from '@bzui/BzDrawer';
import useToggle from '@bzui/hooks/useToggle';
import { Button } from 'antd';
const BodyLeft = BzDrawer.BodyLeft;
const BodyRight = BzDrawer.BodyRight;
const BodyRightTabs = BzDrawer.BodyRightTabs;
const TabPane = BodyRightTabs.TabPane;

export default {
  title: '反馈/BzDrawer',
  component: BzDrawer,
  argTypes: {},
} as Meta;

const styles = {
  width: '100%',
  height: 1300,
  background: '#ffffff',
};

export const LeftAndRight: Story<BzDrawerProps> = (args) => {
  const [visible, toggleVisible] = useToggle(false);

  return (
    <>
      <Button type="primary" onClick={toggleVisible}>
        打开抽屉
      </Button>
      <BzDrawer {...args} visible={visible} onClose={toggleVisible}>
        <BodyLeft>
          <div style={styles}>左侧区域</div>
        </BodyLeft>
        <BodyRight>
          <div style={styles}>右侧区域</div>
        </BodyRight>
      </BzDrawer>
    </>
  );
};

LeftAndRight.args = {
  title: '左右布局',
  type: 'layout',
};

export const WithTabs: Story<BzDrawerProps> = (args) => {
  const [visible, toggleVisible] = useToggle(false);

  return (
    <>
      <Button type="primary" onClick={toggleVisible}>
        打开抽屉
      </Button>
      <BzDrawer {...args} visible={visible} onClose={toggleVisible}>
        <BodyLeft>
          <div style={styles}>左侧区域</div>
        </BodyLeft>
        <BodyRightTabs>
          <TabPane tab="第一页" key="1">
            <div style={styles}>薪资福利</div>
          </TabPane>
          <TabPane tab="第二页" key="2">
            <div style={styles}>工作要求</div>
          </TabPane>
          <TabPane tab="第三页" key="3">
            <div style={styles}>面试/试工/上岗安排</div>
          </TabPane>
        </BodyRightTabs>
      </BzDrawer>
    </>
  );
};

WithTabs.args = {
  title: '右侧有标签页',
  type: 'layout',
};
