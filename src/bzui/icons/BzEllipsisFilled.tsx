import React from 'react';
import Icon from '@ant-design/icons';
import { BzIconsProps } from './interfaces';

const EllipsisSvg = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1748"
    width="24"
    height="24"
  >
    <path
      d="M213.333333 426.666667a85.333333 85.333333 0 1 1 0 170.666666 85.333333 85.333333 0 0 1 0-170.666666z m298.666667 0a85.333333 85.333333 0 1 1 0 170.666666 85.333333 85.333333 0 0 1 0-170.666666z m298.666667 0a85.333333 85.333333 0 1 1 0 170.666666 85.333333 85.333333 0 0 1 0-170.666666z"
      p-id="1749"
    ></path>
  </svg>
);

export const BzEllipsisFilled = (props: BzIconsProps) => (
  <Icon component={EllipsisSvg} {...props} />
);
