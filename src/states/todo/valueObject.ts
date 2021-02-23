import { atomFamily } from "recoil";
import {
  TodoDescription,
  TodoId,
  TodoIsDone,
  TodoTitle,
} from "../../types/todo";
export const stateTodoTitle = atomFamily<TodoTitle, TodoId>({
  key: "state-todo-title",
  default: "",
});

export const stateTodoDescription = atomFamily<TodoDescription, TodoId>({
  key: "state-todo-description",
  default: "",
});

export const stateTodoIsDone = atomFamily<TodoIsDone, TodoId>({
  key: "state-todo-is-done",
  default: false,
});
