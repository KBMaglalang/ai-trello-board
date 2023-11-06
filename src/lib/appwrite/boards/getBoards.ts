import { databases } from "@/config/appwrite";

export const getBoards = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOARDS_COLLECTION_ID!
  );

  const boards = data.documents;

  return boards;
};
