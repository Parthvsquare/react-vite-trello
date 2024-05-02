import { DATASET, filterTodoData } from "@/utils/data";
import { TodoDetailsProps } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoListState {
  todoData: TodoDetailsProps[];
  filterTodoData: Map<string, TodoDetailsProps[]>;
  addList: (data: TodoDetailsProps, type: string) => void;
  updateTodoDataDrag: (data: TodoDetailsProps[], type: string) => void;
  updateTodoWithId: (id: string, data: TodoDetailsProps) => void;
  filtered: () => void;
}

export const DefaultTodoMap = new Map<string, any>([
  ["To Do", []],
  ["Doing", []],
  ["Done", []],
]);

// filterTodoData: state.filterTodoData.set(type, [data, ...state.filterTodoData.get(type)!]),
export const useTodoStore = create<TodoListState>()(
  persist(
    (set) => ({
      todoData: [],
      filterTodoData: DefaultTodoMap,
      addList: (data: TodoDetailsProps, type: string) => {
        set((state) => {
          if (state.filterTodoData.get(type) === undefined || state.filterTodoData.get(type) === null || state.filterTodoData.get(type)?.length === 0) {
            return {
              filterTodoData: state.filterTodoData.set(type, [data]),
              todoData: [...state.todoData, data],
            };
          }
          return {
            filterTodoData: state.filterTodoData.set(type, [data, ...state.filterTodoData.get(type)!]),
            todoData: [...state.todoData, data],
          };
        });
      },
      updateTodoDataDrag: (data: TodoDetailsProps[], type) =>
        set((state) => ({ filterTodoData: state.filterTodoData.set(type, [...data]), todoData: state.todoData.map((data) => (data.type === type ? data : data)) })),
      filtered: () => {
        set((state) => {
          return {
            filterTodoData: state.todoData.reduce((acc, task) => {
              const { type } = task;
              return acc.set(type, (acc.get(type) || []).concat(task));
            }, new Map()),
          };
        });
      },
      updateTodoWithId: (id: string, newData: TodoDetailsProps) => {
        set((state) => {
          const todoData = state.filterTodoData.get(newData.type)?.map((data) => (data.id === id ? newData : data));
          if (!todoData) {
            return {
              filterTodoData: state.filterTodoData,
              todoData: state.todoData.map((data) => (data.id === id ? newData : data)),
            };
          }
          return {
            filterTodoData: state.filterTodoData.set(newData.type, todoData),
            todoData: state.todoData.map((data) => (data.id === id ? newData : data)),
          };
        });
      },
    }),
    {
      name: "todo-list",
    }
  )
);
