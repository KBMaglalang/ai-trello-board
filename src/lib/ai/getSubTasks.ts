import { AI_ROUTE_BREAKDOWN } from "@/constants";
import { formatCardDataForAI } from ".";

export const getSubTasks = async (cardData: any) => {
  const formattedCardData = formatCardDataForAI(cardData);

  const response = await fetch(AI_ROUTE_BREAKDOWN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ card: formattedCardData }),
  });

  const data = await response.json();

  return data.content;
};
