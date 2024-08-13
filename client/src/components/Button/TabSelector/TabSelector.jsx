import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from 'components/Button/TabSelector/TabSelector.scss';

export const TabSelector = ({ tabs, activeTabIndex, setActiveTabIndex }) => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  const handleClick = (element, index) => {
    setActiveTabIndex(index);
    push(`${pathname}?type=${element}`);
  };

  return (
    <div className={styles.toggleButton} style={{ '--tabsLength': tabs.length }}>
      {tabs.map((element, index) => (
        <button
          className={cn(styles.btn, { [styles.btnActive]: activeTabIndex === index })}
          onClick={() => handleClick(element, index)}
          key={element}
        >
          {element}
        </button>
      ))}
      <span className={styles.indicator} style={{ translate: `${activeTabIndex * 100}% 0` }} />
    </div>
  );
};
