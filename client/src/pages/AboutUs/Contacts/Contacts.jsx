import cn from 'classnames';
import styles from 'pages/AboutUs/Contacts/Contacts.scss';

export const Contacts = () => (
  <section className={styles.card}>
    <h1 className={styles.title}>European Confederation of Dance Sports</h1>
    <p className={styles.subtitle}>Registered in Estonia №80636152</p>
    <hr className={styles.line} />
    <div className={styles.info}>
      <address className={cn(styles.infoSection, styles.address)}>
        <h2 className={styles.sectionTitle}>Address</h2>
        <p>Harju maakond, Tallinn, Kesklinna linnaosa, Tondi tn 17b, 11316</p>
      </address>
      <div className={cn(styles.infoSection, styles.contact)}>
        <h2 className={styles.sectionTitle}>Phone</h2>
        <p>
          <a href='tel:37256645717'>+37256645717</a>
        </p>
      </div>
      <div className={cn(styles.infoSection, styles.bankDetails)}>
        <h2 className={styles.sectionTitle}>Bank details</h2>
        <table>
          <tbody>
            <tr>
              <td>Name of the bank:</td>
              <td>AS SEBPank</td>
            </tr>
            <tr>
              <td>Address of the bank:</td>
              <td>Tornimae 2, 15010 Tallinn, Republic of Estonia</td>
            </tr>
            <tr>
              <td>SWIFT/BIC code of the bank:</td>
              <td>EEUHEE2X</td>
            </tr>
            <tr>
              <td>Name of the account of the ECDS:</td>
              <td>EUROOPA TANTSUSPORDI KONFODERATSIOON</td>
            </tr>
            <tr>
              <td>IBAN of the ECDS:</td>
              <td>EE211010220301916223</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={cn(styles.infoSection, styles.email)}>
        <h2 className={styles.sectionTitle}>e-mail</h2>
        <p>
          <a href='mailto:dancesporteurope@gmail.com'>dancesporteurope@gmail.com</a>
        </p>
      </div>
    </div>
  </section>
);
