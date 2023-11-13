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
