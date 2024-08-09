import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { activeUsersCategories } from 'constants/usersCategories';
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
        {activeUsersCategories.map((category) => (
          <li key={category}>
            <Link
              className={cn(dashboardStyles.link, styles.link)}
              content={category}
              path={`${ballroomPage}${usersPage}?category=${category}`}
              noStyle
            />
          </li>
        ))}
      </ul>
      <h2 className={cn(dashboardStyles.title, styles.title)} onClick={() => push(`${ballroomPage}${usersPage}`)}>
        List of active users
        <span className={cn(dashboardStyles.arrow, styles.arrow)} />
        <span className={cn(dashboardStyles.arrow, styles.arrow)} />
      </h2>
    </div>
  );
};
