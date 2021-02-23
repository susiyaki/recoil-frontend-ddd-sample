import { useRecoilCallback } from "recoil";
import { stateTodo, stateTodoIds } from "../states/todo/entity";
import { Todo, TodoId } from "../types/todo";

export const useTodo = () => {
  // NOTE: サーバからデータを取得してstateに反映するときなど
  const setFromArray = useRecoilCallback(({ set }) => (todoArray: Todo[]) => {
    todoArray.forEach((todo) => {
      set(stateTodo(todo.id), todo);
    });
  });

  const upsertTodo = useRecoilCallback(({ set }) => (newTodo: Todo) => {
    set(stateTodo(newTodo.id), newTodo);
  });

  const removeTodo = useRecoilCallback(({ set, reset }) => (todoId: TodoId) => {
    reset(stateTodo(todoId));
    set(stateTodoIds, (prev) => prev.filter((id) => id !== todoId));
  });

  return {
    setFromArray,
    upsertTodo,
    removeTodo,
  };
};
