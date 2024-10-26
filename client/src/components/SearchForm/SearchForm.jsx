import { useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';
import { FilterMobile } from 'components/FilterMobile/FilterMobile';
import { Dropdown } from 'components/Dropdown';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import styles from 'components/SearchForm/SearchForm.scss';

export const SearchForm = ({ className, formConfig, formState, setFormState, onSubmit, onClear }) => {
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);
  const { search } = useLocation();
  const { push } = useHistory();

  const modifyQuery = (name, value) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(search);

    Object.entries(formState).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });

    if (onSubmit) {
      onSubmit();
    }

    push(`?${searchParams.toString()}`);
  };

  const clearFilters = () => {
    setFormState({});
    if (onClear) {
      onClear();
    }
    push('?');
  };

  return (
    <form
      className={cn(styles.form, className, { [styles.searchFormWithFilterOpen]: isFilterMobileOpen })}
      onSubmit={handleSubmit}
    >
      {formConfig.map(({ name, placeholder, options, zIndex, ...props }) =>
        options ? (
          <Dropdown
            options={options}
            selectedValue={formState[name]}
            placeholder={placeholder}
            onChange={(option) => modifyQuery(name, option)}
            zIndex={zIndex}
            key={name}
            {...props}
          />
        ) : (
          <Input
            key={name}
            name={name}
            inputValue={formState[name]}
            placeholder={placeholder}
            onChange={(e) => modifyQuery(name, e.target.value)}
            {...props}
          />
        )
      )}
      <Button className={styles.searchBtn} text='Search' type='submit' searchStyle />
      <Button className={styles.clearBtn} text='Clear filters' type='reset' onClick={clearFilters} ghostStyle />
      {/* <FilterMobile
        className={styles.filterMobile}
        formState={formState}
        modifyQuery={modifyQuery}
        handleSubmit={handleSubmit}
        clearFilters={clearFilters}
        formConfig={formConfig}
        onOpenChange={setIsFilterMobileOpen}
      /> */}
    </form>
  );
};
