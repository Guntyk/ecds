import styles from 'pages/Calendar/EventInfo/tabs/Tabs.scss';

export const Information = ({ event: { description } }) => {
  return (
    <div className={styles.information}>
      {description && (
        <div className={styles.informationParagraph}>
          <h3 className={styles.passageTitle}>Description</h3>
          <p>{description}</p>
        </div>
      )}
      <hr className={styles.line} />
      <div className={styles.informationParagraph}>
        <h3 className={styles.passageTitle}>Registration of participants:</h3>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
          and going through the cites of the word in classical literature, discovered the undoubtable source.
        </p>
      </div>
      <hr className={styles.line} />
      <div className={styles.informationParagraph}>
        <h3 className={styles.passageTitle}>Financial conditions:</h3>
        <p>
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
          1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original
          form, accompanied by English versions from the 1914 translation by H. Rackham.
        </p>
      </div>
      <hr className={styles.line} />
      <div className={styles.informationParagraph}>
        <h3 className={styles.passageTitle}>Awards:</h3>
        <p>
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  );
};
