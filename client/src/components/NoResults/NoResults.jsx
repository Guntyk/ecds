import cn from 'classnames';
import noResultsIcon from 'assets/icons/no-results.svg';
import styles from 'components/NoResults/NoResults.scss';

export const NoResults = ({ className }) => (
  <div className={cn(styles.noResults, className)}>
    <img src={noResultsIcon} alt='No results' />
    <p>Sorry, but nothing matched your search criteria</p>
  </div>
);
