import { updateColumn } from "../appwrite/columns";

export const deleteCardFromColumn = async (
  columnData: any,
  newColumnData: any
) => {
  const data = await updateColumn(columnData.$id, {
    todos: newColumnData.todos,
    order: newColumnData.order,
  });

  return data;
};
