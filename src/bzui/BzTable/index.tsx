import React, { ReactNode } from "react";
import { Table as AntdTable } from "antd";
import classnames from "classnames";
import styles from "./index.module.scss";
import { ColumnCell, ColumnCellItem } from "./ColumnCell";
import { BzColumnAction, BzColumnActionItem } from "./ColumnAction";
import { covertReactChildrenToArray } from "../utils/covertReactChildrenToArray";
import { useRowClassName } from "./hooks/useRowClassName";
import {
  BzColumnProps,
  BzColumnsType,
  BzColumnType,
  BzTableProps,
} from "./interfaces";
import { useInsideBlock } from "./hooks/useInsideBlock";
import moment from "moment";

// 表格图标列的 column 常量
const TABLE_ICON_COLUMN = Object.freeze({
  className: styles.tableIconColumn,
});
// 表格操作列的 column 常量
const TABLE_ACTIONS_COLUMN = Object.freeze({
  title: "操作",
  dataIndex: "actions",
  align: "right",
});
// 表格操作列(带有额外)的 column 常量
const TABLE_ACTIONS_COLUMN_EXTRA = Object.freeze({
  ...TABLE_ACTIONS_COLUMN,
  className: styles.tableActionsExtra,
});

type DefaultRecordType = Record<string, any>;
// https://github.com/react-component/table/blob/9289a860ab03fa300411dbc5c24fdb811d57043c/src/hooks/useColumns.tsx#L16
export function convertChildrenToColumns<RecordType>(
  children: React.ReactNode
): BzColumnsType<RecordType> {
  return covertReactChildrenToArray(children)
    .filter((node) => React.isValidElement(node))
    .map(({ key, props }: React.ReactElement) => {
      const { children: nodeChildren, ...restProps } = props;
      const column = {
        key,
        ...restProps,
      };

      if (nodeChildren) {
        column.children = convertChildrenToColumns(nodeChildren);
      }

      return column;
    });
}

function Column<RecordType>(props: BzColumnProps<RecordType>) {
  return null;
}

export function BzTable<RecordType extends DefaultRecordType>(
  props: BzTableProps<RecordType>
) {
  const {
    // custom props
    insideBlock,
    insideBlockOptions,
    remindRow,
    // antd props
    dataSource,
    rowKey,
    columns,
    className,
    expandable,
    expandIconColumnIndex,
    rowClassName,
    onRow,
    children,
    ...otherProps
  } = props;

  // 预先处理表格 column 中的自定义属性
  const columnsFinal = React.useMemo<BzColumnsType<RecordType>>(() => {
    const result = columns || convertChildrenToColumns(children);
    return result
      .filter((item) => !item.hidden)
      .map((columnProps: BzColumnType<RecordType>) => {
        const {
          hasIcon,
          hasAction,
          valueEnum,
          valueType,
          ...otherColumnProps
        } = columnProps;
        const hasBeforeIconProps = hasIcon === true ? TABLE_ICON_COLUMN : {};
        const hasActionProps = hasAction === true ? TABLE_ACTIONS_COLUMN : {};
        const hasExtraActionProps =
          hasAction === "extra" ? TABLE_ACTIONS_COLUMN_EXTRA : {};
        const renderProps = valueEnum
          ? {
            render: (value: number) =>
              valueEnum.find((item) => item.value === value)?.label,
          }
          : valueType === "dateTime"
            ? {
              render: (value: string) =>
                moment(value).format("YYYY/MM/DD HH:mm"),
            }
            : {};

        return {
          ...hasBeforeIconProps,
          ...hasActionProps,
          ...hasExtraActionProps,
          ...renderProps,
          ...otherColumnProps,
        };
      });
  }, [columns, children]);

  const classNames = classnames(className, styles.container, {
    [styles.hasInsideBlock]: insideBlock !== undefined,
  });

  const { expandableFinal, expandIconColumnIndexFinal } = useInsideBlock({
    dataSource,
    rowKey,
    expandable,
    insideBlock,
    insideBlockOptions,
    expandIconColumnIndex,
  });

  const { onRowFinal, rowClassNameFinal } = useRowClassName({
    // 有 insideBlock 的情况下关闭,
    toggle: insideBlock === undefined,
    remindRow,
    rowKey,
    rowClassName,
    onRow,
  });

  return (
    <AntdTable
      rowKey={rowKey}
      dataSource={dataSource}
      columns={columnsFinal}
      className={classNames}
      expandable={expandableFinal}
      expandIconColumnIndex={expandIconColumnIndexFinal}
      rowClassName={rowClassNameFinal}
      onRow={onRowFinal}
      {...otherProps}
    />
  );
}

BzTable.Column = Column;
BzTable.ColumnGroup = AntdTable.ColumnGroup;

BzTable.ColumnCell = ColumnCell;
BzTable.ColumnCellItem = ColumnCellItem;

BzTable.ColumnAction = BzColumnAction;
BzTable.ColumnActionItem = BzColumnActionItem;
