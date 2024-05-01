import { v4 as uuid4 } from "uuid";

export const DATASET = [
  {
    id: uuid4(),
    name: "Task 15",
    description: "This is a sample description for task 15",
    tags: ["food", "dinner"],
    type: "QA",
  },
  {
    id: uuid4(),
    name: "Task 16",
    description: "This is a sample description for task 16",
    tags: ["cat", "cuddles"],
    type: "done",
  },
  {
    id: uuid4(),
    name: "Task 17",
    description: "This is a sample description for task 17",
    tags: ["food", "vegetarian"],
    type: "todo",
  },
  {
    id: uuid4(),
    name: "Task 18",
    description: "This is a sample description for task 18",
    tags: ["cat", "training"],
    type: "in-progress",
  },
  {
    id: uuid4(),
    name: "Task 19",
    description: "This is a sample description for task 19",
    tags: ["food", "lunch"],
    type: "QA",
  },
  {
    id: uuid4(),
    name: "Write grocery list (food, category)",
    description: "This is a sample description for writing a grocery list.",
    tags: ["food", "category"],
    type: "todo",
  },
  {
    id: uuid4(),
    name: "Research cat care tips (cat, care)",
    description: "This is a sample description for researching cat care tips.",
    tags: ["cat", "care"],
    type: "in-progress",
  },
  {
    id: uuid4(),
    name: "Test new Mexican recipe (food, mexican)",
    description: "This is a sample description for testing a new Mexican recipe.",
    tags: ["food", "mexican"],
    type: "QA",
  },
  {
    id: uuid4(),
    name: "Plan breakfast menu (food, breakfast)",
    description: "This is a sample description for planning a breakfast menu.",
    tags: ["food", "breakfast"],
    type: "todo",
  },
  {
    id: uuid4(),
    name: "Schedule playtime with cat (cat, play)",
    description: "This is a sample description for scheduling playtime with your cat.",
    tags: ["cat", "play"],
    type: "in-progress",
  },
  {
    id: uuid4(),
    name: "Finalize dessert recipe (food, dessert)",
    description: "This is a sample description for finalizing a dessert recipe.",
    tags: ["food", "dessert"],
    type: "QA",
  },
  {
    id: uuid4(),
    name: "Choose healthy snack option (food, snack)",
    description: "This is a sample description for choosing a healthy snack option.",
    tags: ["food", "snack"],
    type: "todo",
  },
  {
    id: uuid4(),
    name: "Plan cat adventure outing (cat, adventure)",
    description: "This is a sample description for planning a cat adventure outing.",
    tags: ["cat", "adventure"],
    type: "in-progress",
  },
  {
    id: uuid4(),
    name: "Review dinner menu options (food, dinner)",
    description: "This is a sample description for reviewing dinner menu options.",
    tags: ["food", "dinner"],
    type: "QA",
  },
  {
    id: uuid4(),
    name: "Schedule cuddle time with cat (cat, cuddles)",
    description: "This is a sample description for scheduling cuddle time with your cat.",
    tags: ["cat", "cuddles"],
    type: "done",
  },
  {
    id: uuid4(),
    name: "Research vegetarian meal options (food, vegetarian)",
    description: "This is a sample description for researching vegetarian meal options.",
    tags: ["food", "vegetarian"],
    type: "todo",
  },
  {
    id: uuid4(),
    name: "Research vegetarian meal options (food, vegetarian)",
    description: "This is a sample description for researching vegetarian meal options.",
    tags: ["food", "vegetarian"],
    type: "todo",
  },
  {
    id: uuid4(),
    name: "Research vegetarian meal options (food, vegetarian)",
    description: "This is a sample description for researching vegetarian meal options.",
    tags: ["food", "vegetarian"],
    type: "todo",
  },
  {
    id: uuid4(),
    name: "Train cat on new trick (cat, training)",
    description: "This is a sample description for training your cat on a new trick.",
    tags: ["cat", "training"],
    type: "in-progress",
  },
  {
    id: uuid4(),
    name: "Prepare lunch ingredients (food, lunch)",
    description: "This is a sample description for preparing lunch ingredients.",
    tags: ["food", "lunch"],
    type: "QA",
  },
];

export const filterTodoData = DATASET.reduce((acc, task) => {
  const { type } = task;
  return acc.set(type, (acc.get(type) || []).concat(task));
}, new Map());
