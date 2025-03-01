import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Button } from 'components/Button';
import styles from 'components/Tabs/Tabs.scss';

export const Tabs = ({ className, innerClassName, tabs, setTabs, data, headFontStyle }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    setActiveTabIndex(0);
    if (setTabs) {
      setTabs({});
    }
  }, []);

  const ActiveTab = Object.values(tabs)[activeTabIndex];

  return (
    <div className={cn(styles.tabsWrapper, className, { [styles.empty]: !Object.values(tabs).length })}>
      <nav className={styles.tabs}>
        {Object.keys(tabs).map((key, index) => (
          <Button
            noStyle
            onClick={() => setActiveTabIndex(index)}
            className={cn(styles.tab, { [styles.headFont]: headFontStyle, [styles.active]: activeTabIndex === index })}
            tabIndex={activeTabIndex === index ? -1 : 0}
            key={key}
          >
            {key}
          </Button>
        ))}
      </nav>
      <div className={cn(styles.tabInner, innerClassName)}>{ActiveTab && <ActiveTab data={data} />}</div>
    </div>
  );
};
