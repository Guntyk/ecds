import { useState } from 'react';
import { Container } from 'components/Container';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import styles from 'components/Footer/ContactUs/ContactUs.scss';

export const ContactUs = () => {
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <section className={styles.block}>
      <Container>
        <h2 className={styles.title}>Contact us</h2>
        <form className={styles.contactForm}>
          <Input
            wrapperClassName={styles.input}
            name='name'
            inputValue={name}
            setInputValue={setName}
            labelText='Name'
            darkStyle
          />
          <Input
            wrapperClassName={styles.input}
            name='email'
            inputValue={email}
            setInputValue={setEmail}
            labelText='e-mail'
            darkStyle
          />
          <Input
            wrapperClassName={styles.input}
            name='comment'
            inputValue={comment}
            setInputValue={setComment}
            placeholder='Comment'
            textarea
            darkStyle
          />
          <Button buttonContent='Send' className={styles.sendBtn} type='submit' />
        </form>
      </Container>
    </section>
  );
};
