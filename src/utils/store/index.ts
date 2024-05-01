import { DATASET, filterTodoData } from "@/utils/data";
import { TodoDetailsProps } from "@/utils/types";
import { create } from "zustand";

interface TodoListState {
  todoData: TodoDetailsProps[];
  filterTodoData: Map<string, TodoDetailsProps[]>;
  addList: (data: TodoDetailsProps, type: string) => void;
  updateTodoData: (data: TodoDetailsProps[], type: string) => void;
}

export const useTodoStore = create<TodoListState>((set) => ({
  todoData: DATASET,
  addList: (data: TodoDetailsProps, type: string) =>
    set((state) => ({
      //@ts-expect-error
      filterTodoData: state.filterTodoData.set(type, [data, ...state.filterTodoData.get(type)]),
    })),
  updateTodoData: (data: TodoDetailsProps[], type) => set((state) => ({ filterTodoData: state.filterTodoData.set(type, [...data]) })),
  filterTodoData: filterTodoData,
}));
