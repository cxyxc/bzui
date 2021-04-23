import React from 'react';
import { BzDescriptionsProviderProps } from './interfaces';

// 内部上下文(禁止业务代码使用)
export const DescriptionsContext = React.createContext<
  BzDescriptionsProviderProps
>({});
