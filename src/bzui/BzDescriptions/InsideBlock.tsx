// 内嵌区块(内部组件禁止直接引用)
import React, { useCallback, useRef } from 'react';
import classnames from 'classnames';
import styles from './InsideBlock.module.scss';
import { Button, message } from 'antd';
import { copyToClipboard } from '../utils/copyToClipboard';
import { BzInsideBlockProps } from './interfaces';

export function BzInsideBlock(props: BzInsideBlockProps) {
  const { className, title, extra, copyable, children, ...otherProps } = props;
  const classNames = classnames(className, styles.content, {
    [styles.copyableContent]: copyable,
  });
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onCopy = useCallback(() => {
    let copyTextFinal = '';
    if (titleRef.current && contentRef.current) {
      copyTextFinal =
        titleRef.current.innerText + '\r\n' + contentRef.current.innerText;
    }
    copyToClipboard(copyTextFinal);
    message.success('复制成功');
  }, [children]);

  return (
    <div className={styles.container}>
      {(title || extra || copyable) && (
        <div className={styles.titleContainer}>
          <div className={styles.title} ref={titleRef}>
            {title}
          </div>
          <div className={styles.extra}>
            {extra}
            {copyable && (
              <Button size="small" type="primary" onClick={onCopy}>
                全部复制
              </Button>
            )}
          </div>
        </div>
      )}
      <div className={classNames} {...otherProps} ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
