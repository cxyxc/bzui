import React from 'react';
import Icon from '@ant-design/icons';
import { BzIconsProps } from './interfaces';

interface curClockProps extends BzIconsProps {
  w?: string;
  h?: string;
  viewBox?: string;
}

const BzClockIcon: React.FC<curClockProps> = (props) => {
  const { w, h, viewBox } = props;

  const ClockSvg = () => (
    <svg
      className="icon"
      viewBox={viewBox ? viewBox : '5 -7 16 32'}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1115"
      width={w ? w : '16'}
      height={h ? h : '16'}
    >
      <path
        d="M11.9800997,17.2000395 L11.9800997,17.1999977 C11.9780825,17.9485181 11.6718477,18.664058 11.1317181,19.1822656 L11.131718,19.1822657 C9.98578311,20.2723002 8.18640211,20.2723002 7.04046328,19.1822656 L7.04046307,19.1822654 C6.50231792,18.6659894 6.19624529,17.9537464 6.1920656,17.2080053 L11.9800997,17.2080053 L11.9800997,17.2000395 Z M9.0867215,0 C8.02222417,0 7.1551509,0.816381809 7.1551509,1.82085173 L7.1551509,1.82085182 C7.15535633,1.92142401 7.16383327,2.02180909 7.18049604,2.12099084 C4.51258278,2.99873405 2.57433834,5.23978354 2.57433834,8.4239474 L2.57433834,10.8810987 C2.57433834,10.8810987 2.32355484,13.9358679 1.3831143,13.9678796 C0.822851927,13.9678796 0.391984198,14.3760715 0.391984198,14.8776385 L0.391984198,14.8776368 C0.404173431,15.3931999 0.832000335,15.8012649 1.34756344,15.7890754 C1.35140998,15.7889844 1.35525592,15.7888697 1.35910105,15.7887313 L16.8169901,15.7887313 L16.8169901,15.7887312 C17.3198052,15.8220858 17.754456,15.441514 17.7878096,14.938699 C17.8211641,14.435884 17.4405924,14.0012331 16.9377774,13.9678795 C16.897559,13.9652116 16.8572079,13.9652116 16.8169897,13.9678795 C15.8498714,13.9678795 15.6164278,10.8810986 15.6164278,10.8810986 L15.6164278,8.42394729 C15.6164278,5.23712717 13.8075819,2.99341362 10.9982583,2.11966261 L10.9982583,2.11966264 C11.0146317,2.02134046 11.0231072,1.92186554 11.0236035,1.82218964 C11.0196033,0.817719722 10.1538642,0 9.08669888,0 L9.0867215,0 Z"
        p-id="1115"
        fill="#FA6400"
      ></path>
    </svg>
  );

  return (
    <Icon
      component={ClockSvg}
      {...props}
      style={{ marginLeft: 5, marginRight: 0 }}
    />
  );
};

export default BzClockIcon;
