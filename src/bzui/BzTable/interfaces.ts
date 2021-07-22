import { ExpandableConfig } from "antd/es/table/interface";
import { ColumnProps, ColumnType, TableProps } from "antd/lib/table";
import { ReactNode } from "react";

type DefaultRecordType = Record<string, any>;

export interface BzColumnType<RecordType> extends ColumnType<RecordType> {
  hasIcon?: true; // 有前置 Icon
  hasAction?: true | "extra"; // true 有操作列 extra 有【...】额外操作列
  hidden?: boolean; // 标识表格列的显示
  valueEnum?: Array<{ label: string; value: number }>;
  valueType?: "date" | "dateTime" | "digit";
}
export interface BzColumnProps<RecordType> extends ColumnProps<RecordType> {
  hasIcon?: true; // 有前置 Icon
  hasAction?: true | "extra"; // true 有操作列 extra 有【...】额外操作列
  hidden?: boolean; // 标识表格列的显示
}
export interface BzColumnGroupType<RecordType>
  extends Omit<BzColumnType<RecordType>, "dataIndex"> {
  children: BzColumnsType<RecordType>;
}
export interface BzColumnProps<RecordType> extends BzColumnType<RecordType> {
  children?: null;
}
export declare type BzColumnsType<RecordType = unknown> = BzColumnType<
  RecordType
>[];
export interface BzTableProps<RecordType extends DefaultRecordType>
  extends TableProps<RecordType> {
  insideBlock?: (record: RecordType) => ReactNode;
  // insideBlockOptions 同 antd expandable 配合 insideBlock 使用，优先级低于 insideBlock 内置属性实现
  insideBlockOptions?: ExpandableConfig<RecordType>;
  columns?: BzColumnsType<RecordType>;
  remindRow?: (record: RecordType) => boolean | string; // 着重提醒某行数据
}
