import React, { CSSProperties, ReactNode, useMemo } from 'react';
import { Tooltip } from 'antd';
import { TooltipProps } from 'antd/es/tooltip';
import useSize from '../hooks/useSize';
import styles from './index.module.scss';

export interface BzSpotlightProps {
  visible?: boolean; // 是否展示
  title?: ReactNode; // 提示文字
  children?: ReactNode;
  toolTipProps?: TooltipProps;
}

const OFFSET_WIDTH_SIZE = 6; // 横向偏移距离

BzSpotlight.defaultProps = {
  visible: true,
};

export function BzSpotlight(props: BzSpotlightProps) {
  const [sized, { width, height }] = useSize(
    () => <div>{props.children}</div>,
    { width: 0, height: 0 }
  );

  const style = useMemo<CSSProperties>(() => {
    return {
      width: width + OFFSET_WIDTH_SIZE * 2,
      height: height,
      top: 0,
      left: -OFFSET_WIDTH_SIZE,
    };
  }, [width, height]);

  // 如不展示该组件，直接返回子元素
  if (!props.visible) return <>{props.children}</>;

  const {
    title: toolTipTitle,
    visible: toolTipVisible,
    placement,
    color,
    ...otherToolTipProps
  } = props.toolTipProps || {};
  const titleFinal = props.title || toolTipTitle;
  const toolTipVisibleFinal =
    toolTipVisible || (width > 0 && height > 0 && Boolean(titleFinal));
  const placementFinal = placement || 'right';
  const colorFinal: any = color || '#FF4D4F';

  return (
    <div className={styles.container}>
      <Tooltip
        title={titleFinal}
        visible={toolTipVisibleFinal}
        placement={placementFinal}
        color={colorFinal}
        overlayClassName={styles.tooltip}
        autoAdjustOverflow={false}
        {...otherToolTipProps}
      >
        <div className={styles.spotlight} style={style}></div>
      </Tooltip>
      {sized}
    </div>
  );
}
