export const sortColumnOrder = (boardData: any) => {
  if (!boardData) return null;

  const sortedArray = boardData.columns.sort((a: any, b: any) => {
    let indexOfA = boardData.order.indexOf(a.$id);
    let indexOfB = boardData.order.indexOf(b.$id);
    return indexOfA - indexOfB;
  });

  return sortedArray;
};
