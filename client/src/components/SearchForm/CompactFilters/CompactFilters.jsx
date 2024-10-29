import { useState } from 'react';
import { Dropdown } from 'components/Dropdown';
import { Button } from 'components/Button';
import styles from 'components/SearchForm/CompactFilters/CompactFilters.scss';
import { Input } from 'components/Input';

export const CompactFilters = ({
  children,
  formState,
  handleFilterChange,
  handleSubmit,
  clearFilters,
  formConfig,
  onOpenChange,
  modifyQuery,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // const toggleFilters = () => {
  //   const newState = !isOpen;
  //   setIsOpen(newState);
  //   onOpenChange(newState);
  // };

  const { name, placeholder, ...props } = formConfig[0];

  return (
    <>
      <div className={styles.filterHeader}>
        <Input
          key={name}
          name={name}
          inputValue={formState[name]}
          placeholder={placeholder}
          onChange={(e) => modifyQuery(name, e.target.value)}
          {...props}
        />
        <Button onClick={() => setIsOpen(!isOpen)} className={styles.filterBtn}>
          <span className={styles.filtersIcon} />
        </Button>
      </div>
      {isOpen && <div className={styles.filterMenu}>{children}</div>}
    </>
  );
};
