// get the cards from the database

import { databases } from '@/config/appwrite';

/**

Retrieves a list of cards from the database.
@returns {Promise<Array<Object>>} A promise that resolves to an array of card objects. */
export const getCards = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  const cards = data.documents;

  return cards;
};
