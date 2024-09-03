import { useHistory, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import cn from 'classnames';
import styles from 'components/Button/TabSelector/TabSelector.scss';

export const TabSelector = ({ tabs, activeTabIndex, setActiveTabIndex }) => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  const buttonRefs = useRef([]);

  const handleClick = (element, index) => {
    setActiveTabIndex(index);
    push(`${pathname}?type=${element}`);
    focusNearestButton(index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClick(tabs[index], index);
    }
  };

  const focusNearestButton = (index) => {
    const focusableButtons = buttonRefs.current;
    const focusableCount = focusableButtons.length;

    if (focusableCount === 0) return;

    const nextIndex = (index + 1) % focusableCount;
    focusableButtons[nextIndex]?.focus();
  };

  return (
    <div className={styles.toggleButton} style={{ '--tabsLength': tabs.length }} role='tablist'>
      {tabs.map((element, index) => (
        <button
          ref={(el) => (buttonRefs.current[index] = el)}
          className={cn(styles.btn, {
            [styles.btnActive]: activeTabIndex === index,
          })}
          onClick={() => handleClick(element, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          tabIndex={activeTabIndex === index ? -1 : 0}
          key={element}
          role='tab'
          aria-selected={activeTabIndex === index}
          aria-controls={`tab-content-${element}`}
          id={`tab-${element}`}
        >
          {element}
        </button>
      ))}
      <span className={styles.indicator} style={{ transform: `translateX(${activeTabIndex * 100}%)` }} />
    </div>
  );
};
