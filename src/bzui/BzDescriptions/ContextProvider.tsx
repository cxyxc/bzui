import React from "react";
import { DescriptionsContext } from "./contexts";
import { BzDescriptionsProviderProps } from "./interfaces";
import styles from "./ContextProvider.module.scss";

// 用于控制多个 Descriptions 其 props 会以上下文的形式传递
export const BzDescriptionsContextProvider: React.FC<BzDescriptionsProviderProps> = (
  props
) => {
  const {
    children,
    itemRender,
    column,
    labelStyle,
    contentStyle,
    noDefaultStyle,
    wrapperStyle,
  } = props;
  const contextValue = React.useMemo(() => {
    return {
      itemRender,
      column,
      labelStyle,
      contentStyle,
    };
  }, [itemRender, column, labelStyle, contentStyle]);

  return (
    <DescriptionsContext.Provider value={contextValue}>
      <div
        className={noDefaultStyle ? null : styles.container}
        style={wrapperStyle}
      >
        {children}
      </div>
    </DescriptionsContext.Provider>
  );
};
