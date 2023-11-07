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
  status: TypedColumn;
  title: string;
  description?: string;
  image?: Image;
  priority?: PriorityStatus;
  startDate?: string;
  endDate?: string;
  completed?: boolean;
}

interface Column {
  id: TypedColumn;
  todos: Todo[];
}
