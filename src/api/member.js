import $http from '@/config/http';
// import querystring from 'querystring';
// import { Message } from 'element-ui';
// import axios from 'axios';

//获取用户列表
export const getUserList = (params) => {
  let requestUrl = 'get-user-list';
  return $http.post(requestUrl, params)
}

//更新用户状态
export const updateUserStatus = (params) => {
  let requestUrl = 'update-user-status';
  return $http.post(requestUrl, params)
}

//删除用户
export const delUser = (params) => {
  let requestUrl = 'delete-user';
  return $http.post(requestUrl, params)
}