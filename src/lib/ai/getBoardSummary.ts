// constants and functions
import { AI_ROUTE_SUMMARY } from '@/constants';
import { formatBoardForAI } from './formatBoardForAI';

/**

Retrieves a summary of the given board data by sending it to an AI model for analysis.
@param {any} boardData - The data of the board to analyze.
@returns {Promise<string>} A promise that resolves to the content of the board summary analyzed by the AI model.*/
export const getBoardSummary = async (boardData: any) => {
  const formattedData = formatBoardForAI(boardData);

  const response = await fetch(AI_ROUTE_SUMMARY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ board: formattedData }),
  });

  const data = await response.json();

  return data.content;
};
