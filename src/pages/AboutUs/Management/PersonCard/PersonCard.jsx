import { useState } from 'react';
import cn from 'classnames';
import { Button } from 'components/Button';
import { Arrow } from 'components/Arrow';
import { Link } from 'components/Link';
import arrowRight from 'assets/icons/arrow-right-background3_2-read-more.svg';
import styles from 'pages/AboutUs/Management/PersonCard/PersonCard.scss';

export const PersonCard = ({ person: { name, surname, role, socials, biography, photo } }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(styles.cardWrapper, { [styles.open]: isOpen })}>
      <div className={cn(styles.card, { [styles.open]: isOpen })}>
        <div className={cn(styles.cardInner, { [styles.addMargin]: !socials && isOpen })}>
          <img
            className={styles.photo}
            src={photo?.src || 'https://placehold.co/234'}
            alt={photo?.alt || 'photo placeholder'}
          />
          <p className={styles.name}>
            {name}
            <br />
            {surname}
          </p>
          <p className={styles.role}>{role}</p>
          {socials && isOpen && (
            <ul className={styles.socials}>
              {Object.entries(socials).map(([key, value]) => (
                <li key={key}>
                  <Link className={cn(styles.social, styles[key])} path={value} external />
                </li>
              ))}
            </ul>
          )}
          {!isOpen && (
            <Button
              className={styles.moreBtn}
              buttonContent='Read more'
              onClick={() => setIsOpen(true)}
              iconData={{ alt: 'arrow right', src: arrowRight, side: 'right' }}
              lightStyle
            />
          )}
        </div>
        {isOpen && (
          <>
            <p className={styles.biography}>{biography}</p>
            <Arrow className={styles.cross} isOpen={true} onClick={() => setIsOpen(false)} logoStyle />
          </>
        )}
      </div>
    </div>
  );
};
