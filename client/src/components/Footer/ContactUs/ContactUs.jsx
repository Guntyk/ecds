import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { formConfig, initialState } from 'components/Footer/ContactUs/formConfig';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import styles from 'components/Footer/ContactUs/ContactUs.scss';

export const ContactUs = () => {
  const [formState, setFormState] = useState(initialState);

  const onChange = ({ target }) => {
    const value = target.value;
    const name = target.name;

    setFormState((prevFormState) => ({ ...prevFormState, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      process.env.REACT_APP_EMAIL_SERVICE_ID,
      process.env.REACT_APP_EMAIL_TEMPLATE_ID,
      e.target,
      process.env.REACT_APP_EMAIL_PUBLIC_KEY
    );
  };

  return (
    <section className={styles.block}>
      <Container>
        <h2 className={styles.title}>Contact us</h2>
        <form className={styles.contactForm} onSubmit={onSubmit}>
          {formConfig.map(({ name, placeholder, pattern, textarea }) => (
            <Input
              wrapperClassName={styles.input}
              autoComplete='off'
              name={name}
              inputValue={formState[name]}
              labelText={placeholder}
              onChange={onChange}
              pattern={pattern}
              key={name}
              textarea={textarea}
              {...(textarea && { placeholder })}
              darkStyle
              required
            />
          ))}
          <Button buttonContent='Send' className={styles.sendBtn} type='submit' />
        </form>
      </Container>
    </section>
  );
};
