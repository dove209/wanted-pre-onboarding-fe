import { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { getTodosAPI, getTodoByIdAPI, creatTodoAPI, deleteTodoAPI, updateTodoAPI } from '../../api/todo';
import { ITodo, TodoInputType } from '../../../types/todos';


export const useTodos = (options = {}): UseQueryResult<ITodo[], AxiosError> => {
    return useQuery('todos', getTodosAPI, { ...options });
}

export const useTodo = (id: string | undefined, options = {}): UseQueryResult<ITodo, AxiosError> => {
    return useQuery(['todo', id], () => getTodoByIdAPI(id), {
        ...options,
        enabled: !!id, //id가 존재할 때만 쿼리 요청
    })
}

export const useCreateTodoMuation = (): UseMutationResult<ITodo, AxiosError, any> => {
    return useMutation(creatTodoAPI, {
        onSuccess: (date) => {
            // console.log(date);
        },
        onError: (error) => {
            // console.log(error)
        }
    })
}

export const useUpateTodoMuation = (): UseMutationResult<ITodo, AxiosError, any> => {
    return useMutation(updateTodoAPI, {
        onSuccess: (date) => {
            // console.log(date);
        },
        onError: (error) => {
            // console.log(error)
        }
    })
}

export const useDeleteTodoMuation = (): UseMutationResult<ITodo, AxiosError, any> => {
    return useMutation(deleteTodoAPI, {
        onSuccess: (date) => {
            // console.log(date);
        },
        onError: (error) => {
            // console.log(error)
        }
    })
}

