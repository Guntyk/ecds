import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { SocialLinks } from 'social-links';
import { useState } from 'react';
import cn from 'classnames';
import { ImageComponent } from 'components/Image';
import { Button } from 'components/Button';
import { Arrow } from 'components/Arrow';
import { Link } from 'components/Link';
import arrowRight from 'assets/icons/arrow-right-background3_2-read-more.svg';
import styles from 'pages/AboutUs/Management/PersonCard/PersonCard.scss';

export const PersonCard = ({ person: { name, surname, role, socials, biography, photo } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const socialLinks = new SocialLinks();

  return (
    <div className={cn(styles.cardWrapper, { [styles.open]: isOpen })}>
      <div className={cn(styles.card, { [styles.open]: isOpen })}>
        <div className={cn(styles.cardInner, { [styles.addMargin]: !socials && isOpen })}>
          <ImageComponent
            className={styles.photo}
            src={`${process.env.REACT_APP_BASE_API_URL}${photo?.url}` || 'https://placehold.co/234'}
            alt={photo?.alternativeText || 'photo placeholder'}
            placeholder={photo?.placeholder}
          />
          <p className={styles.name}>
            {name}
            <br />
            {surname}
          </p>
          <p className={styles.role}>{role}</p>
          {socials && isOpen && (
            <ul className={styles.socials}>
              {socials.map(({ id, url }) => {
                const socialName = socialLinks.detectProfile(url);

                if (socialName) {
                  return (
                    <li key={id}>
                      <Link className={cn(styles.social, styles[socialName])} path={url} external />
                    </li>
                  );
                }
              })}
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
            <div className={styles.biography}>
              <BlocksRenderer content={biography} />
            </div>
            <Arrow className={styles.cross} isOpen={true} onClick={() => setIsOpen(false)} logoStyle />
          </>
        )}
      </div>
    </div>
  );
};
