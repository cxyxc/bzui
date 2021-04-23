import { CSSProperties, ReactNode } from 'react';

export interface BzStatusTagProps {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  type?: 'default' | 'text'; // text 文本模式无背景色和边距
  status?: 'success' | 'error' | 'default' | 'processing' | 'warning';
  color?: string; // 自定义小圆点的颜色
  text?: string;
  childStatus?: 'primary' | 'default'; // 子状态
  childText?: string;
  description?: string; // 状态详情文案
  extra?: ReactNode; // 改变当前状态的操作或其他扩展
}

export interface BzStatusTagSwitchOption extends BzStatusTagProps {
  value: number | string;
}

export type BzStatusTagSwitchOptions = Array<BzStatusTagSwitchOption>;

export interface BzStatusTagSwitchProps {
  value?: number | string;
  options: BzStatusTagSwitchOptions;
  tagType?: 'default' | 'text'; // text 文本模式
}
