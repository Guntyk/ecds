import cn from 'classnames';
import styles from 'pages/AboutUs/Contacts/Contacts.scss';

export const Contacts = () => (
  <section className={styles.card}>
    <h1 className={styles.title}>European Confederation of Dance Sports</h1>
    <p className={styles.subtitle}>Registered in England Nº12309876</p>
    <hr className={styles.line} />
    <div className={styles.info}>
      <address className={cn(styles.infoSection, styles.address)}>
        <h2 className={styles.sectionTitle}>Address</h2>
        <p>Hamilton House</p>
        <p>1 Temple Avenue</p>
        <p>London EC4Y 0HA</p>
      </address>
      <div className={cn(styles.infoSection, styles.contact)}>
        <h2 className={styles.sectionTitle}>Phone</h2>
        <p>
          <a href='tel:123-123-0000'>123-123-0000</a>
        </p>
        <p>
          <a href='tel:098-700-6050'>098-700-6050</a>
        </p>
      </div>
      <div className={cn(styles.infoSection, styles.bankDetails)}>
        <h2 className={styles.sectionTitle}>Bank details</h2>
        <table>
          <tbody>
            <tr>
              <td>Name of recipient:</td>
              <td>OOO</td>
            </tr>
            <tr>
              <td>Recipient code:</td>
              <td>10203040</td>
            </tr>
            <tr>
              <td>IBAN:</td>
              <td>AA000111222333444555666777888</td>
            </tr>
            <tr>
              <td>Name of the bank:</td>
              <td>ABCD EFG</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={cn(styles.infoSection, styles.email)}>
        <h2 className={styles.sectionTitle}>e-mail</h2>
        <p>
          <a href='mailto:info@ecds.com'>info@ecds.com</a>
        </p>
      </div>
    </div>
  </section>
);
