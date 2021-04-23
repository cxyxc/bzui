import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import {
  BzExcelExport,
  BzExcelImport,
  BzExcelImportProps,
} from "@bzui/BzExcel";
import { message } from "antd";
import { BzExcelExportProps, ExcelColumnsType } from "@bzui/BzExcel/interfaces";
import { BzExcelTextArea } from "@bzui/BzExcel/BzExcelTextArea";

export default {
  title: "EXCEL操作/BzExcel",
  component: BzExcelImport,
  argTypes: {},
} as Meta;

type Record = {
  id: number;
  name: string;
  phone: string;
  gender: number;
  createAt: string;
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const columns: ExcelColumnsType<{
  name?: string;
  gender?: number;
  phone?: string;
  createAt?: string;
}> = [
  {
    title: "姓名",
    dataIndex: "name",
    required: true,
  },
  {
    title: "性别",
    dataIndex: "gender",
    required: true,
    valueEnum: {
      1: {
        text: "男",
      },
      2: {
        text: "女",
      },
    },
  },
  {
    title: "手机号",
    dataIndex: "phone",
    required: true,
    validate: (text) => {
      if (text && !/^1[0-9]{10}$/.test(text)) {
        return {
          status: "error",
          message: "手机号格式有误",
        };
      }
      return { status: "success" };
    },
  },
  {
    title: "时间",
    dataIndex: "createAt",
    valueType: "date",
  },
];

export const Default: Story<BzExcelImportProps<Record>> = (args) => {
  return (
    <>
      <BzExcelExport
        template
        columns={columns}
        buttonProps={{
          style: { marginRight: 8 },
        }}
      >
        下载模板
      </BzExcelExport>
      <BzExcelImport
        rowKey="name"
        buttonProps={{
          type: "primary",
        }}
        onSubmit={(data) => {
          return waitTime(2000).then(() => {
            console.log(data);
            message.success("导入成功");
            return {
              success: true,
            };
          });
        }}
        columns={columns}
      />
    </>
  );
};

Default.parameters = {
  docs: {
    source: {
      code: `
const columns: ExcelColumnsType<{
  name?: string;
  gender?: number;
  phone?: string;
  createAt?: string
}> = [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "性别",
      dataIndex: "gender",
      valueEnum: {
        1: {
          text: "男",
        },
        2: {
          text: "女",
        },
      },
    },
    {
      title: "手机号",
      dataIndex: "phone",
      validate: (text) => {
        if (text && /^1[0-9]{10}$/.test(text)) {
          return {
            status: 'success'
          }
        }
        return {
          status: 'error',
          message: '手机号格式有误'
        }
      }
    },
    {
      title: "时间",
      dataIndex: "createAt",
      valueType: 'date'
    },
  ]

return (
  <>
    <BzExcelExport
      template
      columns={columns}
      buttonProps={{
        style: { marginRight: 8 }
      }}>
      下载模板
    </BzExcelExport>
    <BzExcelImport
      rowKey="name"
      buttonProps={{
        type: 'primary'
      }}
      onSubmit={(data) => {
        return waitTime(2000).then(() => {
          message.success('导入成功')
          return {
            success: true
          }
        })
      }}
      columns={columns} />
  </>
);
`,
    },
  },
};

export const ExportDataToExcel: Story<BzExcelExportProps<Record>> = (args) => {
  return (
    <BzExcelExport
      columns={columns}
      dataSource={[
        {
          name: "老王",
          gender: 1,
          phone: "18764839285",
          createAt: "2021-03-31T07:23:32.413Z",
        },
        {
          name: "老王",
          gender: 1,
          phone: "18764839285",
          createAt: "2021-03-31T07:23:32.413Z",
        },
        {
          name: "老王",
          gender: 1,
          phone: "18764839285",
          createAt: "2021-03-31T07:23:32.413Z",
        },
      ]}
    >
      导出
    </BzExcelExport>
  );
};

ExportDataToExcel.args = {};

export const ExcelTextArea: Story<BzExcelExportProps<Record>> = (args) => {
  const [value, setValue] = useState<any>();
  // 暂时是个非受控组件
  console.log(value);
  return (
    <BzExcelTextArea onChange={setValue} rowKey="phone" columns={columns} />
  );
};

ExcelTextArea.args = {};
