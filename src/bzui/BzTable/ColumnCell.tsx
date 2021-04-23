/**
 * 表格单元格布局
 */
import React, { CSSProperties, HTMLProps, ReactNode } from 'react';
import classnames from 'classnames';
import styles from './ColumnCell.module.scss';

interface ColumnCellProps {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  direction?: 'column' | 'row';
  icon?: ReactNode;
}

ColumnCell.defaultProps = {
  direction: 'column',
};

export function ColumnCell(props: ColumnCellProps) {
  const { style, className, children, direction, icon } = props;

  const classNames = classnames(className, {
    [styles.columnContainer]: direction === 'column',
    [styles.rowContainer]: direction === 'row',
  });

  const iconClassNames = classnames(className, {
    [styles.icon]: true,
    [styles.iconAbsolute]: true,
  });

  return (
    <div className={styles.container}>
      {icon && <div className={iconClassNames}>{icon}</div>}
      <div className={classNames} style={style}>
        {children}
      </div>
    </div>
  );
}

interface ColumnCellItemProps
  extends HTMLProps<HTMLDivElement & HTMLAnchorElement> {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  type?: 'link' | 'default';
  textSize?: 'big' | 'default';
}

ColumnCellItem.defaultProps = {
  type: 'default',
  textSize: 'default',
};

export function ColumnCellItem(props: ColumnCellItemProps) {
  const { className, children, type, textSize, ...otherProps } = props;

  const classNames = classnames(className, styles.item, {
    [styles.defaultText]: textSize === 'default',
    [styles.bigText]: textSize === 'big',
  });

  const Container = type === 'link' ? 'a' : 'div';

  return (
    <Container className={classNames} {...otherProps}>
      {children}
    </Container>
  );
}
