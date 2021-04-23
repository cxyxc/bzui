import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BzTable, BzDescriptions, BzStatusTag } from '@bzui/index';
import { BzTableProps } from '@bzui/BzTable/interfaces';
import { BzBusinessFilled } from '@bzui/icons/BzBusinessFilled';
import { Button, message } from 'antd';

export default {
  title: '表格/BzTable',
  component: BzTable,
  argTypes: {},
} as Meta;

interface RecordType {
  id?: number;
  name?: string;
  job?: string;
  jobNext?: string;
  phone?: string;
  money?: string;
  noExpectItem?: string;
  iconPosition?: string;
  status?: number;
  actions?: Array<string>;
}

export const Default: Story<any> = (args: any) => {
  const onClick = () => {
    message.success('通过啦...');
  };

  const dataSource: Array<RecordType> = [
    {
      id: 1,
      name: '终荣彬',
      job: '滔博体育-徐家汇中心购物广场店-服务员',
      jobNext:
        '滔博体育-徐家汇中心购物广场店-服务员滔博体育-徐家汇中心购物广场店-服务员',
      phone: '14404186742',
      money: '4500-5500元/月',
      status: 1,
      actions: ['pass', 'fail'],
    },
    {
      id: 2,
      name: '终荣彬',
      job: '滔博体育-徐家汇中心购物广场店-服务员',
      jobNext:
        '滔博体育-徐家汇中心购物广场店-服务员滔博体育-徐家汇中心购物广场店-服务员',
      phone: '14404186742',
      money: '4500-5500元/月',
      status: 2,
      actions: ['cancelReason'],
    },
    {
      id: 3,
      name: '终荣彬',
      job: '滔博体育-徐家汇中心购物广场店-服务员',
      jobNext:
        '滔博体育-徐家汇中心购物广场店-服务员滔博体育-徐家汇中心购物广场店-服务员',
      phone: '14404186742',
      money: '4500-5500元/月',
      status: 3,
      actions: ['failReason', 'rePass', 'extraButton'],
    },
  ];

  return (
    <BzTable
      rowKey="id"
      dataSource={dataSource}
      remindRow={(record) => record.id === 2}
      rowSelection={{}}
      columns={[
        {
          title: '姓名',
          dataIndex: 'name',
          hasIcon: true,
          render: (text, record) => {
            return (
              <BzTable.ColumnCell
                icon={record.id === 1 && <BzBusinessFilled />}
              >
                <BzTable.ColumnCellItem type="link" textSize="big">
                  {record.name}
                </BzTable.ColumnCellItem>
                <BzTable.ColumnCellItem>{record.phone}</BzTable.ColumnCellItem>
              </BzTable.ColumnCell>
            );
          },
        },
        {
          title: '岗位岗位岗位岗位岗位岗位岗位岗位岗位岗位岗位岗位岗位岗位岗位',
          dataIndex: 'job',
          width: 400,
          render: (text, record) => {
            return (
              <BzTable.ColumnCell>
                <BzTable.ColumnCellItem
                  type="link"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {record.job}
                </BzTable.ColumnCellItem>
                <BzTable.ColumnCellItem>{record.money}</BzTable.ColumnCellItem>
              </BzTable.ColumnCell>
            );
          },
        },
        // {
        //   title: '岗位(换行)',
        //   dataIndex: 'jobNext',
        //   width: 400,
        //   render: (text) => {
        //     return <a>{text}</a>;
        //   },
        // },
        {
          title: '状态',
          dataIndex: 'status',
          width: 300,
          render: (status) => {
            return (
              <BzStatusTag.Switch
                options={[
                  {
                    childStatus: 'primary',
                    childText: '管家确认通过',
                    status: 'success',
                    text: '试工结束',
                    value: 3,
                  },
                  {
                    childStatus: 'default',
                    childText: '待管家确认',
                    status: 'error',
                    text: '试工失败',
                    value: 2,
                  },
                  {
                    status: 'default',
                    text: '未安排',
                    value: 1,
                  },
                ]}
                value={status}
              />
            );
          },
        },
        {
          title: '操作',
          dataIndex: 'actions',
          hasAction: 'extra',
          render: (actions, record) => {
            return (
              <BzTable.ColumnAction actionKeys={actions}>
                <BzTable.ColumnActionItem
                  actionKey="pass"
                  type="primary"
                  onClick={onClick}
                >
                  通过
                </BzTable.ColumnActionItem>
                <BzTable.ColumnActionItem actionKey="fail" danger>
                  失败
                </BzTable.ColumnActionItem>
                <BzTable.ColumnActionItem
                  visible={record.status === 1}
                  onClick={onClick}
                >
                  前端按钮
                </BzTable.ColumnActionItem>
                <BzTable.ColumnActionItem actionKey="cancelReason" danger>
                  管家取消工单，查看原因
                </BzTable.ColumnActionItem>

                <BzTable.ColumnActionItem
                  actionKey="failReason"
                  danger
                  render={() => {
                    // 支持自定义渲染
                    return (
                      <Button size="small" danger>
                        查看初筛失败原因
                      </Button>
                    );
                  }}
                />
                <BzTable.ColumnActionItem
                  actionKey="rePass"
                  extra
                  onClick={onClick}
                >
                  初筛改为通过
                </BzTable.ColumnActionItem>
                <BzTable.ColumnActionItem
                  actionKey="extraButton"
                  extra
                  onClick={onClick}
                >
                  额外操作
                </BzTable.ColumnActionItem>
              </BzTable.ColumnAction>
            );
          },
        },
      ]}
    ></BzTable>
  );
};
Default.args = {
  hasExtra: true,
};
Default.parameters = {
  docs: {
    source: {
      code: `
const onClick = () => {
  message.success('通过啦...');
};

const dataSource: Array<RecordType> = [
  {
    id: 1,
    name: '终荣彬',
    job: '滔博体育-徐家汇中心购物广场店-服务员',
    jobNext:
      '滔博体育-徐家汇中心购物广场店-服务员滔博体育-徐家汇中心购物广场店-服务员',
    phone: '14404186742',
    money: '4500-5500元/月',
    status: 1,
    actions: ['pass', 'fail'],
  },
  {
    id: 2,
    name: '终荣彬',
    job: '滔博体育-徐家汇中心购物广场店-服务员',
    jobNext:
      '滔博体育-徐家汇中心购物广场店-服务员滔博体育-徐家汇中心购物广场店-服务员',
    phone: '14404186742',
    money: '4500-5500元/月',
    status: 2,
    actions: ['cancelReason'],
  },
  {
    id: 3,
    name: '终荣彬',
    job: '滔博体育-徐家汇中心购物广场店-服务员',
    jobNext:
      '滔博体育-徐家汇中心购物广场店-服务员滔博体育-徐家汇中心购物广场店-服务员',
    phone: '14404186742',
    money: '4500-5500元/月',
    status: 3,
    actions: ['failReason', 'rePass', 'extraButton'],
  },
];

return (
  <BzTable
    rowKey="id"
    dataSource={dataSource}
    remindRow={(record) => record.id === 3}
    rowSelection={{}}
    columns={[
      {
        title: '姓名',
        dataIndex: 'name',
        hasIcon: true,
        render: (text, record) => {
          return (
            <BzTable.ColumnCell
              icon={record.id === 1 && <BzBusinessFilled />}
            >
              <BzTable.ColumnCellItem type="link" textSize="big">
                {record.name}
              </BzTable.ColumnCellItem>
              <BzTable.ColumnCellItem>{record.phone}</BzTable.ColumnCellItem>
            </BzTable.ColumnCell>
          );
        },
      },
      {
        title: '岗位',
        dataIndex: 'job',
        width: 400,
        render: (text, record) => {
          return (
            <BzTable.ColumnCell>
              <BzTable.ColumnCellItem
                type="link"
                style={{ whiteSpace: 'nowrap' }}
              >
                {record.job}
              </BzTable.ColumnCellItem>
              <BzTable.ColumnCellItem>{record.money}</BzTable.ColumnCellItem>
            </BzTable.ColumnCell>
          );
        },
      },
      // {
      //   title: '岗位(换行)',
      //   dataIndex: 'jobNext',
      //   width: 400,
      //   render: (text) => {
      //     return <a>{text}</a>;
      //   },
      // },
      {
        title: '状态',
        dataIndex: 'status',
        width: 300,
        render: (status) => {
          return (
            <BzStatusTag.Switch
              options={[
                {
                  childStatus: 'primary',
                  childText: '管家确认通过',
                  status: 'success',
                  text: '试工结束',
                  value: 3,
                },
                {
                  childStatus: 'default',
                  childText: '待管家确认',
                  status: 'error',
                  text: '试工失败',
                  value: 2,
                },
                {
                  status: 'default',
                  text: '未安排',
                  value: 1,
                },
              ]}
              value={status}
            />
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'actions',
        hasAction: 'extra',
        render: (actions) => {
          return (
            <BzTable.ColumnAction actionKeys={actions}>
              <BzTable.ColumnActionItem
                actionKey="pass"
                type="primary"
                onClick={onClick}
              >
                通过
              </BzTable.ColumnActionItem>
              <BzTable.ColumnActionItem actionKey="fail" danger>
                失败
              </BzTable.ColumnActionItem>

              <BzTable.ColumnActionItem actionKey="cancelReason" danger>
                管家取消工单，查看原因
              </BzTable.ColumnActionItem>

              <BzTable.ColumnActionItem
                actionKey="failReason"
                danger
                render={() => {
                  // 支持自定义渲染
                  return (
                    <Button size="small" danger>
                      查看初筛失败原因
                    </Button>
                  );
                }}
              />
              <BzTable.ColumnActionItem
                actionKey="rePass"
                extra
                onClick={onClick}
              >
                初筛改为通过
              </BzTable.ColumnActionItem>
              <BzTable.ColumnActionItem
                actionKey="extraButton"
                extra
                onClick={onClick}
              >
                额外操作
              </BzTable.ColumnActionItem>
            </BzTable.ColumnAction>
          );
        },
      },
    ]}
  ></BzTable>
);
`,
    },
  },
};

