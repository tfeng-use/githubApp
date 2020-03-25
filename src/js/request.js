import axios from "axios";
// import  { notification } from 'antd'

// import {
//   getToken
// } from './auth'

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

// create an axios instance
const service = axios.create({
  baseURL: "",
  timeout: 5000 // request timeout
});

// request拦截器
service.interceptors.request.use(
  config => {
    // 如果含有token
    // if (getToken()) {
    //   // 获取cookie中的token，并且放到请求的头中
    //   config.headers.Authorization = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // } else
    // {
    //   config.headers.Authorization = ''
    // }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.status === undefined) {
      return response.data;
    }
    if (res.status !== 200) {
      notification.error({
        message: "Forbidden",
        description: res.message
      });
      return Promise.reject(res.message);
    } else {
      return response.data;
    }
  },
  error => {
    const response = error.response;

    if (response === undefined) {
      // notification.error({
      //   message: 'Forbidden',
      //   description: '服务请求超时！'
      // })
      return Promise.reject(new Error("request failed"));
    }

    const info = response.data;
    // notification.error({
    //   message: 'Forbidden',
    //   description: info.message // 这儿也可以根据上面 codeMessage 找出对应的信息
    // })
    return Promise.reject(error);
  }
);

export default service;
