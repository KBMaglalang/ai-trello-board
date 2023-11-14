import { updateBoard } from "../appwrite/boards";

export const deleteColumnFromBoard = async (
  boardData: any,
  columnData: any
) => {
  const data = await updateBoard(boardData.$id, {
    columns: boardData.columns.filter(
      (column: any) => column.$id !== columnData.$id
    ),
    order: boardData.order.filter((id: string) => id !== columnData.$id),
  });

  return data;
};
