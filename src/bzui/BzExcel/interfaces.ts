import { ReactNode } from "react";
import { ColumnType } from "antd/lib/table";
import { ButtonProps } from "antd/lib/button";
import { TextAreaProps } from "antd/lib/input";

interface IValueEnum {
  [key: string]: {
    text: ReactNode;
    // 兼容 Antd Pro 实际暂无用处
    status?: "Success" | "Error" | "Processing" | "Warning" | "Default";
  };
}

export type ExcelColumnsType<RecordType> = Array<ExcelColumnType<RecordType>>;

export interface ExcelColumnType<RecordType> extends ColumnType<RecordType> {
  required?: boolean;
  validate?: (
    value: any,
    record: RecordType
  ) => {
    status?: "success" | "warning" | "error";
    message?: string;
  };
  valueEnum?: IValueEnum;
  valueType?:
    | "money"
    | "option"
    | "date"
    | "dateTime"
    | "time"
    | "text"
    | "index"
    | "indexBorder";
}

export interface BzExcelExportProps<RecordType> {
  template?: boolean;
  children?: ReactNode;
  buttonProps?: ButtonProps;
  columns: ExcelColumnsType<RecordType>;
  dataSource?: Array<RecordType>;
  excelName?: string;
}

export interface BzExcelTextAreaProps<RecordType = any> {
  value?: Array<RecordType>;
  onChange?: (value: Array<RecordType>) => void;
  rowKey: string;
  columns: ExcelColumnsType<RecordType>;
  textAreaProps?: TextAreaProps;
}
