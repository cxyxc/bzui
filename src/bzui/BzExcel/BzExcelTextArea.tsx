import { Table } from "antd";
import React, { Fragment, useEffect } from "react";
import { Input } from "antd";
import { BzExcelTextAreaProps } from "./interfaces";
import useExcelImport from "./useExcelImport";

// 可将 Excel 数据格式化成表格并校验的文本输入框
// 因校验的实现成本问题，借助 antd Form.Item 实现
// 类似 antd Pro 级别的组件
const ExcelTextArea = ({
  value,
  indexList,
  onChange,
}: {
  value?: Array<any>;
  indexList: string[];
  onChange: (value: any) => void;
}) => {
  // TODO: 暂时不考虑受控性
  // const inputValue = value?.map(v => indexList.map(i => v[i]).join(' ')).join('\n') || ''
  const inputOnChange = (e: any) => {
    const v: string = e.target.value;
    const outputValue = v
      .split("\n")
      .filter((v) => v)
      .map((v) => {
        const r: any = {};
        v.replace(/\s+/g, " ")
          .split(" ")
          .forEach((v, i) => (r[indexList[i]] = v));
        return r;
      });
    onChange(outputValue);
  };
  return <Input.TextArea onChange={inputOnChange} />;
};
export function BzExcelTextArea<RecordType>(
  props: BzExcelTextAreaProps<RecordType>
) {
  const { rowKey, columns, onChange } = props;
  const { data, tableColumns, setExcelToData } = useExcelImport({ columns });

  useEffect(() => {
    // TODO: 暂时不考虑受控性和异常处理
    if (onChange) onChange(data);
  }, [data]);

  return (
    <Fragment>
      <ExcelTextArea
        indexList={columns.map((i) => String(i.title))}
        onChange={setExcelToData}
      />
      {data && data.length > 0 && (
        <Table
          rowKey={rowKey}
          columns={tableColumns}
          dataSource={data}
          pagination={false}
          size="small"
          bordered
        />
      )}
    </Fragment>
  );
}
