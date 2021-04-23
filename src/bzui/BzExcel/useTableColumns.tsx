import { ColumnsType } from "antd/lib/table";
import { useMemo } from "react";
import { ExcelColumnsType } from "./interfaces";
import moment from "moment";

export default function useTableColumns<RecordType = any>({
  columns,
}: {
  columns: ExcelColumnsType<RecordType>;
}) {
  const tableColumns: ColumnsType<RecordType> = useMemo(() => {
    return columns.map((item) => {
      const dataIndex = String(item.dataIndex);
      let _renders = item.render ? [item.render] : [];
      // 字典处理
      if (item.valueEnum) {
        _renders.push((dom, record: any, index) => {
          const value = dataIndex ? record[dataIndex] : null;
          return item.valueEnum?.[value]?.text || dom;
        });
      }
      // 时间展示
      if (item.valueType === "date") {
        _renders.push((value) =>
          value ? moment(value).format("YYYY-MM-DD") : null
        );
      }
      const render = (text: any, record: any, index: number) => {
        let dom: any = text;
        _renders.forEach((r, i) => {
          dom = r(dom, record, index);
        });
        return dom;
      };
      return {
        title: item.title,
        dataIndex: item.dataIndex,
        render,
      };
    });
  }, [columns]);

  return {
    tableColumns,
  };
}
