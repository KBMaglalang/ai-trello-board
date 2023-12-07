import { ID, storage } from '@/config/appwrite';

/**

Uploads an image file to the storage.
@param {File} file - The image file to upload.
@returns {Promise} - A promise that resolves with the uploaded file data. */
export const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    process.env.NEXT_PUBLIC_IMAGES_STORAGE_BUCKET!,
    ID.unique(),
    file
  );

  return fileUploaded;
};
