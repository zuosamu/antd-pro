import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  cloneElement,
  SFC,
} from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/es/table';
import { Api, TableExtendProps } from './data';
import { flatMap } from './utils/util';
import pick from 'lodash/pick';
import merge from 'lodash/merge';
import { defaultApi, initTableProps } from './defaultConfi';
import { getData } from './mock';
import 'antd/dist/antd.css';
const useFetch = (api: Api) => {
  return (reqParam: any) => {
    const { handle, path, fn, req } = api;
    const [dataSource, setDataSource] = useState({});
    const fetchData = useCallback(async () => {
      const data = await handle(req(reqParam));
      setDataSource(flatMap(fn(data), path));
    }, [reqParam]);
    useEffect(() => {
      fetchData();
    }, [fetchData]);
    return dataSource;
  };
};

const useTable = (init: any) => {
  const initialState = {
    pagination: {},
    filters: {},
    sorter: {},
  };
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'page':
        return merge({}, state, action.payload);
      case 'filters':
        return merge({}, initialState, init);
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: 'filters' });
  }, [init.filters]);
  return { state, dispatch };
};

const Ta: SFC<TableExtendProps<any>> = function(props) {
  const { filters, api, children, ...options } = props;
  const tableProps = merge({}, initTableProps, options);
  const fetch = useFetch({ ...defaultApi, ...api });
  const { state: reqParam, dispatch } = useTable({
    pagination: pick(tableProps.pagination, ['current', 'pageSize']),
    filters,
  });
  let prop = fetch(reqParam);
  return useMemo(() => {
    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
      options.onChange && options.onChange(pagination, filters, sorter, extra);
      dispatch({
        type: 'page',
        payload: { pagination, filters, sorter },
      });
    };
    const childrenProps = { ...tableProps, ...prop, onChange };
    return children ? cloneElement(children, [childrenProps]) : <Table {...childrenProps}></Table>;
  }, [prop]);
};
export default Ta;
