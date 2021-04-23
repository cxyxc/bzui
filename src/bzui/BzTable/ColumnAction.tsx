import React, { ReactNode, useState } from 'react';
import { Button, Popover, Space } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { covertReactChildrenToArray } from '../utils/covertReactChildrenToArray';
import styles from './ColumnAction.module.scss';
import { BzEllipsisFilled } from '../icons';

interface OptionsType extends ButtonProps {
  key?: string; // 唯一标识
  actionKey?: string; // ActionItem 对应的服务端提供的 key 为空时该按钮由前端控制
  visible?: boolean; // 一般为纯前端控制的按钮使用
  render?: () => ReactNode; // 自定义操作项 UI
  extra?: boolean; // 是否在额外区域
}

function convertChildrenToOptions(
  children: React.ReactNode
): Array<OptionsType> {
  return covertReactChildrenToArray(children)
    .filter((node) => React.isValidElement(node))
    .map(({ key, props }: React.ReactElement) => {
      const { children, ...restProps } = props;
      const option = {
        key,
        children,
        ...restProps,
      };
      return option;
    });
}

function useExtraVisible() {
  const [visible, setVisible] = useState(false);
  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  return {
    extraVisible: visible,
    hideExtra: hide,
    handleExtraVisibleChange: handleVisibleChange,
  };
}

export interface BzColumnActionProps extends React.HTMLProps<HTMLDivElement> {
  actionKeys?: Array<string>;
  options?: Array<OptionsType>;
}

export function BzColumnAction(props: BzColumnActionProps) {
  // extra 区域气泡框显示控制
  const {
    extraVisible,
    hideExtra,
    handleExtraVisibleChange,
  } = useExtraVisible();

  const { actionKeys, options, children, ...otherProps } = props;

  const { defaultOptionsChildren, extraOptionsChildren } = React.useMemo(() => {
    let optionsFinal = options || convertChildrenToOptions(children);
    optionsFinal = optionsFinal.filter(
      (item) =>
        (item.actionKey && actionKeys?.includes(item.actionKey)) || item.visible
    );
    const defaultOptionsChildren = optionsFinal
      .filter((item) => !item.extra)
      .map((item, index) => {
        if (item.render) return <div key={index}>{item.render()}</div>;
        const { actionKey, extra, size = 'small', ...others } = item;
        return <Button {...others} size={size} key={index} />;
      });
    const extraOptionsChildren = optionsFinal
      .filter((item) => item.extra)
      .map((item, index) => {
        if (item.render) return <div key={index}>{item.render()}</div>;
        const { actionKey, extra, onClick, ...others } = item;
        const onClickFinal = (
          event: React.MouseEvent<HTMLElement, MouseEvent>
        ) => {
          if (onClick) onClick(event);
          hideExtra();
        };
        return (
          <div
            key={index}
            className={styles.extraItem}
            onClick={onClickFinal}
            {...others}
          />
        );
      });

    return {
      defaultOptionsChildren,
      extraOptionsChildren,
    };
  }, [options, children]);

  return (
    <div {...otherProps}>
      <Space>{defaultOptionsChildren}</Space>
      {extraOptionsChildren && extraOptionsChildren.length > 0 && (
        <div className={styles.extraContainer}>
          <Popover
            overlayClassName={styles.extraPopover}
            content={extraOptionsChildren}
            arrowPointAtCenter
            placement="bottom"
            trigger="hover"
            visible={extraVisible}
            onVisibleChange={handleExtraVisibleChange}
          >
            <BzEllipsisFilled />
          </Popover>
        </div>
      )}
    </div>
  );
}

export function BzColumnActionItem(props: OptionsType) {
  return null;
}
