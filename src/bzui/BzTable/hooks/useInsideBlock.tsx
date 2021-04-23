import React from 'react';
import styles from '../index.module.scss';
import { BzTableProps } from '../interfaces';
import { ExpandableConfig } from 'antd/es/table/interface';

// 表格内嵌区块实现 - 基于 antd expandable
export function useInsideBlock<RecordType>({
  dataSource,
  rowKey,
  expandable,
  insideBlock,
  insideBlockOptions,
  expandIconColumnIndex,
}: BzTableProps<RecordType>) {
  let expandableFinal: ExpandableConfig<RecordType> | undefined;
  if (expandable === undefined && insideBlock !== undefined) {
    expandableFinal = {
      ...insideBlockOptions,
      expandedRowRender: (record: RecordType) => (
        <div className={styles.insideBlock}>{insideBlock(record)}</div>
      ),
    };
    // 此处根据 rowKey dataSource 设置 expandedRowKeys
    if (!insideBlockOptions?.expandedRowKeys && typeof rowKey === 'string')
      expandableFinal.expandedRowKeys = (dataSource || []).map(
        (item: any) => item[rowKey]
      );
  } else {
    expandableFinal = expandable;
  }
  const expandIconColumnIndexFinal =
    expandIconColumnIndex === undefined && insideBlock !== undefined
      ? -1
      : expandIconColumnIndex;
  return {
    expandableFinal,
    expandIconColumnIndexFinal,
  };
}
