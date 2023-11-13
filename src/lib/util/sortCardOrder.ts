export const sortCardOrder = (columnArrayData: any) => {
  // go through each column in the column Data array
  const sorted = columnArrayData.map((column: any) => {
    const columnSortedTodos = column.todos.sort((a: any, b: any) => {
      let indexOfA = column.order.indexOf(a.$id);
      let indexOfB = column.order.indexOf(b.$id);
      return indexOfA - indexOfB;
    });

    return { ...column, todos: columnSortedTodos };
  });

  // sort the card order in each column in referenced to the order
  return sorted;
};
