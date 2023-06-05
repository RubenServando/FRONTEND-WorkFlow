export interface ToDo {
  id: string;
  title: string;
}

export interface List {
  title: string;
  todos: ToDo[];
}

export interface Board {
  title: String;
  todos: ToDo[];
}
