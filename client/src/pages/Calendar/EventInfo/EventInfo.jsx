import { formatDate } from 'helpers/formatDate';
import { ImageComponent } from 'components/Image';
import { Button } from 'components/Button';
import styles from 'pages/Calendar/EventInfo/EventInfo.scss';
import markerIcon from 'assets/icons/marker.svg';
import calendarIcon from 'assets/icons/calendar.svg';
import { Link } from 'components/Link';
import { Container } from 'components/Container';
import cn from 'classnames';

export const EventInfo = () => (
  <>
    <Container>
      <article className={styles.info}>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcebTGbiiyudJYyUtOEsKeRAy7zRoLS7xiaQ&s'
          alt='cat'
          className={styles.cover}
        />
        <div className={styles.description}>
          <div className={styles.stats}>
            <span className={styles.type}>tournament</span>
            <span className={styles.status}>Registration is open</span>
          </div>
          <h2 className={styles.title}>Amazing Tallinn</h2>
          <div className={styles.wrapper}>
            <div className={styles.additionalInfo}>
              <span>
                <img src={calendarIcon} alt='calendar' />
                24 March
              </span>
              <span>
                <img src={markerIcon} alt='marker' />
                Greece
              </span>
            </div>
            {/* <Link content='Read more' path={`/events/${id}`} arrowRight /> */}
          </div>
          <table className={styles.tournamentInfo}>
            <tbody>
              <tr>
                <td>Registration to</td>
                <td>13.06.2024</td>
              </tr>
              <tr>
                <td>Organization</td>
                <td>Organisation Name</td>
              </tr>
              <tr>
                <td>Organizer</td>
                <td>Name Surname</td>
              </tr>
              <tr>
                <td>Text</td>
                <td>Text</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.buttons}>
            <Button text='Registration' normalStyle className={styles.regBtn} />
            <Button text='Entry form' ghostStyle className={styles.formBtn} />
          </div>
          <div className={styles.additionalDescr}>
            <div className={styles.additionalDescrLinks}>
              <Button noStyle className={cn(styles.link, styles.active)}>
                Information
              </Button>
              <Button noStyle className={styles.link}>
                Categories
              </Button>
              <Button noStyle className={styles.link}>
                Clubs
              </Button>
              <Button noStyle className={styles.link}>
                Judges
              </Button>
              <Button noStyle className={styles.link}>
                Address
              </Button>
            </div>
            <div className={styles.inner}>
              {/* <div className={styles.information}>
                  <div className={styles.informationPassages}>
                    <h4 className={styles.passageTitle}>Description</h4>
                    <p className={styles.passageText}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.informationPassages}>
                    <h4 className={styles.passageTitle}>
                      Registration of participants:
                    </h4>
                    <p className={styles.passageText}>
                      Contrary to popular belief, Lorem Ipsum is not simply random
                      text. It has roots in a piece of classical Latin literature
                      from 45 BC, making it over 2000 years old. Richard
                      McClintock, a Latin professor at Hampden-Sydney College in
                      Virginia, looked up one of the more obscure Latin words,
                      consectetur, from a Lorem Ipsum passage, and going through
                      the cites of the word in classical literature, discovered
                      the undoubtable source.
                    </p>
                  </div>
                  <hr className={styles.line} />
                  <div className={styles.informationPassages}>
                  <h4 className={styles.passageTitle}>Financial conditions:</h4>
                  <p className={styles.passageText}>
                    The standard chunk of Lorem Ipsum used since the 1500s is
                    reproduced below for those interested. Sections 1.10.32 and
                    1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
                    also reproduced in their exact original form, accompanied by
                    English versions from the 1914 translation by H. Rackham.
                  </p>
                </div>
                <hr className={styles.line} />
                <div className={styles.informationPassages}>
                  <h4 className={styles.passageTitle}>Awards:</h4>
                  <p className={styles.passageText}>
                    It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                  </p>
                </div>
              </div> */}
              <div className={styles.categories}>
                <div className={styles.categoryHeader}>
                  <span className={styles.name}>Name some name</span>
                  <div className={styles.dateWrapper}>
                    <time className={styles.time}>09:00</time>/
                    <time className={styles.date}>13.06.2024</time>
                  </div>
                </div>
                <div className={styles.category}>
                  <span className={styles.categoryName}>Сategory name</span>
                  <span className={styles.class}>Class</span>
                  <span className={styles.program}>Program</span>
                  <span className={styles.text}>Text</span>
                  <span className={styles.count}>Count</span>
                </div>

                <div className={styles.categoriesTotlas}>
                  <span className={styles.text}>Totals:</span>
                  <span className={styles.count}>45</span>
                </div>
              </div>
              <div className={styles.categories}>
                <div className={styles.categoryHeader}>
                  <span className={styles.name}></span>
                  <div>
                    <div className={styles.time}></div>
                    <div className={styles.slash}></div>
                    <div className={styles.date}></div>
                  </div>
                </div>
              </div>
              {/* <div className={styles.clubs}>
                <div className={styles.clubsHeader}>
                  <span className={styles.totals}>Totlas:</span>
                  <div className={styles.stats}>
                    <div className={styles.stat}>
                      <span className={styles.statName}>Clubs</span>
                      <span className={styles.statData}>4</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statName}>Couples</span>
                      <span className={styles.statData}>26</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statName}>Solo</span>
                      <span className={styles.statData}>38</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statName}>Entries</span>
                      <span className={styles.statData}>60 / 83</span>
                    </div>
                  </div>
                </div>
                <div className={styles.club}>
                  <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcebTGbiiyudJYyUtOEsKeRAy7zRoLS7xiaQ&s'
                    alt='cat'
                    className={styles.clubImg}
                  />
                  <div className={styles.clubInfo}>
                    <h4 className={styles.clubName}>Club Name some name</h4>
                    <span className={styles.clubCity}>Country, City</span>
                  </div>
                  <div className={styles.clubStats}>
                    <div className={styles.stat}>
                      <span className={styles.statName}>Couples</span>
                      <span className={styles.statData}>26</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statName}>Solo</span>
                      <span className={styles.statData}>38</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statName}>Entries</span>
                      <span className={styles.statData}>60 /83</span>
                    </div>
                  </div>
                </div>
                <hr className={styles.line} />
              </div> */}
              {/* <div className={styles.judges}>
                <div className={styles.judgesHeader}>
                  <span className={styles.totals}>Totlas:</span>

                  <div className={styles.stat}>
                    <span className={styles.statName}>Judges</span>
                    <span className={styles.statData}>5</span>
                  </div>
                </div>
                <div className={styles.judge}>
                  <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcebTGbiiyudJYyUtOEsKeRAy7zRoLS7xiaQ&s'
                    alt='cat'
                    className={styles.judgeImg}
                  />
                  <div className={styles.judgeInfo}>
                    <h4 className={styles.judgeName}>Club Name some name</h4>
                    <span className={styles.judgeCity}>Country, City</span>
                    <span className={styles.judgeCategory}>Category</span>
                  </div>
                </div>
                <hr className={styles.line} />
              </div> */}
              {/* <div className='addressWrapper'>
                <h4 className='address'>
                  Country, city Name, Long name street, building 55
                </h4>
                <div className='map'></div>
              </div> */}
            </div>
          </div>
        </div>
      </article>
    </Container>
  </>
);
