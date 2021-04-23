/**
 * 抽屉相关详情、表单UI
 */
import React, { ReactNode } from 'react';
import { Drawer } from 'antd';
import { DrawerProps } from 'antd/lib/drawer';
import classnames from 'classnames';
import styles from './index.module.scss';

import { BodyLeft } from './BodyLeft';
import { BodyRight } from './BodyRight';
import { BodyRightTabs } from './BodyRightTabs';

export interface BzDrawerProps extends DrawerProps {
  type?: 'default' | 'layout'; // layout 是布局模式，开启后才可以使用 BodyLeft / BodyRight 等内部组件
  width?: number | string;
  getContainer?: string | HTMLElement | (() => HTMLElement) | false;
  destroyOnClose?: boolean;
  children: ReactNode;
}

BzDrawer.defaultProps = {
  type: 'default',
  width: 1164,
  getContainer: false,
  destroyOnClose: true,
};

export function BzDrawer(props: BzDrawerProps) {
  const { type, className, ...otherProps } = props;
  const classNames = classnames(className, styles.container, {
    [styles.leftAndRightLayoutContainer]: type === 'layout',
  });

  return <Drawer className={classNames} {...otherProps} />;
}

BzDrawer.BodyLeft = BodyLeft;
BzDrawer.BodyRight = BodyRight;
BzDrawer.BodyRightTabs = BodyRightTabs;
