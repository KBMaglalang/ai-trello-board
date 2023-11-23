import { storage } from "@/config/appwrite";

/**

Gets the URL of an image file.
@param {Image} image - The image object containing bucket ID and file ID.
@returns {Promise} - A promise that resolves with the URL of the image file. */
export const getUrl = async (image: Image) => {
  const url = storage.getFilePreview(image.bucketId, image.fileId);

  return url;
};
