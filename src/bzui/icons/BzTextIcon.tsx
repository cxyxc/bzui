import React from 'react';
import { BzTextIconProps } from './interfaces';
import styles from './index.module.scss';

export const BzTextIcon = (props: BzTextIconProps) => (
  <div className={styles.textIcon}>{props.text}</div>
);
