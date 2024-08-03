import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { contactUsBlockPages } from 'constants/contactUsBlockPages';
import { pathnames } from 'constants/pathnames';
import { socials } from 'constants/socials';
import { ContactUs } from 'components/Footer/ContactUs';
import { Container } from 'components/Container';
import logo from 'assets/icons/logos/ecds-extended.svg';
import styles from 'components/Footer/Footer.scss';

export const Footer = () => {
  const { pathname } = useLocation();
  const {
    mainPage,
    calendarPage,
    usersPage,
    certificationPage,
    newsPage,
    membersPage,
    managementPage,
    documentsPage,
    contactsPage,
    logosPage,
  } = pathnames;

  const menuLinks = [
    { id: 1, title: 'Calendar', link: calendarPage },
    { id: 2, title: 'List of active users', link: usersPage },
    { id: 3, title: 'Certification', link: certificationPage },
    { id: 4, title: 'All News', link: newsPage },
    { id: 5, title: 'Members', link: membersPage },
  ];

  const aboutUsLinks = [
    { id: 1, title: 'Management', link: managementPage },
    { id: 2, title: 'Documents', link: documentsPage },
    { id: 3, title: 'Contacts', link: contactsPage },
    { id: 4, title: 'Logos', link: logosPage },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <>
      {contactUsBlockPages.includes(pathname) && <ContactUs />}
      <footer className={styles.footer}>
        <Container>
          <div className={styles.wrapper}>
            <div className={styles.navigation}>
              <div className={cn(styles.navigationSection, styles.menu)}>
                <span className={styles.sectionTitle}>Menu</span>
                <ul className={styles.navigationLinks}>
                  {menuLinks.map(({ id, title, link }) => (
                    <li className={styles.item} key={id}>
                      <Link to={link} className={styles.itemLink}>
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={cn(styles.navigationSection, styles.aboutUs)}>
                <span className={styles.sectionTitle}>About us</span>
                <ul className={styles.navigationLinks}>
                  {aboutUsLinks.map(({ id, title, link }) => (
                    <li className={styles.item} key={id}>
                      <Link to={link} className={styles.itemLink}>
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.creditsWrapper}>
              <Link to={mainPage}>
                <img src={logo} alt='ecds logo' />
              </Link>
              <div className={styles.socialsWrapper}>
                Follow us on
                <ul className={styles.socials}>
                  {socials.map(({ id, name, link, icon }) => (
                    <li key={id}>
                      <a href={link} target='_blank' rel='noreferrer noopener'>
                        <img src={icon} alt={name} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <p className={styles.credits}>© {currentYear} European Confederation of Dance Sports</p>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};
