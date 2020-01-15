export function getData(param: any) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('请求数据:', param);
      resolve({ list: [{ name: '李二狗', age: '18' }], page: { total: 1000 } });
    }, 1000);
  });
}
