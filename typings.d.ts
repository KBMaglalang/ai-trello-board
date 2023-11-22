interface Image {
  bucketId: string;
  fileId: string;
}

interface Card {
  $id: string;
  $createdAt: string;
  $updatedAt: string;

  title: string;
  description?: string;
  image?: Image;
  priority?: string;
  startDate?: string;
  endDate?: string;
  completed?: boolean;
}

interface Column {
  $id: string;
  $createdAt: string;

  title: string;
  todos: Card[];
  order: string[];
}

interface Board {
  $id: string;
  $createdAt: string;
  $updatedAt: string;

  title: string;
  columns: Column[];
  order: string[];
}
