import { useEffect, useState, useCallback } from 'react';
import cn from 'classnames';
import styles from 'components/Image/Image.scss';

export const ImageComponent = ({ className, src, placeholder, alt, fit = 'cover' }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleMainImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  useEffect(() => {
    const mainImg = new Image();
    mainImg.onload = handleMainImageLoad;
    mainImg.src = src;

    return () => setIsImageLoaded(false);
  }, [src, handleMainImageLoad]);

  useEffect(() => {
    console.log(isImageLoaded);
  }, [isImageLoaded]);

  const imageStyle = { objectFit: fit };

  return (
    <div className={cn(styles.wrapper, className)}>
      <img
        alt={alt}
        className={cn(styles.image, {
          [styles.placeholder]: placeholder && !isImageLoaded,
        })}
        src={isImageLoaded ? src : placeholder}
        loading='lazy'
        style={imageStyle}
      />
    </div>
  );
};
