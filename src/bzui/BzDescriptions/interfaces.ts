import { DescriptionsProps } from 'antd/lib/descriptions';
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item';
import { CSSProperties, ReactElement, ReactNode } from 'react';

export interface BzDescriptionsItemProps extends DescriptionsItemProps {
  hasBlock?: boolean; // 包含了 InsideBlock
  hasSubBlock?: boolean; // 包含了带有根据 label 缩进的子级 InsideBlock
  name?: string; // 暂用于配合 BzDescriptions / Provider 的 itemRender 标识字段
}

export type BzDescriptionsItemRender = (
  item: ReactElement,
  itemProps: BzDescriptionsItemProps
) => ReactElement;

export interface BzDescriptionsProps extends DescriptionsProps {
  column?: number; // 同 antd
  labelStyle?: CSSProperties; // 同 antd
  contentStyle?: CSSProperties; // 同 antd
  // item 自定义渲染器，将影响当前 Provider 下所有 DescriptionsItem 的渲染方式
  // 场景较少轻易不要使用
  itemRender?: BzDescriptionsItemRender;
  children?: ReactNode;
}
export interface BzDescriptionsProviderProps extends BzDescriptionsProps {}
export interface BzInsideBlockProps {
  title?: ReactNode;
  copyable?: boolean;
  extra?: ReactNode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
