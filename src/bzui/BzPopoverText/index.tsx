/**
 * 带有气泡框的文本
 */
import React, { CSSProperties, ReactNode } from 'react';
import { Popover } from 'antd';
import { PopoverProps } from 'antd/lib/popover';
import classnames from 'classnames';
import styles from './index.module.scss';
import { BzPopoverTextEllipsis } from './PopoverTextEllipsis';

export interface BzPopoverTextProps {
  popoverProps?: PopoverProps;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function BzPopoverText(props: BzPopoverTextProps) {
  const { className, style, children, popoverProps } = props;
  const {
    overlayClassName,
    content,
    placement = 'topLeft',
    ...otherPopoverProps
  } = popoverProps || {};

  const spanClassNames = classnames(className, {
    [styles.spanContainer]: true,
  });

  const popoverClassNames = classnames(overlayClassName, {
    [styles.popoverContainer]: true,
  });

  return (
    <Popover
      overlayClassName={popoverClassNames}
      placement={placement}
      content={<div className={styles.popoverContent}>{content}</div>}
      {...otherPopoverProps}
    >
      <span className={spanClassNames} style={style}>
        {children}
      </span>
    </Popover>
  );
}

BzPopoverText.Ellipsis = BzPopoverTextEllipsis;
