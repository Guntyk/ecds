import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Button } from 'components/Button';
import { Information } from 'pages/Calendar/EventInfo/tabs/Information';
import { Categories } from 'pages/Calendar/EventInfo/tabs/Categories';
import { Address } from 'pages/Calendar/EventInfo/tabs/Address';
import { Judges } from 'pages/Calendar/EventInfo/tabs/Judges';
import styles from 'pages/Calendar/EventInfo/tabs/Tabs.scss';

export const Tabs = ({ className, event }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabs, setTabs] = useState({});

  const { description, information, address, departments, judges } = event || {};

  useEffect(() => {
    setActiveTabIndex(0);
    setTabs({});

    if (description || information) {
      setTabs((prevTabs) => ({ Information, ...prevTabs }));
    }
    if (departments?.length) {
      setTabs((prevTabs) => ({ ...prevTabs, Categories }));
    }
    if (judges) {
      setTabs((prevTabs) => ({ ...prevTabs, Judges }));
    }
    if (address) {
      setTabs((prevTabs) => ({ ...prevTabs, Address }));
    }
  }, [event]);

  const ActiveTab = Object.values(tabs)[activeTabIndex];

  return (
    <div className={cn(styles.tabsWrapper, className, { [styles.empty]: !Object.values(tabs).length })}>
      <nav className={styles.tabs}>
        {Object.keys(tabs).map((key, index) => (
          <Button
            noStyle
            onClick={() => setActiveTabIndex(index)}
            className={cn(styles.tab, { [styles.active]: activeTabIndex === index })}
            tabIndex={activeTabIndex === index ? -1 : 0}
            key={key}
          >
            {key}
          </Button>
        ))}
      </nav>
      <div className={styles.tabInner}>{ActiveTab && <ActiveTab event={event} />}</div>
    </div>
  );
};
