import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SocialLinks } from 'social-links';
import { useState } from 'react';
import cn from 'classnames';
import { generateMediaURL } from 'helpers/generateMediaURL';
import { ImageComponent } from 'components/Image';
import { Button } from 'components/Button';
import { Arrow } from 'components/Arrow';
import { Link } from 'components/Link';
import arrowRight from 'assets/icons/arrow-right-background3_2-read-more.svg';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import styles from 'pages/AboutUs/Management/PersonCard/PersonCard.scss';

export const PersonCard = ({ person: { name, surname, role, socials, biography, photo } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const socialLinks = new SocialLinks();

  return (
    <div className={cn(styles.card, { [styles.open]: isOpen })}>
      <div
        className={cn(styles.cardInner, {
          [styles.addMargin]: !socials && isOpen,
        })}
      >
        <ImageComponent
          className={styles.photo}
          src={generateMediaURL(photo?.url) || 'https://placehold.co/160'}
          alt={photo?.alternativeText || 'photo placeholder'}
          placeholder={photo?.placeholder}
        />
        <div className={styles.personInfo}>
          <p className={styles.name}>
            <span>{name}</span>
            <br />
            <span>{surname}</span>
          </p>
          <p className={styles.role}>{role}</p>
          {socials && isOpen && (
            <ul className={styles.socials}>
              {socials.map(({ id, url }) => {
                const socialName = socialLinks.detectProfile(url);

                if (socialName) {
                  return (
                    <li className={styles.socialWrapper} key={id}>
                      <Link className={cn(styles.social, styles[socialName])} path={url} external />
                    </li>
                  );
                }
              })}
            </ul>
          )}
          {biography && !isOpen && (
            <Button className={styles.moreBtn} text='Read more' onClick={() => setIsOpen(true)} ghostStyle small>
              Read more <img src={arrowRight} alt='arrow right' />
            </Button>
          )}
        </div>
      </div>
      {isOpen && (
        <div className={styles.biography}>
          <Arrow className={styles.cross} onClick={() => setIsOpen(false)} isOpen={true} crossStyle />
          <div className={styles.text}>
            <BlocksRenderer content={biography} />
          </div>
        </div>
      )}
    </div>
  );
};
