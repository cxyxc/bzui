// 右侧Tabs(内部组件禁止直接引用)
import React, { ReactNode, useRef } from 'react';
import styles from './BodyRightTabs.module.scss';
import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import classnames from 'classnames';

interface Props extends TabsProps {
  children?: ReactNode;
}

export function BodyRightTabs(props: Props) {
  let { className, onTabClick: onTabClickInProps, ...otherProps } = props;
  className = classnames(className);

  // 实例化锚点
  const anchorElement = useRef<any>();
  const onTabClick = (
    activeKey: string,
    e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
  ) => {
    if (onTabClickInProps) onTabClickInProps(activeKey, e);
    if (anchorElement.current) anchorElement.current.scrollIntoView();
  };

  return (
    <>
      <div ref={anchorElement}></div>
      <Tabs
        id={styles.container}
        className={className}
        {...otherProps}
        onTabClick={onTabClick}
      >
        {props.children}
      </Tabs>
    </>
  );
}

BodyRightTabs.TabPane = Tabs.TabPane;