export const InsideBlock: Story<BzTableProps<RecordType>> = (
  props: BzTableProps<RecordType>
) => {
  const dataSource: Array<RecordType> = [
    {
      id: 1,
      name: '收银-兼职',
      money: '4500-5500元/月',
      noExpectItem: '支持固定宽度和自适应宽度',
    },
    {
      id: 2,
      name: '全家-全职',
      money: '3500-4500元/月',
      noExpectItem: '工作时长要求',
    },
    {
      id: 3,
      name: '全家-全职',
      money: '3500-4500元/月',
      noExpectItem: '工作时长要求',
    },
  ];

  return (
    <BzTable
      {...props}
      rowKey="id"
      dataSource={dataSource}
      rowSelection={{}}
      insideBlockOptions={{
        rowExpandable: (record) => record.id !== 2,
      }}
      insideBlock={(record) => {
        return (
          <BzDescriptions column={2}>
            <BzDescriptions.Item label="不匹配项">
              {record.noExpectItem}
            </BzDescriptions.Item>
            <BzDescriptions.Item label="不匹配项">
              {record.noExpectItem}
            </BzDescriptions.Item>
            <BzDescriptions.Item label="不匹配项">
              {record.noExpectItem}
            </BzDescriptions.Item>
            <BzDescriptions.Item label="不匹配项">
              {record.noExpectItem}
            </BzDescriptions.Item>
            <BzDescriptions.Item label="不匹配项">
              {record.noExpectItem}
            </BzDescriptions.Item>
            <BzDescriptions.Item label="不匹配项">
              {record.noExpectItem}
            </BzDescriptions.Item>
          </BzDescriptions>
        );
      }}
    >
      <BzTable.Column title="岗位名称" dataIndex="name" />
      <BzTable.Column title="薪资" dataIndex="money" />
    </BzTable>
  );
};
InsideBlock.args = {};
InsideBlock.parameters = {
  docs: {
    source: {
      code: `
const dataSource: Array<RecordType> = [
  {
    id: 1,
    name: '收银-兼职',
    money: '4500-5500元/月',
    noExpectItem: '支持固定宽度和自适应宽度',
  },
  {
    id: 2,
    name: '全家-全职',
    money: '3500-4500元/月',
    noExpectItem: '工作时长要求',
  },
];

return (
  <BzTable
    {...props}
    rowKey="id"
    dataSource={dataSource}
    rowSelection={{}}
    insideBlock={(record) => {
      return (
        <BzDescriptions column={2} contentStyle={{
          width: 300
        }}>
          <BzDescriptions.Item label="不匹配项">
            {record.noExpectItem}
          </BzDescriptions.Item>
          <BzDescriptions.Item label="不匹配项">
            {record.noExpectItem}
          </BzDescriptions.Item>
          <BzDescriptions.Item label="不匹配项">
            {record.noExpectItem}
          </BzDescriptions.Item>
          <BzDescriptions.Item label="不匹配项">
            {record.noExpectItem}
          </BzDescriptions.Item>
          <BzDescriptions.Item label="不匹配项">
            {record.noExpectItem}
          </BzDescriptions.Item>
          <BzDescriptions.Item label="不匹配项">
            {record.noExpectItem}
          </BzDescriptions.Item>
        </BzDescriptions>
      );
    }}
  >
    <BzTable.Column title="岗位名称" dataIndex="name" />
    <BzTable.Column title="薪资" dataIndex="money" />
  </BzTable>
);
`,
    },
  },
};
