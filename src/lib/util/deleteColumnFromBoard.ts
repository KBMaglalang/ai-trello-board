import { updateBoard } from "../appwrite/boards";

export const deleteColumnFromBoard = async (
  boardData: any,
  columnData: any
) => {
  await updateBoard(boardData.$id, {
    order: boardData.order.filter((id: string) => id !== columnData.$id),
  });
};
