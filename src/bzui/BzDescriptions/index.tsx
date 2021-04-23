/**
 * 描述文本封装
 */
import React, { cloneElement, useContext } from 'react';
import { Descriptions } from 'antd';
import classnames from 'classnames';
import styles from './index.module.scss';
import { BzInsideBlock } from './InsideBlock';
import { covertReactChildrenToArray } from '../utils/covertReactChildrenToArray';
import { BzDescriptionsItemProps, BzDescriptionsProps } from './interfaces';
import { BzDescriptionsContextProvider } from './ContextProvider';
import { DescriptionsContext } from './contexts';

function Item(props: BzDescriptionsItemProps) {
  return null;
}

export const BzDescriptions = (props: BzDescriptionsProps) => {
  const {
    className,
    column,
    itemRender,
    labelStyle: propsLabelStyle,
    contentStyle: propsContentStyle,
    children,
    ...otherProps
  } = props;

  const context = useContext(DescriptionsContext);
  const columnFinal = column || context?.column || 1; // 列数
  const itemRenderFinal = itemRender || context?.itemRender;
  const classNames = classnames(className, styles.container);

  // 操作子元素
  const labelStyleContext = propsLabelStyle || context?.labelStyle;
  const contentStyleContext = propsContentStyle || context?.contentStyle;
  const childrenFinal = covertReactChildrenToArray(children).map(
    (child, index) => {
      const { key, props } = child;
      const {
        labelStyle,
        contentStyle,
        children: childChildren,
        hasBlock,
        hasSubBlock,
        ...otherProps
      } = props || {};
      const hasBlockProps = hasBlock
        ? {
            className: styles.descriptionsBlockItem,
          }
        : {};
      const hasSubBlockProps = hasSubBlock
        ? {
            label: ' ',
            className: styles.descriptionsSubBlockItem,
          }
        : {};

      const childProps = {
        key: key || index,
        labelStyle: {
          ...labelStyleContext,
          ...labelStyle,
        },
        contentStyle: {
          ...contentStyleContext,
          ...contentStyle,
        },
        ...hasBlockProps,
        ...hasSubBlockProps,
        ...otherProps,
      };

      // 统一自定义渲染 - 场景较少轻易不要使用
      if (itemRenderFinal)
        childProps.children = itemRenderFinal(childChildren, childProps);
      else {
        childProps.children = childChildren;
      }

      return cloneElement(child, childProps);
    }
  );

  return (
    <Descriptions className={classNames} column={columnFinal} {...otherProps}>
      {childrenFinal}
    </Descriptions>
  );
};
BzDescriptions.defaultProps = {};

BzDescriptions.Item = Item;
BzDescriptions.InsideBlock = BzInsideBlock;
BzDescriptions.Provider = BzDescriptionsContextProvider;
