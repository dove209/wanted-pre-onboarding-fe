export interface ITodo {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}

export type TodoInputType = Pick<ITodo, 'title' | 'content'>;

export type GetTodosResponse = {
  data: ITodo[];
};

export type GetTodoResponse = {
  data: ITodo;
};
