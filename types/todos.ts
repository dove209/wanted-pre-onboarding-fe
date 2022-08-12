export interface ITodo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type TodoInputType = Pick<ITodo, 'title' | 'content'>;

export type GetTodosResponse = {
  data: ITodo[];
};

export type GetTodoResponse = {
  data: ITodo;
};

export type GetTodoDeleteResponse = {
  data: null;
};
