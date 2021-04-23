import React from 'react';
import { isFragment } from 'react-is';

export interface Option {
  keepEmpty?: boolean;
}

export function covertReactChildrenToArray(
  children: React.ReactNode,
  option: Option = {}
): React.ReactElement[] {
  let ret: React.ReactElement[] = [];

  React.Children.forEach(children, (child: any) => {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }

    if (Array.isArray(child)) {
      ret = ret.concat(covertReactChildrenToArray(child));
    } else if (isFragment(child) && child.props) {
      ret = ret.concat(
        covertReactChildrenToArray(child.props.children, option)
      );
    } else {
      ret.push(child);
    }
  });

  return ret;
}
