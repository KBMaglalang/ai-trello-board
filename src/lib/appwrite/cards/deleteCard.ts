// delete card in datbabase

import { databases } from "@/config/appwrite";

/**

Deletes a card with the specified ID.
@param {string} cardId - The ID of the card to delete.
@returns {Promise} - A promise that resolves after the card is deleted. */
export const deleteCard = async (cardId: string) => {
  const data = await databases.deleteDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    cardId
  );
};
