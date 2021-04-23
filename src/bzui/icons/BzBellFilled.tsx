import React from 'react';
import Icon from '@ant-design/icons';
import { BzIconsProps } from './interfaces';

const BellSvg = () => (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1113"
    width="16"
    height="16"
  >
    <path
      d="M635.968 800.064a128 128 0 0 1-247.936 0h247.936zM512 64a64 64 0 0 1 63.616 71.04A288 288 0 0 1 800 416V576l72.832 145.664a32 32 0 0 1-28.608 46.336H179.776a32 32 0 0 1-28.608-46.336L224 576V416a288.128 288.128 0 0 1 224.384-280.96L448 128a64 64 0 0 1 64-64z"
      p-id="1114"
      fill="#FAAD14"
    ></path>
  </svg>
);

export const BzBellFilled = (props: BzIconsProps) => (
  <Icon component={BellSvg} {...props} />
);
