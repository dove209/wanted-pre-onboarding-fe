import {
  getTodosAPI,
  getTodoByIdAPI,
  creatTodoAPI,
  updateTodoAPI,
  deleteTodoAPI,
} from '../api/todo';
import { ITodo } from '../../types/todos';

// TODO 리스트 가져오기
export const getTodos = async () => {
  try {
    const {
      data: { data },
    } = await getTodosAPI();
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// ID로 TODO 가져오기
export const getTodoById = async (id: string) => {
  try {
    const {
      data: { data },
    } = await getTodoByIdAPI(id);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// TODO 등록

// TODO 수정

// TODO 삭제
