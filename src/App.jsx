import { Switch, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { pathnames } from 'constants/pathnames';
import { NotFound } from 'pages/NotFound';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Calendar } from 'pages/Calendar';
import { News } from 'pages/News';
import { Main } from 'pages/Main';

export default function App() {
  const { mainPage, calendarPage, newsPage } = pathnames;
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <Switch>
        <Route path={mainPage} exact>
          <Main />
        </Route>
        <Route path={calendarPage} exact>
          <Calendar />
        </Route>
        <Route path={newsPage} exact>
          <News />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
