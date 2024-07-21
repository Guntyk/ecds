import { Switch, Route } from 'react-router-dom';
import { pathnames } from 'constants/pathnames';
import { NotFound } from 'pages/NotFound';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

export default function App() {
  const { mainPage } = pathnames;

  return (
    <>
      <Header />
      <Switch>
        <Route path={mainPage} exact>
          Hello world
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}
