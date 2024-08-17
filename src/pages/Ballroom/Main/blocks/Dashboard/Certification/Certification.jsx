import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { certificatedUsersTypes } from 'constants/usersTypes';
import { pathnames } from 'constants/pathnames';
import { Link } from 'components/Link';
import dashboardStyles from 'pages/Ballroom/Main/blocks/Dashboard/Dashboard.scss';
import styles from 'pages/Ballroom/Main/blocks/Dashboard/Certification/Certification.scss';

export const Certification = () => {
  const { certificationPage, ballroomPage } = pathnames;
  const { push } = useHistory();

  return (
    <div className={cn(dashboardStyles.block, styles.block)}>
      <ul className={dashboardStyles.links}>
        {certificatedUsersTypes.map((type) => (
          <li key={type}>
            <Link
              className={cn(dashboardStyles.link, styles.link)}
              content={type}
              path={`${ballroomPage}${certificationPage}?type=${type}`}
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
