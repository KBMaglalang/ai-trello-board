import { updateColumn } from "../appwrite/columns";

export const updateColumnTitle = async (columnId: string, title: string) => {
  const data = await updateColumn(columnId, { title: title });

  return data;
};
