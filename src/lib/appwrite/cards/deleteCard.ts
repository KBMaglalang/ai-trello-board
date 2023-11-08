// delete card in datbabase

import { databases } from "@/config/appwrite";

export const deleteCard = async (cardId: string) => {
  const data = await databases.deleteDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    cardId
  );
};
