import { Switch, Route } from 'react-router-dom';
import { pathnames } from 'constants/pathnames';
import { NotFound } from 'pages/NotFound';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Main } from 'pages/Main';

export default function App() {
  const { mainPage } = pathnames;

  return (
    <>
      <Header />
      <Switch>
        <Route path={mainPage} exact>
          <Main />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
