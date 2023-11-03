interface Board {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "todo" | "inprogress" | "done";
type PriorityStatus = null | "low" | "medium" | "high";

interface Image {
  bucketId: string;
  fileId: string;
}

interface Todo {
  $id: string;
  $createdAt: string;
  description: string;
  title: string;
  status: TypedColumn;
  image?: Image;
  priority?: PriorityStatus;
}

interface Column {
  id: TypedColumn;
  todos: Todo[];
}
