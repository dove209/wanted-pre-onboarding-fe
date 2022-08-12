import {
  TodoInputType,
  GetTodosResponse,
  GetTodoResponse,
  GetTodoDeleteResponse,
} from '../../types/todos';
import axios from '.';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'access-token'
)}`;

// TODO 리스트 가져오기
export const getTodosAPI = () => axios.get<GetTodosResponse>('/todos');

// ID로 TODO 가져오기
export const getTodoByIdAPI = (id: string | undefined) =>
  axios.get<GetTodoResponse>(`/todos/${id}`);

// TODO 등록
export const creatTodoAPI = (body: TodoInputType) =>
  axios.post<GetTodoResponse>('/todos', body);

// TODO 수정
export const updateTodoAPI = (id: string | undefined, body: TodoInputType) =>
  axios.put<GetTodoResponse>(`/todos/${id}`, body);

// TODO 삭제
export const deleteTodoAPI = (id: string) =>
  axios.delete<GetTodoDeleteResponse>(`/todos/${id}`);
