// update the card in the database

import { databases } from "@/config/appwrite";

export const updateCard = async (id: string, updateData: any) => {
  console.log(
    "🚀 ~ file: updateCard.ts:6 ~ updateCard ~ cardData:",
    updateData
  );
  const data = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    id,
    {
      ...updateData,
    }
  );
  console.log("🚀 ~ file: updateCard.ts:15 ~ updateCard ~ data:", data);

  return data;
};
