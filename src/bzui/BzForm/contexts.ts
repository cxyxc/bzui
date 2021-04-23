/**
 * 表单上下文
 */
import { ColProps } from 'antd/lib/col';
import React from 'react';

// 可供业务代码使用
export const BzFormContext = React.createContext<{
  mode?: 'default' | 'detail'; // detail 标明表单与详情混排
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  [key: string]: any; // 任意 key
}>({});

// 内部上下文(禁止业务代码使用)
export const FormCardContext = React.createContext<{
  inCard?: boolean;
}>({});
export const FormBlockContext = React.createContext<{
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}>({});
export const FormInsideBlockContext = React.createContext<{
  inInsideBlock?: boolean;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}>({});
