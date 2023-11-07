import { databases } from "@/config/appwrite";

export const getColumns = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLUMNS_COLLECTION_ID!
  );
  console.log("🚀 ~ file: getColumns.ts:8 ~ getColumns ~ data:", data);

  const columns = data.documents;
  console.log("🚀 ~ file: getColumns.ts:11 ~ getColumns ~ columns:", columns);

  return columns;
};
