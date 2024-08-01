import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as logosActions from '../../../redux/features/logosSlice';
import { LogoDropdown } from 'components/Dropdown/Logo';
import { ErrorMessage } from 'components/ErrorMessage';
import styles from 'pages/AboutUs/Logos/Logos.scss';

export const Logos = () => {
  const isLogosRequestLoading = useSelector((state) => state.logos.isLoading);
  const logosRequestError = useSelector((state) => state.logos.error);
  const logos = useSelector((state) => state.logos.logos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!logos.length) {
      dispatch(logosActions.getLogos());
    }
  }, []);

  return (
    <div className={styles.logos}>
      {!logosRequestError ? (
        !isLogosRequestLoading && logos.length === 0 ? (
          <p className={styles.text}>There is no logos available to download yet</p>
        ) : (
          logos.map((logo) => <LogoDropdown logo={logo} key={logo.id} />)
        )
      ) : (
        <ErrorMessage error={logosRequestError} />
      )}
      {isLogosRequestLoading && <p className={styles.text}>Loading...</p>}
    </div>
  );
};
