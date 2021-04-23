import React from 'react';
import Icon from '@ant-design/icons';
import { BzIconsProps } from './interfaces';

const DianpingSvg = () => (
  <svg
    className="icon"
    viewBox="0 0 1025 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1970"
    width="16"
    height="16"
    fill="#FF6633"
  >
    <path
      d="M1023.52 449.792c-0.832-19.04-1.664-38.112-2.496-57.12-3.84-24.192-2.432-48.864-6.72-72.128-2.016-12.864-4-25.792-5.984-38.656-7.04-32.224-13.856-62.752-24.96-90.528-20.576-51.52-52.32-94.88-96.544-122.752-94.752-59.68-235.68-68.992-390.72-68.576-15.456 0.256-30.944 0.48-46.4 0.736-9.472 0.352-18.944 0.672-28.448 1.024-6.72 0.32-13.472 0.64-20.224 0.992-18.208 1.408-36.448 2.816-54.624 4.256-9.888 1.184-19.808 2.304-29.696 3.488-22.176 4.128-44.128 6.464-64.864 11.712-95.648 24.32-151.648 60.192-195.872 136.16-21.984 37.728-31.232 84.16-41.92 133.472-2.24 16.64-4.48 33.248-6.72 49.888-1.568 19.776-3.168 39.584-4.736 59.36-0.256 6.72-0.48 13.472-0.768 20.224-0.576 18.208-1.152 36.448-1.728 54.624l0 55.616c0.32 17.12 0.672 34.272 1.024 51.36 0.384 11.904 0.832 23.808 1.248 35.68 0.48 8.064 1.024 16.128 1.504 24.192 3.456 21.664 2.624 43.744 6.464 64.64 5.92 31.936 9.824 62.816 18.72 91.296 24.096 77.344 60.384 129.088 124.256 166.624 28.512 16.768 62.624 27.52 98.56 36.672 13.312 2.656 26.592 5.312 39.904 8 16.64 2.24 33.28 4.48 49.888 6.72 21.28 1.664 42.592 3.328 63.872 4.992 7.232 0.256 14.496 0.48 21.696 0.736 15.328 0.416 30.624 0.832 45.92 1.248 7.648 0.096 15.296 0.192 22.944 0.256l31.904 0c20.8-0.32 41.6-0.64 62.4-1.024 5.984-0.256 12-0.48 17.952-0.736 17.792-1.152 35.616-2.336 53.408-3.52 15.232-1.664 30.432-3.328 45.664-4.992 34.208-6.336 66.848-10.912 97.056-20.448 65.536-20.672 114.208-53.728 149.696-104.288 27.328-38.88 41.376-88.288 53.408-142.688 2.592-16.864 5.184-33.76 7.712-50.624 1.856-20.096 3.648-40.256 5.504-60.384 0.32-7.232 0.672-14.464 1.024-21.696 0.64-16.448 1.312-32.928 2.016-49.408l0-13.248c0.096-7.648 0.16-15.296 0.256-22.976l0-54.88c-0.192-7.808-0.352-15.616-0.512-23.424zM359.04 261.696l0 0 3.744-0.992c9.376-34.624 36.032-63.552 73.184-73.504s74.656 1.792 100.128 27.072c12.64 12.512 22.496 28.16 27.424 46.592 14.88 55.552-18.112 112.672-73.664 127.552s-112.672-18.08-127.552-73.632c-4.96-18.4-4.192-36.864 0.448-54.016l-3.744 0.992zM793.504 716.736c-29.76-111.136-144-177.056-255.104-147.264s-177.056 144-147.264 255.072l-100.608 26.976c-39.936-148.96 34.816-301.632 170.176-364.288-114.72 5.28-221.728-69.536-252.672-185.024l80.48-21.568c23.84 88.896 115.2 141.664 204.064 117.824 88.896-23.84 141.664-115.2 117.824-204.096l80.48-21.568c30.944 115.52-24.288 233.792-126.304 286.592 148.544-13.408 289.6 81.44 329.504 230.368l-100.576 26.976z"
      p-id="1971"
    ></path>
  </svg>
);

export const BzDianpingFilled = (props: BzIconsProps) => (
  <Icon component={DianpingSvg} {...props} />
);