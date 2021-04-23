import React from 'react';
import { Tooltip } from 'antd';
import styles from './index.module.scss';
import classnames from 'classnames';
import { BzBellFilled } from '@bzui/icons';
import { BzStatusTagProps, BzStatusTagSwitchProps } from './interfaces';

BzStatusTag.defaultProps = {
  type: 'default',
  status: 'default',
  childStatus: 'default',
};
export function BzStatusTag(props: BzStatusTagProps) {
  const {
    type,
    status,
    childStatus,
    text,
    childText,
    description,
    extra,
    className,
    style,
  } = props;

  const containerClassNames = classnames(className, {
    [styles.defaultContainer]: type === 'default',
    [styles.textContainer]: type === 'text',
  });

  const statusTagClassNames = classnames(styles.tagContainer, {
    [styles.success]: status === 'success',
    [styles.error]: status === 'error',
    [styles.default]: status === 'default',
    [styles.processing]: status === 'processing',
    [styles.warning]: status === 'warning',
  });
  const childrenTextClassNames = classnames(styles.childrenContainer, {
    [styles.childrenTextPrimary]: childStatus === 'primary',
    [styles.childrenTextDefault]: childStatus === 'default',
  });

  return (
    <div className={containerClassNames} style={style}>
      <div className={statusTagClassNames}>
        <span className={styles.dot}></span>
        <span>{text || props.children}</span>
      </div>
      {childText && <span className={childrenTextClassNames}>{childText}</span>}
      {description && (
        <Tooltip title={description}>
          <span className={styles.childrenContainer}>
            <BzBellFilled />
          </span>
        </Tooltip>
      )}
      {extra && <span className={styles.childrenContainer}>{extra}</span>}
    </div>
  );
}

StatusTagSwitch.defaultProps = {
  tagType: 'default',
};
function StatusTagSwitch(props: BzStatusTagSwitchProps) {
  const { value, options, tagType } = props;
  const tagProps = options.find((item) => item.value === value);
  const { text, type, ...otherTagProps } = tagProps || {};
  const textFinal = text || '';
  const typeFinal = type || tagType;

  return <BzStatusTag text={textFinal} type={typeFinal} {...otherTagProps} />;
}

BzStatusTag.Switch = StatusTagSwitch;
