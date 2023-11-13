// update the complete status of the card in the database

import { updateCard } from "../appwrite/cards";

export const updateCardComplete = async (
  id: string,
  completeState: boolean
) => {
  const data = await updateCard(id, { completed: completeState });

  return data;
};
