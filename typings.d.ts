interface Board {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "todo" | "inprogress" | "done";

interface Image {
  bucketId: string;
  fileId: string;
}

interface Todo {
  $id: string;
  $createdAt: string;
  // description: string;
  title: string;
  status: TypedColumn;
  image?: Image;
}

interface Column {
  id: TypedColumn;
  todos: Todo[];
}
