import classnames from 'classnames';
import { useCallback, useState } from 'react';
import styles from '../index.module.scss';
import { BzTableProps } from '../interfaces';

type RowClassName<RecordType> = (
  record: RecordType,
  index: number,
  indent: number
) => string;
type GetComponentProps<DataType> = (
  data: DataType,
  index?: number
) => React.HTMLAttributes<HTMLElement>;
interface Options<RecordType> extends BzTableProps<RecordType> {
  toggle?: boolean; // 开关
}

// 表格的 rowClassName 特殊处理
// 需要借助 antd Table 的 onRow API
export function useRowClassName<RecordType>({
  toggle,
  rowKey,
  remindRow,
  rowClassName,
  onRow,
}: Options<RecordType>) {
  const [lastClickId, setLastClickId] = useState<number | string | null>(null);
  const rowClassNameFinal: RowClassName<RecordType> = useCallback(
    (record, index, indent) => {
      const prospRowClassName =
        typeof rowClassName === 'function'
          ? rowClassName(record, index, indent)
          : rowClassName;
      const key = typeof rowKey === 'function' ? rowKey(record, index) : rowKey;
      const classNames = classnames(prospRowClassName, {
        [styles.lastClickRowClassName]:
          key && (record as any)?.[key] === lastClickId,
        [styles.remindRowClassName]:
          typeof remindRow === 'function' && remindRow(record),
      });
      return classNames;
    },
    [rowClassName, rowKey, lastClickId]
  );
  const onRowFinal: GetComponentProps<RecordType> = useCallback(
    (record) => {
      const { onClick, ...otherOnRow } = onRow
        ? onRow(record)
        : {
            onClick: () => {},
          };
      const key: any = typeof rowKey === 'function' ? rowKey(record) : rowKey;
      return {
        ...otherOnRow,
        onClick: (e) => {
          if (onClick) onClick(e);
          setLastClickId((record as any)?.[key]);
        },
      };
    },
    [onRow, rowKey]
  );

  if (!toggle) {
    // 开关关闭时，本 hooks 逻辑关闭
    return {
      onRowFinal: onRow,
      rowClassNameFinal: rowClassName,
    };
  }

  return {
    onRowFinal,
    rowClassNameFinal,
  };
}
