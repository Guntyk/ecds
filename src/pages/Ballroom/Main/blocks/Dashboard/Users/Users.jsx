import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { activeUsersTypes } from 'constants/usersTypes';
import { pathnames } from 'constants/pathnames';
import { Link } from 'components/Link';
import dashboardStyles from 'pages/Ballroom/Main/blocks/Dashboard/Dashboard.scss';
import styles from 'pages/Ballroom/Main/blocks/Dashboard/Users/Users.scss';

export const Users = () => {
  const { ballroomPage, usersPage } = pathnames;
  const { push } = useHistory();

  return (
    <div className={cn(dashboardStyles.block, styles.block)}>
      <ul className={dashboardStyles.links}>
        {activeUsersTypes.map((type) => (
          <li key={type}>
            <Link
              className={cn(dashboardStyles.link, styles.link)}
              content={type}
              path={`${ballroomPage}${usersPage}?type=${type}`}
              noStyle
            />
          </li>
        ))}
      </ul>
      <h2 className={cn(dashboardStyles.title, styles.title)} onClick={() => push(`${ballroomPage}${usersPage}?type=${activeUsersTypes[0]}`)}>
        List of active users
        <span className={cn(dashboardStyles.arrow, styles.arrow)} />
        <span className={cn(dashboardStyles.arrow, styles.arrow)} />
      </h2>
    </div>
  );
};
