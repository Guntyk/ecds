import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState, useEffect } from "react";
import cn from "classnames";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import styles from "components/Dropdown/Dropdown.scss";

export const Dropdown = ({
  className,
  options,
  placeholder,
  selectedValue,
  printable,
  onChange,
  zIndex,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelectOption = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn(styles.dropdown, className)} ref={dropdownRef}>
      {printable ? (
        <input
          type="text"
          className={cn(styles.dropdownInput, {
            [styles.open]: isOpen,
            [styles.filled]: searchTerm || selectedValue,
          })}
          value={searchTerm || selectedValue || ""}
          onClick={toggleDropdown}
          onChange={handleInputChange}
          placeholder={placeholder || "Select or type..."}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="dropdown-list"
          aria-autocomplete="list"
        />
      ) : (
        <button
          type="button"
          className={cn(styles.dropdownButton, {
            [styles.open]: isOpen,
            [styles.filled]: selectedValue,
          })}
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="dropdown-list"
        >
          {selectedValue || placeholder}
          <span className={cn(styles.arrow, { [styles.open]: isOpen })} />
        </button>
      )}
      <Swiper
        className={cn(styles.dropdownList, {
          [styles.open]: isOpen,
          [styles.scrollable]: filteredOptions.length > 11,
        })}
        direction="vertical"
        slidesPerView="auto"
        freeMode={true}
        scrollbar={{
          dragClass: styles.thumb,
          dragSize: 80,
          verticalClass: styles.scrollbar,
        }}
        mousewheel={{ sensitivity: 0.5 }}
        modules={[FreeMode, Scrollbar, Mousewheel]}
        id="dropdown-list"
        aria-labelledby="dropdown-button"
        style={{ zIndex }}
      >
        <SwiperSlide className={styles.optionsList}>
          {filteredOptions.map((option) => (
            <button
              type="button"
              role="option"
              className={cn(styles.dropdownItem, {
                [styles.selectedItem]: option === selectedValue,
              })}
              onClick={() => handleSelectOption(option)}
              aria-selected={option === selectedValue}
              tabIndex={isOpen && option !== selectedValue ? "0" : "-1"}
              key={option}
            >
              {option}
            </button>
          ))}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
