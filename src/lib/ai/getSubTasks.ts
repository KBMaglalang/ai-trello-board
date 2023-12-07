import { AI_ROUTE_BREAKDOWN } from '@/constants';
import { formatCardDataForAI } from '.';

/**

Retrieves the subtasks for a given card data by sending it to an AI model for analysis.
@param {any} cardData - The data of the card to analyze.
@returns {Promise<string>} A promise that resolves to the content of the subtasks analyzed by the AI model. */
export const getSubTasks = async (cardData: any) => {
  const formattedCardData = formatCardDataForAI(cardData);

  const response = await fetch(AI_ROUTE_BREAKDOWN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ card: formattedCardData }),
  });

  const data = await response.json();

  return data.content;
};
