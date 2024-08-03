import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useElementOnScreen from 'hooks/useElementOnScreen';
import * as partnersActions from '../../../../redux/features/partnersSlice';
import { ErrorMessage } from 'components/ErrorMessage';
import { ImageComponent } from 'components/Image';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import { Link } from 'components/Link';
import styles from 'pages/Main/blocks/Partners/Partners.scss';

export const Partners = () => {
  const { partners, error, isLoading } = useSelector((state) => state.partners);
  const dispatch = useDispatch();

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  });

  useEffect(() => {
    if (isVisible && !partners.length) {
      dispatch(partnersActions.getPartners());
    }
  }, [dispatch, isVisible, partners.length]);

  return (
    <Container>
      <section className={styles.block} ref={containerRef}>
        <h2 className={styles.title}>Our sponsors & partners</h2>
        <ul className={styles.partners}>
          {!error ? (
            !isLoading && partners.length === 0 ? (
              <p className={styles.text}>There is no partners yet</p>
            ) : (
              partners.map(({ id, website, logo: { alternativeText, url, placeholder } }) => (
                <li className={styles.partner} key={id}>
                  <ImageComponent
                    className={styles.partnerLogo}
                    src={url}
                    alt={alternativeText}
                    placeholder={placeholder}
                    fit='contain'
                    external
                  />
                  {website && <Link className={styles.moreBtn} content='More about' path={website} external />}
                </li>
              ))
            )
          ) : (
            <ErrorMessage error={error} />
          )}
          {isLoading && <p className={styles.text}>Loading...</p>}
        </ul>
        <aside className={styles.donate}>
          <h4 className={styles.text}>
            If you like our idea, support it with money.
            <br />
            Any amount will go to support the dance movement in Europe
          </h4>
          <Button buttonContent='Donate' className={styles.donateBtn} />
        </aside>
      </section>
    </Container>
  );
};
