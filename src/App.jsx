import { Switch, Route } from 'react-router-dom';
import { pathnames } from 'constants/pathnames';
import { NotFound } from 'components/NotFound';
import { Header } from 'components/Header';

export default function App() {
  const { homePage } = pathnames;

  return (
    <>
      <Header />
      <Switch>
        <Route path={homePage} exact>
          Hello world
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}
