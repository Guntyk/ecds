import { useEffect, useState, useCallback } from 'react';
import cn from 'classnames';
import styles from 'components/Image/Image.scss';

export const ImageComponent = ({ className, src, placeholder, alt, fit = 'cover' }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.onload = handleImageLoad;
    img.src = src;
  }, [src, handleImageLoad]);

  const imageStyle = { objectFit: fit };

  return (
    <div className={cn(styles.wrapper, className)}>
      <img
        alt={alt}
        className={cn(styles.image, { [styles.placeholder]: placeholder && !isImageLoaded })}
        src={isImageLoaded ? src : placeholder}
        onLoad={handleImageLoad}
        loading='lazy'
        style={imageStyle}
      />
    </div>
  );
};
