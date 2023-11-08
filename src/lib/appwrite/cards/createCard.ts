// create card in database

import { databases, ID } from "@/config/appwrite";

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
