import { TableProps } from 'antd/es/table';
interface Path {
  [key: string]: string;
}

interface Filter {
  [key: string]: string;
}

export interface Api {
  handle: (i?: any) => Promise<any>;
  path: Path;
  auto: boolean;
  fn: (i: any) => any;
  req: (i: any) => any;
}

export interface TableExtendProps<T> extends TableProps<T> {
  filters: Filter;
  api: Api;
  children?: any;
}
