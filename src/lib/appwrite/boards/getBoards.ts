import { databases } from "@/config/appwrite";

export const getBoards = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOARDS_COLLECTION_ID!
  );
  console.log("🚀 ~ file: getBoards.ts:8 ~ getBoards ~ data:", data);

  const boards = data.documents;
  console.log("🚀 ~ file: getBoards.ts:10 ~ getBoards ~ boards:", boards);

  return boards;
};
