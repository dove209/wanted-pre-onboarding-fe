const todoCache = {
    todos: ['todos'] as const,
    todoById: (todoId: string | undefined) => ['todo', todoId] as const,
}

export default todoCache;