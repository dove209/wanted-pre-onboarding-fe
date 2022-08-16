export interface ITodo {
  id: string;
  title: string | undefined;
  content: string | undefined;
  createdAt: string;
  updatedAt: string;
}

export type TodoInputType = Pick<ITodo, 'title' | 'content'>;
export type TodoUpdateType = Pick<ITodo, 'id' | 'title' | 'content'>;
