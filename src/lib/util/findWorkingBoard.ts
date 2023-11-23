// search for the working board from the board list in the database

/**

Finds a working board from the board list with the specified ID.
@param {any[]} boardList - The list of boards to search through.
@param {string} id - The ID of the board to find.
@returns {any|null} - The found board data or null if not found. */
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
