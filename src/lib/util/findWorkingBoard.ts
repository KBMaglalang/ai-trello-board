// search for the working board from the board list in the database

export const findWorkingBoard = (boardList: any[], id: string) => {
  // check if the board list is not empty
  if (boardList.length === 0) return null;

  // check if the id is not empty
  if (id === "") return null;

  // filter through the boardlist and find the board with the id
  const boardData = boardList.filter((board) => board.$id === id);

  // return the board data if found
  return boardData[0] || null;
};
