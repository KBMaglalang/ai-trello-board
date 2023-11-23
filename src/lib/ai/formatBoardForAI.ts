/**

Formats the board data for AI processing.
@param {object} board - The board object containing columns and todos.
@returns {array} The formatted board data for AI. */
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
