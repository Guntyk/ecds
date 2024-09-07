import { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from 'components/Image/Image.scss';

export const ImageComponent = ({ className, src, placeholder, alt, fit, external }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsImageLoaded(true);
    };
    img.src = external ? `${process.env.REACT_APP_BASE_API_URL}${src}` : src;
  }, [src]);

  return (
    <div className={cn(styles.wrapper, className)}>
      {placeholder && !isImageLoaded ? (
        <img
          alt={alt}
          className={cn(styles.image, styles.placeholder)}
          src={placeholder}
          loading='lazy'
          style={{ objectFit: fit ?? 'cover' }}
        />
      ) : (
        <img
          alt={alt}
          className={styles.image}
          src={src}
          onLoad={() => setIsImageLoaded(true)}
          loading='lazy'
          style={{ objectFit: fit ?? 'cover' }}
        />
      )}
    </div>
  );
};
