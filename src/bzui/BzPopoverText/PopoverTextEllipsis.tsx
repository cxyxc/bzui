/**
 * 超长省略并带有气泡框的文本
 * 借助 Antd Paragraph onEllipsis 实现
 */
import React, { CSSProperties, useState } from 'react';
import { Popover, Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { PopoverProps } from 'antd/lib/popover';
import classnames from 'classnames';
import indexStyle from './index.module.scss';
import styles from './PopoverTextEllipsis.module.scss';
const { Paragraph } = Typography;

export interface BzPopoverTextEllipsisProps extends ParagraphProps {
  popoverProps?: PopoverProps;
  forceRenderPopover?: boolean; // 不考虑内容是否超长，强渲染 Popover
  ellipsisExt?: any;
  className?: string;
  style?: CSSProperties;
}

export function BzPopoverTextEllipsis(props: BzPopoverTextEllipsisProps) {
  const [ellipsisFlag, setEllipsisFlag] = useState(false);

  const {
    popoverProps,
    forceRenderPopover,
    ellipsisExt,
    className,
    ...othersProps
  } = props;

  const ellipsisExtOptions =
    typeof ellipsisExt === 'object' ? ellipsisExt : null;

  const classNames = classnames(className, {
    [styles.container]: true,
    [styles.shouldHover]: ellipsisFlag,
  });
  //更改截取行数 ellipsisExt: { rows: 2 },
  const text = (
    <Paragraph
      title={''}
      ellipsis={{
        suffix: ellipsisFlag ? ellipsisExt?.suffix : '',
        rows: 1,
        expandable: false,
        onEllipsis: (ellipsis) => {
          if (ellipsisFlag !== ellipsis) setEllipsisFlag(ellipsis);
        },
        ...ellipsisExtOptions,
      }}
      className={classNames}
      {...othersProps}
    >
      {props.children}
    </Paragraph>
  );

  const {
    title = '详细信息',
    content = props.children,
    placement = 'topLeft',
    overlayClassName,
    ...otherPopoverProps
  } = popoverProps || {};

  const popoverClassNames = classnames(overlayClassName, {
    [indexStyle.popoverContainer]: true,
  });

  if (ellipsisFlag || forceRenderPopover)
    return (
      <Popover
        title={title}
        content={content}
        placement={placement}
        overlayClassName={popoverClassNames}
        {...otherPopoverProps}
      >
        {text}
      </Popover>
    );
  return text;
}
