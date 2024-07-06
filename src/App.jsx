import { Container } from 'components/Container';
import { Header } from 'components/Header';
import { pathnames } from 'constants/pathnames';
import { Switch, Route } from 'react-router-dom';

export default function App() {
  const { homePage } = pathnames;

  return (
    <>
      <Container>
        <Header />
        <Switch>
          <Route path={homePage} exact>
            Hello world
          </Route>
          <Route>Not found</Route>
        </Switch>
      </Container>
    </>
  );
}
