import { Button, message, Modal, Table } from "antd";
import { ButtonProps } from "antd/lib/button";
import React, { CSSProperties, ReactNode, useMemo, useState } from "react";
import moment from "moment";
import { excelToJSON, jsonToExcel } from "./utils";
import {
  BzExcelExportProps,
  ExcelColumnsType,
  ExcelColumnType,
} from "./interfaces";
import useExcelImport from "./useExcelImport";
import { ModalProps } from "antd/lib/modal";

const fileInputStyle: CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  opacity: 0,
};

export interface BzExcelImportProps<RecordType> {
  children?: ReactNode;
  buttonProps?: ButtonProps;
  modalProps?: ModalProps;
  rowKey: string;
  columns: ExcelColumnsType<RecordType>;
  onSubmit?: (value: Array<RecordType>) => Promise<{ success: boolean }>;
}
export function BzExcelImport<RecordType = unknown>(
  props: BzExcelImportProps<RecordType>
) {
  const { rowKey, columns, buttonProps, modalProps } = props;
  const {
    data,
    tableColumns,
    setExcelToData,
    clearData,
    hasError,
  } = useExcelImport({ columns });
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleFileUpload = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let file = ev.target.files?.[0];
    if (!file) return;
    if (!/.xls/.test(file?.name || "")) {
      ev.target.value = "";
      message.warning("文件格式有误");
      return;
    }

    excelToJSON(file).then((result) => {
      if (!result) return;
      const { header = [], data = [] } = Object.values(result)[0];

      // 校验表头
      if (columns.map((c) => c.title).join(",") !== header.join(",")) {
        message.warning("请下载最新的模板使用哦");
        return;
      }
      // 数据为空
      if (!data || data.length === 0) {
        message.warning("没有读取到数据，请检查");
        return;
      }

      setVisible(true);
      setExcelToData(data);
    });
  };

  return (
    <>
      <Button {...buttonProps}>
        {props.children || "导入"}
        <input
          style={fileInputStyle}
          type="file"
          onChange={handleFileUpload}
          onClick={(e: any) => (e.target.value = null)}
        />
      </Button>
      <Modal
        okText="确认导入"
        cancelText="取消导入"
        cancelButtonProps={{ danger: true }}
        {...modalProps}
        visible={visible}
        maskClosable={false}
        onCancel={() => {
          setVisible(false);
          clearData();
        }}
        confirmLoading={confirmLoading}
        onOk={() => {
          if (hasError) {
            message.error("您的 Excel 中有错误，请改正后重新导入");
            return;
          }
          if (props.onSubmit) {
            setConfirmLoading(true);
            return props.onSubmit(data).then(({ success }) => {
              setConfirmLoading(false);
              if (success) {
                setVisible(false);
                clearData();
              }
            });
          }
        }}
      >
        <Table
          rowKey={rowKey}
          columns={tableColumns}
          dataSource={data}
          pagination={false}
          size="small"
          bordered
        />
      </Modal>
    </>
  );
}

export function BzExcelExport<RecordType = unknown>(
  props: BzExcelExportProps<RecordType>
) {
  const {
    template,
    columns,
    dataSource,
    excelName,
    buttonProps,
    children,
  } = props;

  const columnDataIndexMapper = useMemo(() => {
    const result: { [key: string]: ExcelColumnType<any> } = {};
    columns.forEach((item) => {
      // TODO: 仅考虑 title/dataIndex 均为 string 的基本情况
      if (typeof item.title === "string" && typeof item.dataIndex === "string")
        result[item.dataIndex] = item;
    });
    return result;
  }, [columns]);
  const columnDataIndexs = Object.keys(columnDataIndexMapper);

  // TODO: any 有点儿多，均不考虑 title 不是 string 的情况
  const json = useMemo(() => {
    const result: any = [];
    if (template) {
      // 生成模板(SheetJS专业版支持生成数据有效性检验，免费版不行，此处生成一份带有数据有效性文本提示的模板)
      const enumColumns = columns.map((c) => ({
        key: c.title,
        enum: c.valueEnum
          ? Object.keys(c.valueEnum).map((k) => c.valueEnum?.[k]?.text)
          : [],
      }));
      // TODO: 生成多条数据供数据有效性字段展示，PS: 最少一条
      const maxEnumLength =
        Math.max(...enumColumns.map((c) => c.enum.length)) || 1;
      for (let i = 0; i < maxEnumLength; i++) {
        const r: { [key: string]: any } = {};
        enumColumns.forEach((c) => (r[c.key as string] = c.enum[i]));
        result.push(r);
      }
    } else {
      // 导出数据
      dataSource?.forEach((item: any) => {
        const r: { [key: string]: any } = {};
        columnDataIndexs.forEach((dataIndex: string) => {
          const columm = columnDataIndexMapper[dataIndex];
          if (columm?.title && typeof columm?.title === "string") {
            const value = item[dataIndex];
            r[columm.title] = value;
            if (columm.valueEnum) {
              r[columm.title] = columm.valueEnum[value]?.text;
            }
            if (columm.valueType === "date") {
              r[columm.title] = moment(value).format("YYYY-MM-DD");
            }
          }
        });
        result.push(r);
      });
    }
    return result;
  }, [columns, dataSource]);

  const onClick = () => {
    jsonToExcel(json, excelName ? `${excelName}.xlsx` : "导出.xlsx");
  };
  return (
    <Button {...buttonProps} onClick={onClick}>
      {children || "导出"}
    </Button>
  );
}
