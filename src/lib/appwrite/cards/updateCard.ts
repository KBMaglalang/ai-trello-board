// update the card in the database

import { databases } from '@/config/appwrite';

/**

Updates a card in the database with the given ID.
@param {string} id - The ID of the card to update.
@param {any} updateData - The data to update the card with.
@returns {Promise<Object>} A promise that resolves to the updated card object. */
export const updateCard = async (id: string, updateData: any) => {
  const data = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    id,
    {
      ...updateData,
    }
  );

  return data;
};
