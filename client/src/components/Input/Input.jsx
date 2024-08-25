import cn from 'classnames';
import alert from 'assets/icons/alert.svg';
import styles from 'components/Input/Input.scss';

export const Input = ({
  wrapperClassName,
  inputClassName,
  labelClassName,
  setInputValue,
  inputValue,
  labelText,
  maxLength,
  onChange,
  textarea,
  error,
  name,
  id,
  darkStyle,
  ...props
}) => {
  const Tag = textarea ? 'textarea' : 'input';
  const inputWrapperClassNames = cn(styles.inputWrapper, wrapperClassName, {
    [styles.inputWrapperInvalid]: error,
    [styles.inputWrapperFilled]: inputValue,
    [styles.inputWrapperLight]: !darkStyle,
    [styles.inputWrapperDark]: darkStyle,
  });

  const inputClassNames = cn(styles.input, inputClassName, {
    [styles.textareaInput]: textarea,
  });

  const labelClassNames = cn(styles.label, styles[labelClassName]);

  function handleChange({ target: { value } }) {
    if (!maxLength) {
      setInputValue(value);
    } else {
      value.length <= maxLength && setInputValue(value);
    }
  }

  return (
    <div className={inputWrapperClassNames}>
      <Tag
        autoComplete='off'
        className={inputClassNames}
        id={id || name}
        name={name}
        value={inputValue}
        onChange={onChange || handleChange}
        {...(maxLength ? { maxLength } : {})}
        {...props}
      />

      {!textarea && labelText && (
        <label className={labelClassNames} htmlFor={id || name}>
          {labelText}
        </label>
      )}

      {error && (
        <p className={styles.errorMessage}>
          <img alt='alert' src={alert} /> {error}
        </p>
      )}
    </div>
  );
};
