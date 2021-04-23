import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { CSSProperties, useMemo } from "react";
import { ExcelColumnsType } from "./interfaces";
import moment from "moment";
import { Tooltip } from "antd";
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const isEmpty = (value: any) =>
  value === null || value === undefined || value === "";

const warningStyle: CSSProperties = {
  color: "#faad14",
};
const errorStyle: CSSProperties = {
  color: "#ff4d4f",
};

export default function useExcelImport<RecordType = any>({
  columns,
}: {
  columns: ExcelColumnsType<RecordType>;
}) {
  const [data, setData] = useState<Array<any>>([]);
  const [hasError, setHasError] = useState<boolean>(false);

  // Excel 列名映射
  const columnTitleMapper = useMemo(() => {
    const result: { [key: string]: any } = {};
    columns.forEach((item) => {
      // TODO: 仅考虑 title/dataIndex 均为 string 的基本情况
      if (typeof item.title === "string" && typeof item.dataIndex === "string")
        result[item.title] = item;
    });
    return result;
  }, [columns]);

  // Excel 列名映射
  const columnDataIndexMapper = useMemo(() => {
    const result: { [key: string]: any } = {};
    columns.forEach((item) => {
      // TODO: 仅考虑 title/dataIndex 均为 string 的基本情况
      if (typeof item.title === "string" && typeof item.dataIndex === "string")
        result[item.dataIndex] = item;
    });
    return result;
  }, [columns]);

  // 粗略实现仿 Antd Pro 的表格 Columns API 以支持 Excel 和数据模型的转换
  const tableColumns: ColumnsType<RecordType> = useMemo(() => {
    return columns.map((item) => {
      // TODO: 仅考虑 title/dataIndex 均为 string 的基本情况
      const dataIndex = String(item.dataIndex);
      let _renders = item.render ? [item.render] : [];
      let _validates = item.validate ? [item.validate] : [];
      // 必填值处理
      if (item.required) {
        _validates.push((_, record: any) => {
          if (isEmpty(record[dataIndex])) {
            return {
              status: "error",
              message: `${item.title}不能为空`,
            };
          }
          return { status: "success" };
        });
      }
      // 字典处理
      if (item.valueEnum) {
        _validates.push((_, record: any) => {
          const value = record[dataIndex];
          if (isEmpty(value)) return { status: "success" };
          const enumResult = !!Object.keys(item.valueEnum || {}).find(
            (key) => Number(key) === Number(value)
          );
          if (enumResult === false)
            return {
              status: "error",
              message: "字典项匹配失败，请按照模板内提供的示例文案调整",
            };
          return { status: "success" };
        });
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
        _validates.push((_, record: any) => {
          const value = record[dataIndex];
          if (isEmpty(value)) return { status: "success" };
          if (!moment(value).isValid())
            return {
              status: "error",
              message: "时间格式错误",
            };
          return { status: "success" };
        });
      }
      // 处理校验逻辑
      if (_validates.length > 0) {
        _renders.push((dom, record: any) => {
          const value =
            typeof item.dataIndex === "string" ? record[item.dataIndex] : null;
          const validateResult = _validates
            .map((v) => v(value, record))
            .find((r) => r?.status !== "success");
          let text = dom;
          if (validateResult?.status === "error" && hasError === false) {
            // render 时发现异常即赋值为 true 阻拦用户提交
            setHasError(true);
          }
          let style: CSSProperties = {};
          if (validateResult?.status === "warning") style = warningStyle;
          if (validateResult?.status === "error") style = errorStyle;
          return (
            <div style={style}>
              <span>{text}</span>
              {(validateResult?.status === "warning" ||
                validateResult?.status === "error") && (
                <Tooltip placement="top" title={validateResult.message}>
                  {" "}
                  {validateResult?.status === "warning" && (
                    <ExclamationCircleOutlined />
                  )}
                  {validateResult?.status === "error" && (
                    <CloseCircleOutlined />
                  )}
                </Tooltip>
              )}
            </div>
          );
        });
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

  const setExcelToData = (data: any, mapper?: "title" | "dataIndex") => {
    setData(
      data.map((item: any) => {
        // raw data to data
        const keys = Object.keys(item);
        const result: { [key: string]: any } = {};
        keys.forEach((k) => {
          const column =
            mapper === "title" || !mapper
              ? columnTitleMapper[k]
              : columnDataIndexMapper[k];
          let text = item[k];
          const { valueEnum, valueType } = column;
          if (valueEnum) {
            // 处理枚举值
            text = Object.keys(valueEnum)
              .map((k) => {
                let value: number | string = k;
                if (value && !isNaN(Number(value))) value = Number(value);
                return {
                  value,
                  ...valueEnum[k],
                };
              })
              .find((item) => item.text === text)?.value;
          }
          if (valueType === "date") {
            const m = moment(text, [
              "MM/DD/YY",
              "YYYY/MM/DD",
              "YYYY-MM-DD",
              "YYYY年MM月DD日",
            ]);
            // 处理日期
            text = m.isValid() ? m.toISOString() : "InValid Date";
          }
          result[column.dataIndex] = text;
        });
        return result;
      })
    );
  };

  return {
    data,
    tableColumns,
    setExcelToData,
    hasError,
    clearData: () => {
      setData([]);
      setHasError(false);
    },
  };
}
