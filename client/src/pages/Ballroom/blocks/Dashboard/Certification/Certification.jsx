import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { certificatedUsersCategories } from 'constants/usersCategories';
import { pathnames } from 'constants/pathnames';
import { Link } from 'components/Link';
import dashboardStyles from 'pages/Ballroom/blocks/Dashboard/Dashboard.scss';
import styles from 'pages/Ballroom/blocks/Dashboard/Certification/Certification.scss';

export const Certification = () => {
  const { certificationPage, ballroomPage } = pathnames;
  const { push } = useHistory();

  return (
    <div className={cn(dashboardStyles.block, styles.block)}>
      <ul className={dashboardStyles.links}>
        {certificatedUsersCategories.map((category) => (
          <li>
            <Link
              className={cn(dashboardStyles.link, styles.link)}
              content={category}
              path={`${ballroomPage}${certificationPage}?category=${category}`}
              noStyle
            />
          </li>
        ))}
      </ul>
      <h2
        className={cn(dashboardStyles.title, styles.title)}
        onClick={() => push(`${ballroomPage}${certificationPage}`)}
      >
        Certification
        <span className={cn(dashboardStyles.arrow, styles.arrow)} />
        <span className={cn(dashboardStyles.arrow, styles.arrow)} />
      </h2>
    </div>
  );
};
