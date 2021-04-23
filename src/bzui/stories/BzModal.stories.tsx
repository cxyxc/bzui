import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BzModal } from '@bzui/index';
import { BzModalProps } from '@bzui/BzModal';
import useToggle from '@bzui/hooks/useToggle';
import { Button } from 'antd';

export default {
  title: '反馈/BzModal',
  component: BzModal,
  argTypes: {},
} as Meta;

const styles = {
  width: '100%',
  height: 1300,
  background: '#f6f6f6',
};

export const Default: Story<BzModalProps> = (args) => {
  const [visible, toggleVisible] = useToggle(false);

  return (
    <>
      <Button type="primary" onClick={toggleVisible}>
        打开对话框
      </Button>
      <BzModal
        {...args}
        visible={visible}
        footer={
          <Button type="primary" onClick={toggleVisible}>
            我知道了
          </Button>
        }
        onCancel={toggleVisible}
      >
        <div style={styles}>
          <div>
            内容很多，有1300px高!!! 由于日期组件的特殊实现机制，暂时关闭
          </div>
        </div>
      </BzModal>
    </>
  );
};

Default.args = {
  title: '一个垂直居中的对话框',
};

export const Simple: Story<BzModalProps> = (args) => {
  const [visible, toggleVisible] = useToggle(false);

  return (
    <>
      <Button type="primary" onClick={toggleVisible}>
        打开对话框
      </Button>
      <BzModal
        {...args}
        visible={visible}
        footer={
          <Button type="primary" onClick={toggleVisible}>
            我知道了
          </Button>
        }
        onCancel={toggleVisible}
      >
        <div>
          我只有一行文本，起到提醒确认的作用，我只有一行文本，起到提醒确认的作用
        </div>
      </BzModal>
    </>
  );
};

Simple.args = {
  title: '一个简单的对话框',
  type: 'simple',
};
