import { Api } from './data';
import { TableProps } from 'antd/es/table';
export const initTableProps: TableProps<any> = {
  columns: [],
  pagination: {
    current: 1,
    pageSize: 10,
  },
};

export const defaultApi: Api = {
  handle: () => Promise.resolve(1),
  path: { dataSource: 'list', 'pagination.total': 'page.total' },
  auto: false,
  fn: i => i,
  req: i => i,
};

export const pageMap = {
  current: 'current',
  pageSize: 'pageSize',
};

// export function req(page, filters, sorter) {
//   return { page, filters, sorter };
// }
