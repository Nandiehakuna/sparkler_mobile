import { v4 } from "uuid";

import db from "./db";

function generateUUID() {
  try {
    return v4();
  } catch (error) {
    console.warn("UUID generation failed, using fallback");
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}

async function saveFile(file: File | string) {
  const computedFile = typeof file === "string" ? await uriToBlob(file) : file;
  // const compressedFile = await compressImage(computedFile);
  const compressedFile = computedFile;
  const fileName = `${generateUUID()}.${compressedFile.type.split("/")[1]}`;
  const result = await db.uploadBytes(
    db.ref(db.storage, fileName),
    compressedFile,
    { contentType: compressedFile.type }
  );

  return await db.getDownloadURL(result.ref);
}

function saveFiles(files: string[]): Promise<string[]> {
  const promises = files.map(async (file) => await saveFile(file));

  return Promise.all(promises);
}

async function uriToBlob(uri: string): Promise<Blob> {
  const response = await fetch(uri);

  if (!response.ok)
    throw new Error(`Failed to fetch URI: ${response.statusText}`);

  return await response.blob();
}

export const deleteImage = async (url: string) =>
  await db.deleteObject(db.ref(db.storage, url));

export const deleteImages = async (urls: string[]) => {
  const promises = urls.map(async (url) => await deleteImage(url));
  return Promise.all(promises);
};

function compressImage(
  input: File | Blob,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    // Convert Blob or File to Data URL
    reader.onload = (e) => {
      img.src = e?.target?.result as string;
    };

    img.onerror = (error) => {
      reject(new Error("Image loading failed: " + error));
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const MAX_DIMENSION = 1080; // Maximum size for high-quality images
      let width = img.width;
      let height = img.height;

      // Resize while maintaining aspect ratio
      if (width > height) {
        if (width > MAX_DIMENSION) {
          height *= MAX_DIMENSION / width;
          width = MAX_DIMENSION;
        }
      } else {
        if (height > MAX_DIMENSION) {
          width *= MAX_DIMENSION / height;
          height = MAX_DIMENSION;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw the image on the canvas
      ctx?.drawImage(img, 0, 0, width, height);

      // Compress and convert to Blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const outputFileName =
              input instanceof File ? input.name : "compressed_image.jpeg";
            resolve(new File([blob], outputFileName, { type: "image/jpeg" }));
          } else {
            reject(new Error("Compression failed, returning original file."));
          }
        },
        "image/jpeg",
        quality
      );
    };

    reader.readAsDataURL(input);
  });
}

export default { deleteImage, deleteImages, saveFile, saveFiles };
