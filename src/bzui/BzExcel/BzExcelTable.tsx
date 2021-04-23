// 可单独使用的与 BzExcel API 一致的表格，一般用于查看导入的历史记录
import Table, { TableProps } from "antd/lib/table";
import React from "react";
import { ExcelColumnsType } from "./interfaces";
import useTableColumns from "./useTableColumns";

interface Props<RecordType> extends TableProps<RecordType> {
  columns: ExcelColumnsType<RecordType>;
}

export function BzExcelTable<RecordType>(props: Props<RecordType>) {
  const { columns, ...others } = props;
  const { tableColumns } = useTableColumns<RecordType>({ columns });

  return (
    // @ts-ignore
    <Table columns={tableColumns} {...others} />
  );
}
