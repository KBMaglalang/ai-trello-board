// create board on the appwrite datbase

import { ID, databases } from "@/config/appwrite";

export const createBoard = async () => {
  const data = await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOARDS_COLLECTION_ID!,
    ID.unique(),
    {
      title: "New Board",
    }
  );

  return data;
};
