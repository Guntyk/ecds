import { useState } from "react";
import { Button } from "components/Button";
import { Dropdown } from "components/Dropdown";
import styles from "./FilterMobile.scss";

export const FilterMobile = ({
  formState,
  handleFilterChange,
  handleSubmit,
  clearFilters,
  formConfig,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilters = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange(newState);
  };

  return (
    <div className={styles.filterWrapper}>
      <Button
        text="Filters"
        onClick={toggleFilters}
        className={styles.filterBtn}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={isOpen ? styles.svgOpen : ""}
        >
          <path
            d="M4 21V14"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 10V3"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 21V12"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 8V3"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20 21V16"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20 12V3"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1 14H7"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M9 8H15" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M17 16H23"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Button>

      {isOpen && (
        <div className={styles.filterMenu}>
          {formConfig
            .filter(({ options }) => options)
            .map(({ name, placeholder, options, zIndex }) => (
              <Dropdown
                options={options}
                selectedValue={formState[name]}
                placeholder={placeholder}
                onChange={(option) => handleFilterChange(name, option)}
                zIndex={zIndex}
                key={name}
              />
            ))}
          <div className={styles.boxBtn}>
            <Button
              className={styles.searchBtn}
              text="Search"
              type="submit"
              onClick={handleSubmit}
              searchStyle
            />
            <Button
              className={styles.clearFilters}
              text="Clear filters"
              type="reset"
              onClick={clearFilters}
              ghostStyle
            />
          </div>
        </div>
      )}
    </div>
  );
};
