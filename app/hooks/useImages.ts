import { useContext } from 'react';

import { ImagesContext } from '../contexts';
import imagesStorage from '../storage/files';

const useImages = () => {
  const { images, setImages } = useContext(ImagesContext);

  const addImage = (imageUri: string) => setImages([imageUri, ...images]);

  const removeImage = (imageUri: string) =>
    setImages([...images].filter((i) => i !== imageUri));

  const saveImages = async (): Promise<string[]> => {
    try {
      return images.length ? await imagesStorage.saveFiles(images) : [];
    } catch (error) {
      console.log('error saving images...', error);
      return [];
    }
  };

  const deleteImages = (imagesUrl: string[]) =>
    imagesStorage.deleteImages(imagesUrl);

  const removeImages = () => setImages([]);

  return {
    addImage,
    deleteImages,
    images,
    removeImage,
    removeImages,
    saveImages,
  };
};

export default useImages;
