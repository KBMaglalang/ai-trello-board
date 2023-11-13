import { updateColumn } from "../appwrite/columns";

export const addCardToColumn = async (columnData: any, cardData: any) => {
  const data = await updateColumn(columnData.$id, {
    todos: [...columnData.todos, cardData],
    order: [...columnData.order, cardData.$id],
  });

  return data;
};
