import { updateCard } from '../appwrite/cards';

/**

Updates the complete state of a card with the provided completeState.
@param {string} id - The ID of the card to update.
@param {boolean} completeState - The updated complete state of the card.
@returns {Promise} - A promise that resolves with the updated card data. */
export const updateCardComplete = async (id: string, completeState: boolean) => {
  const data = await updateCard(id, { completed: completeState });

  return data;
};
