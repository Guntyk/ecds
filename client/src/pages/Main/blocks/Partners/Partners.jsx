import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useElementOnScreen from "hooks/useElementOnScreen";
import { getPartners } from "@redux/features/partnersSlice";
import { Notification } from "components/Notification";
import { ImageComponent } from "components/Image";
import { Container } from "components/Container";
import { Loader } from "components/Loader";
import { Link } from "components/Link";
import styles from "pages/Main/blocks/Partners/Partners.scss";

import sp from "../../../sp.json";

const spParse = JSON.parse(sp);

export const Partners = () => {
  const { partners, error, isLoading } = useSelector((state) => state.partners);
  const dispatch = useDispatch();

  const [containerRef, isVisible] = useElementOnScreen();

  useEffect(() => {
    if (!error && isVisible && !partners.length) {
      dispatch(getPartners());
    }
  }, [isVisible, partners.length]);

  return (
    <Container>
      <section className={styles.block} ref={containerRef}>
        <h2 className={styles.title}>Our sponsors & partners</h2>
        {isLoading ? (
          <Loader className={styles.text} />
        ) : spParse.length === 0 ? (
          <p className={styles.text}>There is no partners yet</p>
        ) : (
          <ul className={styles.partners}>
            {spParse.map(
              ({
                id,
                website,
                logo: { alternativeText, url, placeholder },
              }) => (
                <li className={styles.partner} key={id}>
                  <ImageComponent
                    className={styles.partnerLogo}
                    src={url}
                    alt={alternativeText}
                    placeholder={placeholder}
                    fit="contain"
                    external
                  />
                  {website && (
                    <Link
                      className={styles.moreBtn}
                      content="More about"
                      path={website}
                      external
                    />
                  )}
                </li>
              )
            )}
          </ul>
        )}
        {/* <aside className={styles.donate}>
          <h3 className={styles.donateText}>
            If you like our idea, support it with money.
            <br />
            Any amount will go to support the dance movement in Europe
          </h3>
          <Button text='Donate' className={styles.donateBtn} normalStyle />
        </aside> */}
      </section>
    </Container>
  );
};
