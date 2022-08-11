import axios from '.';
import { IUser } from '../../types/users';
import { IAuthResponse } from '../../types/auth';

// 회원가입 api
export const signUpAPI = (body: IUser) =>
  axios.post<IAuthResponse>('/users/create', body);

// 로그인 api
export const loginAPI = (body: IUser) =>
  axios.post<IAuthResponse>('/users/login', body);
