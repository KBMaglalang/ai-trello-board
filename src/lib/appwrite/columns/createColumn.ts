import { databases, ID } from "@/config/appwrite";

export const createColumn = async () => {
  const data = await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLUMNS_COLLECTION_ID!,
    ID.unique(),
    {
      title: "New Column",
    }
  );

  return data;
};
