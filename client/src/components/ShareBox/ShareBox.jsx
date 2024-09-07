import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from 'react-share';
import { useEffect, useRef } from 'react';
import cn from 'classnames';
import { Button } from 'components/Button';
import messenger from 'assets/icons/socials/dark/messenger.svg';
import facebook from 'assets/icons/socials/dark/facebook.svg';
import telegram from 'assets/icons/socials/dark/telegram.svg';
import whatsapp from 'assets/icons/socials/dark/whatsapp.svg';
import reddit from 'assets/icons/socials/dark/reddit.svg';
import viber from 'assets/icons/socials/dark/viber.svg';
import copy from 'assets/icons/socials/dark/copy.svg';
import x from 'assets/icons/socials/dark/x.svg';
import cross from 'assets/icons/cross-share.svg';
import styles from 'components/ShareBox/ShareBox.scss';
import { Scrollbar } from 'react-scrollbars-custom';

export const ShareBox = ({ className, isOpen, setIsOpen, setIsCopied }) => {
  const boxRef = useRef(null);

  const socials = [
    { id: 1, name: 'Facebook', Button: FacebookShareButton, icon: facebook },
    { id: 2, name: 'Messenger', Button: FacebookMessengerShareButton, icon: messenger },
    { id: 3, name: 'Telegram', Button: TelegramShareButton, icon: telegram },
    { id: 4, name: 'Whatsapp', Button: WhatsappShareButton, icon: whatsapp },
    { id: 5, name: 'Reddit', Button: RedditShareButton, icon: reddit },
    { id: 6, name: 'Viber', Button: ViberShareButton, icon: viber },
    { id: 7, name: 'X', Button: TwitterShareButton, icon: x },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setIsOpen(false);
  };

  return (
    <>
      <div className={cn(styles.overflow, className)} />
      <section className={cn(styles.box, className)} ref={boxRef}>
        <header className={styles.header}>
          <h3 className={styles.title}>Share</h3>
          <Button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <img src={cross} />
          </Button>
        </header>
        <ul className={styles.socials}>
          <Scrollbar
            trackYProps={{
              renderer: (props) => {
                const { elementRef, ...restProps } = props;
                return <div {...restProps} ref={elementRef} className={styles.scrollbarTrack} />;
              },
            }}
            thumbYProps={{
              renderer: (props) => {
                const { elementRef, ...restProps } = props;
                return <div {...restProps} ref={elementRef} className={styles.scrollbarThumb} />;
              },
            }}
          >
            <li className={styles.socialBtn} onClick={copyLink}>
              <img src={copy} alt='Copy link' />
              <span>Copy link</span>
            </li>
            {socials.map(({ id, name, Button, icon }) => (
              <li key={id}>
                <Button className={styles.socialBtn} url={window.location.href} onClick={() => setIsOpen(false)}>
                  <img src={icon} alt={name} />
                  <span>{name}</span>
                </Button>
              </li>
            ))}
          </Scrollbar>
        </ul>
      </section>
    </>
  );
};
