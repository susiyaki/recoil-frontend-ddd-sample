import { atom, DefaultValue, selector, selectorFamily } from "recoil";
import { Todo, TodoId } from "../../types/todo";
import {
  stateTodoDescription,
  stateTodoIsDone,
  stateTodoTitle,
} from "./valueObject";

export const stateTodoIds = atom<TodoId[]>({
  key: "state-todo-ids",
  default: [],
});

export const stateTodo = selectorFamily<Todo, TodoId>({
  key: "state-todo",
  get: (todoId) => ({ get }) => {
    return {
      id: todoId,
      title: get(stateTodoTitle(todoId)),
      description: get(stateTodoDescription(todoId)),
      isDone: get(stateTodoIsDone(todoId)),
    };
  },

  set: (todoId) => ({ get, set, reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      // NOTE: DefaultValue型のときはresetから呼ばれたとき
      reset(stateTodoTitle(todoId));
      reset(stateTodoDescription(todoId));
      reset(stateTodoIsDone(todoId));
      return;
    }

    set(stateTodoTitle(todoId), newValue.title);
    newValue.description &&
      set(stateTodoDescription(todoId), newValue.description);
    set(stateTodoIsDone(todoId), newValue.isDone);

    if (get(stateTodoIds).find((todoId) => todoId === newValue.id)) return; // NOTE: 更新のときはskip
    set(stateTodoIds, (prev) => [...prev, newValue.id]); // NOTE: 全件取得・全リセット用にIDの配列を保持しておくと便利
  },
});

export const stateTodos = selector<Todo[]>({
  key: "state-todos",
  get: ({ get }) => {
    const todoIds = get(stateTodoIds);
    return todoIds.map((todoId) => get(stateTodo(todoId)));
  },
});
