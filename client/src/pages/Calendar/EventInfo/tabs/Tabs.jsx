import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Information } from 'pages/Calendar/EventInfo/tabs/Information';
import { Categories } from 'pages/Calendar/EventInfo/tabs/Categories';
import { Address } from 'pages/Calendar/EventInfo/tabs/Address';
import { Button } from 'components/Button';
import styles from 'pages/Calendar/EventInfo/tabs/Tabs.scss';

export const Tabs = ({ className, event }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabs, setTabs] = useState({});

  const { description, information, address, departments } = event || {};

  useEffect(() => {
    setActiveTabIndex(0);
    setTabs({});

    if (description || information) {
      setTabs((prevTabs) => ({ Information, ...prevTabs }));
    }
    if (departments?.length) {
      setTabs((prevTabs) => ({ ...prevTabs, Categories }));
    }
    if (address?.address || address?.mapUrl) {
      setTabs((prevTabs) => ({ ...prevTabs, Address }));
    }
  }, [event]);

  const ActiveTab = Object.values(tabs)[activeTabIndex];

  return (
    <div className={className}>
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
