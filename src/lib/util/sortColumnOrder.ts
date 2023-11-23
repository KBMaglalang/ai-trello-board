/**

Sorts the column order in the board data based on the order in the boardData array.
@param {Array} boardData - The array containing the board data.
@returns {Array|null} - The sorted column data array or null if boardData is falsy. */
export const sortColumnOrder = (boardData: any) => {
  if (!boardData) return null;

  const sortedArray = boardData.columns.sort((a: any, b: any) => {
    let indexOfA = boardData.order.indexOf(a.$id);
    let indexOfB = boardData.order.indexOf(b.$id);
    return indexOfA - indexOfB;
  });

  return sortedArray;
};
