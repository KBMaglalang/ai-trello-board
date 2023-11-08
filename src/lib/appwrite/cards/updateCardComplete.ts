// update the complete status of the card in the database

import { databases } from "@/config/appwrite";

export const updateCardComplete = async (
  id: string,
  completeState: boolean
) => {
  const data = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    id,
    {
      completed: completeState,
    }
  );

  return data;
};
