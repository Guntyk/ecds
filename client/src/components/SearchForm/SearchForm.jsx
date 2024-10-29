import { useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';
import { Dropdown } from 'components/Dropdown';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import styles from 'components/SearchForm/SearchForm.scss';

export const SearchForm = ({ className, formConfig, formState, setFormState, onSubmit, onClear }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
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

  const initialInput = formConfig[0];

  return (
    <form
      className={cn(styles.form, className, { [styles.searchFormWithFilterOpen]: isFiltersOpen })}
      onSubmit={handleSubmit}
    >
      <div className={styles.searchHeader}>
        <Input
          wrapperClassName={styles.searchInput}
          key={initialInput.name}
          name={initialInput.name}
          inputValue={formState[initialInput.name] || ''}
          placeholder={initialInput.placeholder}
          onChange={(e) => modifyQuery(initialInput.name, e.target.value)}
        />
        <Button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className={cn(styles.filtersBtn, { [styles.active]: isFiltersOpen })}
          ghostStyle
        >
          <span className={styles.filtersIcon} />
        </Button>
      </div>
      <div className={cn(styles.filters, { [styles.opened]: isFiltersOpen })}>
        {formConfig
          .slice(1)
          .map(({ name, placeholder, options, zIndex, ...props }) =>
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
      </div>
    </form>
  );
};
