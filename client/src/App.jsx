import { Switch, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { pathnames } from 'constants/pathnames';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { NewsInfo } from 'pages/News/NewsInfo';
import { Ballroom } from 'pages/Ballroom';
import { Calendar } from 'pages/Calendar';
import { NotFound } from 'pages/NotFound';
import { AboutUs } from 'pages/AboutUs';
import { News } from 'pages/News';
import { Main } from 'pages/Main';

export default function App() {
  const { mainPage, calendarPage, newsPage, managementPage, documentsPage, contactsPage, logosPage, ballroomPage } =
    pathnames;
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path={mainPage} exact>
            <Main />
          </Route>
          <Route path={ballroomPage} exact>
            <Ballroom />
          </Route>
          <Route path={calendarPage} exact>
            <Calendar />
          </Route>
          <Route path={newsPage} exact>
            <News />
          </Route>
          <Route path={`${newsPage}/:id`} exact>
            <NewsInfo />
          </Route>
          {[managementPage, documentsPage, contactsPage, logosPage].map((path, index) => (
            <Route path={path} key={index} exact>
              <AboutUs />
            </Route>
          ))}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}
