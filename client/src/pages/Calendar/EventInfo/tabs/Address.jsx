import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { mapStyles } from 'constants/mapStyles';
import { Loader } from 'components/Loader';
import { Link } from 'components/Link';
import markerIcon from 'assets/icons/map-pin.svg';
import styles from 'pages/Calendar/EventInfo/tabs/Tabs.scss';

export const Address = ({ data: { address } }) => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

      try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
        } else {
          console.error('No coordinates found');
        }
      } catch (error) {
        console.error('Error occurred on Geocoding API query:', error);
      }
    };

    fetchCoordinates();
  }, [address]);

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className={styles.address}>
      <address>
        <Link path={googleMapsLink} external hoverStyle noStyle>
          {address}
        </Link>
      </address>
      <div className={styles.map}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          {coordinates ? (
            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: '100%',
              }}
              center={coordinates}
              zoom={16}
              options={{
                styles: mapStyles,
                disableDefaultUI: true,
              }}
            >
              <Marker position={coordinates} icon={markerIcon} />
            </GoogleMap>
          ) : (
            <div className={styles.loader}>
              <Loader />
            </div>
          )}
        </LoadScript>
      </div>
    </div>
  );
};
