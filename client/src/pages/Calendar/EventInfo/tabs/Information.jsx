import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Link } from 'components/Link';
import styles from 'pages/Calendar/EventInfo/tabs/Tabs.scss';

export const Information = ({ event: { description, information } }) => (
  <div className={styles.information}>
    {description && (
      <>
        <span className={styles.passageTitle}>Description</span>
        <p className={styles.passageText}>{description}</p>
      </>
    )}
    {information && (
      <BlocksRenderer
        content={information}
        blocks={{
          link: ({ children, url }) => (
            <Link path={url} external noStyle>
              {children}
            </Link>
          ),
          heading: ({ children }) => <p className={styles.passageTitle}>{children}</p>,
          paragraph: ({ children }) => <p className={styles.passageText}>{children}</p>,
        }}
      />
    )}
  </div>
);
