import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { formConfig, initialState } from 'components/Footer/ContactUs/formConfig';
import { Notification } from 'components/Notification';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { Input } from 'components/Input';
import styles from 'components/Footer/ContactUs/ContactUs.scss';

export const ContactUs = () => {
  const [isSuccessNotificationShown, setIsSuccessNotificationShown] = useState(false);
  const [isEmailRequestLoading, setIsEmailRequestLoading] = useState(false);
  const [formState, setFormState] = useState(initialState);

  const onChange = ({ target }) => {
    const value = target.value;
    const name = target.name;

    setFormState((prevFormState) => ({ ...prevFormState, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsEmailRequestLoading(true);
    const { status } = await emailjs.sendForm(
      process.env.REACT_APP_EMAIL_SERVICE_ID,
      process.env.REACT_APP_EMAIL_TEMPLATE_ID,
      e.target,
      process.env.REACT_APP_EMAIL_PUBLIC_KEY
    );

    if (status === 200) {
      setIsSuccessNotificationShown(true);
      setFormState(initialState);
    }
    setIsEmailRequestLoading(false);
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
        {isEmailRequestLoading && <Loader />}
        {isSuccessNotificationShown && (
          <Notification
            className={styles.notification}
            setIsActive={setIsSuccessNotificationShown}
            title='Your message has been sent'
            type='success'
          />
        )}
        <hr className={styles.line} />
      </Container>
    </section>
  );
};
