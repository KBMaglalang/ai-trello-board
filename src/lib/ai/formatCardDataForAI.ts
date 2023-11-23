/**

Formats the card data for AI processing.
@param {object} cardData - The card object containing title, description, priority, startDate, endDate, and completed.
@returns {object} The formatted card data for AI. */
export const formatCardDataForAI = (cardData: any) => {
  const { title, description, priority, startDate, endDate, completed } =
    cardData;

  return {
    title,
    description,
    priority,
    startDate,
    endDate,
    completed,
  };
};
