import {
  TodoInputType,
  TodoUpdateType,
} from '../../types/todos';
import axios from '.';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  'access-token'
)}`;

// TODO 리스트 가져오기
export const getTodosAPI = async () => { 
  const { data: { data } } = await axios.get('/todos');
  return data;
};

// ID로 TODO 가져오기
export const getTodoByIdAPI = async (id: string | undefined) => {
  const { data: { data } } = await axios.get(`/todos/${id}`);
  return data;
}

// TODO 등록
export const creatTodoAPI = async (body: TodoInputType) => {
  const { data: { data } } = await axios.post('/todos', body);
  return data;
}

// TODO 수정
export const updateTodoAPI = async (body: TodoUpdateType) => {
  const { id, title, content } = body;
  const parameter = {
    title,
    content
  }
  const { data: { data } } = await axios.put(`/todos/${id}`, parameter);
  return data;
}
  

// TODO 삭제
export const deleteTodoAPI = async (id: string) => {
  const { data: { data } } = await axios.delete(`/todos/${id}`);
  return data
}
  
