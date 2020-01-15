import isPlainObject from 'lodash/isPlainObject';

type Dic = {
  [x: string]: any;
};

export function flatMap(dataSource: any, path: Dic): object {
  if (!isPlainObject(path)) console.error('path必须为一个对象，老铁！');
  const retObj: Dic = {};
  Object.keys(path).forEach((i: string) => {
    const [key, ...rePath] = i.split('.');
    retObj[key] = reMap(dataSource, path[i], rePath);
  });
  return retObj;
}

export function reduceMap(dataSource: any, pathcell: string) {
  return pathcell.split('.').reduce((prev: any, next: any) => prev[next], dataSource);
}

export function reMap(dataSource: any, pathcell: string, path: any[]): object {
  const [key, ...rePath] = path;
  if (!key) return reduceMap(dataSource, pathcell);
  const ret: Dic = {};
  ret[key] = reMap(dataSource, pathcell, rePath);
  return ret;
}
