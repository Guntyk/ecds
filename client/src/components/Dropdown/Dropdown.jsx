import { useRef, useState, useEffect, forwardRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import cn from 'classnames';
import styles from 'components/Dropdown/Dropdown.scss';

const GAP_SIZE = 4;

export const Dropdown = ({ className, options, placeholder, selectedValue, printable, onChange, ...props }) => {
  const [searchTerm, setSearchTerm] = useState(selectedValue || '');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (printable && !selectedValue) {
      setSearchTerm('');
    }
  }, [selectedValue]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelectOption = (option) => {
    onChange(option);
    setSearchTerm(option);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));

  const Row = ({ index, style }) => {
    const option = filteredOptions[index];

    return (
      <button
        type='button'
        role='option'
        className={cn(styles.dropdownItem, {
          [styles.selectedItem]: option === selectedValue,
        })}
        onClick={() => handleSelectOption(option)}
        aria-selected={option === selectedValue}
        tabIndex={isOpen && option !== selectedValue ? '0' : '-1'}
        key={option}
        style={{
          ...style,
          top: style.top + GAP_SIZE,
          height: style.height - GAP_SIZE,
        }}
      >
        {option}
      </button>
    );
  };

  return (
    <div className={cn(styles.dropdown, className)} ref={dropdownRef}>
      {printable ? (
        <label>
          <input
            type='text'
            className={cn(styles.dropdownInput, {
              [styles.open]: isOpen,
              [styles.filled]: searchTerm || selectedValue,
            })}
            value={searchTerm || ''}
            onClick={toggleDropdown}
            onChange={handleInputChange}
            placeholder={placeholder || 'Select or type...'}
            aria-expanded={isOpen}
            aria-haspopup='listbox'
            aria-controls='dropdown-list'
            aria-autocomplete='list'
            autoComplete='nope'
            {...props}
          />
          <span className={cn(styles.arrow, { [styles.open]: isOpen })} />
        </label>
      ) : (
        <button
          type='button'
          className={cn(styles.dropdownButton, {
            [styles.open]: isOpen,
            [styles.filled]: selectedValue,
          })}
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-controls='dropdown-list'
        >
          {selectedValue || placeholder}
          <span className={cn(styles.arrow, { [styles.open]: isOpen })} />
        </button>
      )}
      <div
        className={cn(styles.dropdownList, {
          [styles.open]: isOpen,
          [styles.scrollable]: filteredOptions.length > 11,
        })}
      >
        {filteredOptions.length > 20 ? (
          <AutoSizer>
            {({ height, width }) => (
              <List
                className={styles.hugeList}
                height={height}
                itemCount={filteredOptions.length}
                innerElementType={innerElementType}
                itemSize={36 + GAP_SIZE}
                width={width}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        ) : (
          filteredOptions.map((option) => (
            <button
              type='button'
              role='option'
              className={cn(styles.dropdownItem, {
                [styles.selectedItem]: option === selectedValue,
              })}
              onClick={() => handleSelectOption(option)}
              aria-selected={option === selectedValue}
              tabIndex={isOpen && option !== selectedValue ? '0' : '-1'}
              key={option}
            >
              {option}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      width: '240px',
      position: 'relative',
    }}
    {...rest}
  />
));
