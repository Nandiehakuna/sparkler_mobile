import { createContext } from 'react';

export interface ContextValue {
  images: string[];
  setImages: (images: string[]) => void;
}

export const ImagesContext = createContext<ContextValue>({
  images: [],
  setImages: () => {},
});

ImagesContext.displayName = 'Image Context';

export default ImagesContext;
