import { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from 'components/Image/Image.scss';

export const ImageComponent = ({ className, src, placeholder, alt, fit }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <div className={cn(styles.wrapper, className)}>
      {placeholder && !isImageLoaded ? (
        <img
          alt={alt}
          className={cn(styles.image, styles.placeholder)}
          src={placeholder}
          style={{ objectFit: fit ?? 'cover' }}
        />
      ) : (
        <img
          alt={alt}
          className={styles.image}
          src={src}
          onLoad={() => setIsImageLoaded(true)}
          style={{ objectFit: fit ?? 'cover' }}
        />
      )}
    </div>
  );
};
