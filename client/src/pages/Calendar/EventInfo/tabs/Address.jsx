import { useMemo } from 'react';
import styles from 'pages/Calendar/EventInfo/tabs/Tabs.scss';

export const Address = ({
  event: {
    address: { address, mapUrl },
  },
}) => {
  const mapSrc = useMemo(() => {
    const isEmbedUrl = /^https:\/\/www\.google\.com\/maps\/embed/.test(mapUrl);
    const isDirectUrl = /^https:\/\/www\.google\.com\/maps/.test(mapUrl);

    if (isEmbedUrl || isDirectUrl) {
      return isEmbedUrl ? mapUrl : `${mapUrl}&output=embed`;
    } else {
      const encodedAddress = encodeURIComponent(address);
      return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
    }
  }, [address, mapUrl]);

  return (
    <div className={styles.address}>
      <h4>{address}</h4>
      <iframe
        className={styles.map}
        src={mapSrc}
        allowFullScreen
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </div>
  );
};
