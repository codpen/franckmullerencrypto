import { useEffect, useState } from 'react';
import { from } from 'rxjs';

const useLoadedImages = (images: string[] | null) => {
  const [loadedImages, setLoadedImages] = useState<string[] | null>(null);

  useEffect(() => {
    if (!images || images.length === 0) return setLoadedImages(images);

    const subscription = from(
      Promise.all(
        images.map(
          src =>
            new Promise<string>(resolve => {
              const img = new Image();

              img.onload = () => resolve(src);
              img.src = src;
            })
        )
      )
    ).subscribe(setLoadedImages);

    return () => subscription.unsubscribe();
  }, [images]);

  return loadedImages;
};

export default useLoadedImages;
