export const formatBoardForAI = (board: any) => {
  const boardData = board.columns.map((column: any) => {
    const { title, todos } = column;

    const cards = todos.map((card: any) => {
      const { title, description, priority, startDate, endDate, completed } =
        card;

      return {
        title,
        description,
        priority,
        startDate,
        endDate,
        completed,
      };
    });

    return {
      title,
      cards,
    };
  });

  return boardData;
};
