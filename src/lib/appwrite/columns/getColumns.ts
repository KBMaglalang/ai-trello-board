import { databases } from "@/config/appwrite";

/**

Retrieves a list of columns from the database.
@returns {Promise<Array<Object>>} A promise that resolves to an array of column objects. */
export const getColumns = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLUMNS_COLLECTION_ID!
  );

  const columns = data.documents;

  return columns;
};
