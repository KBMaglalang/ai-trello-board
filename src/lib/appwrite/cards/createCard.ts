// create card in database

import { databases, ID } from '@/config/appwrite';

/**

Creates a new card with the provided card data.
@param {any} cardData - The data for the new card.
@returns {Promise} - A promise that resolves with the created card data. */
export const createCard = async (cardData: any) => {
  const data = await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    ID.unique(),
    {
      ...cardData,
    }
  );

  return data;
};
